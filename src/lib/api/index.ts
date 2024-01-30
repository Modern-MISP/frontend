import createClient, { type FetchResponse } from 'openapi-fetch';
import { objectEntries } from 'ts-extras';
import type { paths } from './misp'; // generated from openapi-typescript
import {
  PUBLIC_MISP_API_ENDPOINT,
  PUBLIC_MISP_KEY,
  PUBLIC_REST_DISABLED
} from '$env/static/public';
import { error } from '@sveltejs/kit';

async function defaultDisabled(): Promise<FetchResponse<object>> {
  error(503, 'The REST method you try to use is disabled');
}
const api = {
  ...createClient<paths>({
    baseUrl: PUBLIC_MISP_API_ENDPOINT,
    headers: {
      Authorization: PUBLIC_MISP_KEY,
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

if (PUBLIC_REST_DISABLED) api.disableRESTMethods(JSON.parse(PUBLIC_REST_DISABLED));
export const { GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE } = api;
