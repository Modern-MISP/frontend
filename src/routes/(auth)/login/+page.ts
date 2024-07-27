import type { PageLoad } from './$types';
import { error, type NumericRange } from '@sveltejs/kit';
import { api } from '$lib/api';
import { get } from 'svelte/store';
import { compatibility } from '$lib/stores';

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

    if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

    return {
      data
    };
  }
};
