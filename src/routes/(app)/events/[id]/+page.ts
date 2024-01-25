import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/events/view/{eventId}', { params: { path: { eventId: params.id } }, fetch });

  if (mispError) throw error(response.status, mispError.message);

  return {
    event: data.Event!
  };
};
