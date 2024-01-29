import { GET } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { components } from '$lib/api/misp';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/events/view/{eventId}', { params: { path: { eventId: params.id } }, fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  return {
    event: data.Event! as NonNullable<typeof data.Event> & {
      Galaxy?: {
        GalaxyCluster?: (components['schemas']['GalaxyCluster'] & {
          local?: boolean;
          relationship_type?: string;
        })[];
      }[];
      Tag?: {
        local?: boolean;
        relationship_type?: string;
      }[];
    }
  };
};
