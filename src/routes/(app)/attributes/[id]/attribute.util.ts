import { api } from '$lib/api';
import { get } from 'svelte/store';
import { handleEventPromise } from '../../events/[id]/_components/event.util';

/**
 * Adds a collection of tags to misp.
 * @param tags A collection of tags
 */
export async function addTags(
  tags: {
    local_only: boolean;
    value: string;
    attributeId: string;
  }[]
) {
  const promises = tags.map(({ value, local_only, attributeId }) =>
    get(api).POST('/attributes/addTag/{attributeId}/{tagId}/local:{local}', {
      params: {
        path: {
          attributeId,
          tagId: value,
          local: local_only ? 1 : 0
        }
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  );
  handleEventPromise(promises);
}

export async function deleteTags(
  tags: {
    value: string;
    attributeId: string;
  }[]
) {
  const promises = tags.map(({ value: id, attributeId }) =>
    get(api).POST('/attributes/removeTag/{attributeId}/{tagId}', {
      params: {
        path: {
          attributeId,
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
