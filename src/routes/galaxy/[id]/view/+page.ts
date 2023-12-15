import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/galaxies/view/{galaxyId}', { params: { path: { galaxyId: params.id } } });

  if (mispError) throw error(response.status, mispError.message);
  return {
    galaxy: data
  };
};
