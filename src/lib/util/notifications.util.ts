import { errorPill, successPill } from './pill.util';
import { notifications } from '$lib/stores';

export async function notifySave(response: Promise<unknown>, message = 'Saved') {
  return response
    .then(() => {
      notifications.add(successPill(message));
    })
    .catch((e) => notifications.add(errorPill(e)));
}
