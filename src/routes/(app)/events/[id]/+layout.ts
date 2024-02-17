import { api } from '$lib/api';
import type { components } from '$lib/api/misp';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/events/view/{eventId}', {
    params: { path: { eventId: params.id } },
    fetch
  });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  return {
    event: data.Event! as NonNullable<typeof data.Event> & {
      Galaxy?: {
        GalaxyCluster?: (components['schemas']['GalaxyCluster'] & {
          local?: boolean;
          relationship_type?: string;
          tag_id: string;
        })[];
      }[];
      Tag?: {
        local?: boolean;
        relationship_type?: string;
      }[];
    }
  };
};
