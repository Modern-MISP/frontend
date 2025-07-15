import type { PageLoad } from './$types';
import { error, type NumericRange } from '@sveltejs/kit';
import { api } from '$lib/api';
import { get } from 'svelte/store';
import { compatibility } from '$lib/stores.svelte.ts';

export const load: PageLoad = async ({ fetch }) => {
  if (compatibility) {
    const data = { data: {} };
    return {
      data
    };
  } else {
    const {
      data,
      error: mispError,
      response
    } = await get(api).GET('/auth/openID/getAllOpenIDConnectProvidersInfo', { fetch });
    // eslint-disable-next-line no-warning-comments
    //TODO: types of status and message are not set, therefor .status an .message default to never
    if (mispError) error(response['status'] as NumericRange<400, 599>, mispError['message']);

    return {
      data
    };
  }
};
