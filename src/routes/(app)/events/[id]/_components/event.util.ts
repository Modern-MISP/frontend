import { invalidateAll } from '$app/navigation';
import { api } from '$lib/api';
import { notifications } from '$lib/stores';
import { errorPill, successPill } from '$lib/util/pill.util';
import { partition } from 'lodash-es';
import { get } from 'svelte/store';

/**
 * Adds some galaxy clusters to the event.
 * @param clusters some clusters
 */
export async function attachCluster(
  clusters: {
    local: boolean;
    id: string;
    eventId: string;
  }[]
) {
  const promises = clusters.map(({ id, local, eventId }) =>
    get(api).POST('/galaxies/attachCluster/{attachTargetId}/{attachTargetType}/local:{local}', {
      params: {
        path: {
          attachTargetId: eventId,
          attachTargetType: 'event',
          local: local ? 1 : 0
        }
      },
      body: {
        Galaxy: {
          target_id: +id
        }
      }
    })
  );

  handleEventPromise(promises);
}

export async function detachCluster(
  clusters: {
    id: string;
    eventId: string;
  }[]
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promises: any = clusters.map(({ id, eventId }) =>
    // @ts-expect-error not in the api spec
    get(api).POST('/galaxy_clusters/detach/{eventId}/event/{clusterId}', {
      params: {
        path: {
          eventId,
          clusterId: id
        }
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  );

  handleEventPromise(promises);
}

/**
 * Adds a collection of tags to misp.
 * @param tags A collection of tags
 */
export async function addTags(
  tags: {
    local: boolean;
    id: string;
    eventId: string;
  }[]
) {
  const promises = tags.map(({ id, local, eventId }) =>
    get(api).POST('/events/addTag/{eventId}/{tagId}/local:{local}', {
      params: {
        path: {
          eventId,
          tagId: id,
          local: local ? 1 : 0
        }
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  );
  handleEventPromise(promises);
}

/**
 * Removes a collection of tags to misp.
 * @param tags A collection of tags
 */
export async function deleteTags(
  tags: {
    id: string;
    eventId: string;
  }[]
) {
  const promises = tags.map(({ id, eventId }) =>
    get(api).POST('/events/removeTag/{eventId}/{tagId}', {
      params: {
        path: {
          eventId,
          tagId: id
        }
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  );
  handleEventPromise(promises);
}

async function handleEventPromise<
  T extends {
    data?:
      | {
          errors?: string | undefined | null;
          saved?: boolean | undefined;
        }
      | undefined;
    error?:
      | { name: string; message: string; url: string }
      | { name: string; message: string; url: string };
  }
>(promises: Promise<T>[]) {
  try {
    const res = await Promise.all(promises);
    // partition the answer into success and error, because misp sends errors with the 200 status...
    const [success, errors] = partition(res, ({ error, data }) => !error && data && !data.errors);

    if (errors.length > 0) {
      notifications.add(errorPill('Some errors occurred. Please refer to the console.'));
      console.error(errors);
    }

    if (success.length > 0) notifications.add(successPill(`Changed ${success.length} elements.`));
  } catch (error) {
    notifications.add(
      errorPill(
        'Some external errors occurred. Could also be a cors error. Please refer to the console.'
      )
    );
    console.error(error);
  }

  // Always invalidate, because cors errors are not fatal => tags could be added without notification.
  invalidateAll();
}

// TODO: update the relation here, if we have any idea how to get the id. Attention. The required id is another then the id from the tag. It is an event specific idea and I have no clue how to access it.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function updateRelation({ id, relation }: { id: string; relation: string }) {
  const endpoint = `tags/modifyTagRelationship/event/{id}`;

  // @ts-expect-error not in the api spec. Don't know how to get the id...
  await $api.POST(endpoint, {
    params: {
      path: {
        id
      }
    },
    body: {
      'data[Tag][relationship_type]': relation
    }
  });
}
