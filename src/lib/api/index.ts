import { PUBLIC_MISP_API_ENDPOINT, PUBLIC_REST_DISABLED } from '$env/static/public';
import { error } from '@sveltejs/kit';
import createClient, { type FetchResponse } from 'openapi-fetch';
import { derived, writable } from 'svelte/store';
import { objectEntries } from 'ts-extras';
import type { paths } from './misp'; // generated from openapi-typescript

async function defaultDisabled(): Promise<FetchResponse<object>> {
  error(503, 'The REST method you try to use is disabled');
}

export const token = writable<string | null>(null);

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
      disabled = defaultDisabled
    ) {
      objectEntries(config).forEach(([key, value]) => {
        if (value) this[key] = disabled;
      });
    }
  };

  if (PUBLIC_REST_DISABLED) client.disableRESTMethods(JSON.parse(PUBLIC_REST_DISABLED));
  return client;
});
