import { errorPill, successPill } from './pill.util';
import { notifications } from '$lib/stores';

export async function notifySave(response: Promise<unknown>) {
  return response
    .then(() => {
      notifications.add(successPill('saved'));
    })
    .catch((e) => notifications.add(errorPill(e)));
}
