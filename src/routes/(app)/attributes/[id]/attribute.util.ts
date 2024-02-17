import { api } from "$lib/api";
import { get } from "svelte/store";
import { handleEventPromise } from "../../events/[id]/_components/event.util";

/**
 * Adds a collection of tags to misp.
 * @param tags A collection of tags
 */
export async function addTags(
    tags: {
      local: boolean;
      id: string;
      attributeId: string;
    }[]
  ) {
    const promises = tags.map(({ id, local, attributeId }) =>
      get(api).POST('/attributes/addTag/{attributeId}/{tagId}/local:{local}', {
        params: {
          path: {
            attributeId,
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