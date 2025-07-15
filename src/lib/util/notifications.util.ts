import { errorPill, successPill } from './pill.util';
import { notifications } from '$lib/stores.svelte.ts';

export async function notifySave(response: Promise<unknown>, message = 'Saved') {
  return response
    .then(() => {
      notifications.add(successPill(message));
    })
    .catch((e) => notifications.add(errorPill(e)));
}
