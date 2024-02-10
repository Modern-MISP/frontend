import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const { response, data, error: mispError } = await get(api).GET('/attributes', { fetch });

  if (mispError) throw error(response.status as NumericRange<400, 599>, mispError.message);

  return {
    tableData: data
  };
};
