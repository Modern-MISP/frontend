import {
  PUBLIC_MISP_API_ENDPOINT,
  PUBLIC_REST_DISABLED,
  PUBLIC_REST_DISABLED_MESSAGE
} from '$env/static/public';
import { createLocalStorageStore } from '$lib/util/store.util';
import { error } from '@sveltejs/kit';
import createClient, { type FetchResponse } from 'openapi-fetch';
import { derived } from 'svelte/store';
import { objectEntries } from 'ts-extras';
import type { paths } from './misp'; // generated from openapi-typescript

function genDisabledFunction(message = 'The REST method you try to use is disabled') {
  return async (): Promise<FetchResponse<object>> => {
    error(503, message);
  };
}

export const token = createLocalStorageStore('no token', 'token');

export const api = derived(token, ($token) => {
  const client = {
    ...createClient<paths>({
      baseUrl: PUBLIC_MISP_API_ENDPOINT,
      headers: {
        Authorization: $token,
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    }),
    disableRESTMethods(
      config: { [k in keyof ReturnType<typeof createClient<paths>>]?: boolean },
      disabled = genDisabledFunction()
    ) {
      objectEntries(config).forEach(([key, value]) => {
        if (value) this[key] = disabled;
      });
    }
  };

  if (PUBLIC_REST_DISABLED)
    client.disableRESTMethods(
      JSON.parse(PUBLIC_REST_DISABLED),
      genDisabledFunction(PUBLIC_REST_DISABLED_MESSAGE)
    );
  return client;
});
