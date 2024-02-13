import { api } from '$lib/api';
import type { components } from '$lib/api/misp';
import type { EventGraphReferences } from '$lib/models/EventGraphReferences.js';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load = async ({ params, fetch }) => {
  const { GET } = get(api);

  const {
    data,
    error: mispError,
    response
  } = await GET('/events/view/{eventId}', {
    params: { path: { eventId: params.id } },
    fetch
  });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  // @ts-expect-error Not in the OpenAPI spec
  const { data: eventGraphReferences } = GET('/events/getEventGraphReferences/{eventId}', {
    params: { path: { eventId: params.id } }
  });

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
    },
    eventGraphReferences: eventGraphReferences as EventGraphReferences
  };
};
