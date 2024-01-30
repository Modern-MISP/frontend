import { GET } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const { response, data, error: mispError } = await GET('/attributes', { fetch });

  if (mispError) throw error(response.status as NumericRange<400, 599>, mispError.message);

  return {
    tableData: data
  };
};
