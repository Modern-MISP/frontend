import { api } from '$lib/api';
import type { components } from '$lib/api/misp';
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
  const eventGraphReferencesResult = GET('/events/getEventGraphReferences/{eventId}', {
    params: { path: { eventId: params.id } }
  });

  // NOTE: This type is handwritten and mostly guessed based on the API response, it might be wrong, use with caution.
  const eventGraphReferences = (await eventGraphReferencesResult).data as {
    available_pivot_key: string[];
    existing_object_relation: Record<string, number>;
    existing_tags: Record<number, string>;
    items: {
      id: string;
      label: string;
      node_type: string;
      type: string;
      uuid: string;
      comment: string;
      event_id: string;
    }[];
    relations: {
      comment: string;
      event_id: string;
      from: string;
      id: string;
      to: string;
      type: string;
      uuid: string;
    }[];
  };

  console.log(eventGraphReferences);

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
