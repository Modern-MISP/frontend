import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const { response, data, error: mispError } = await GET('/attributes', { fetch });

  if (mispError) throw error(response.status, mispError.message);

  return {
    tableData: data
  };
};
