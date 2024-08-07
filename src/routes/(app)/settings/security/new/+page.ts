import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load = async () => {
  const { response, data: user, error: mispError } = await get(api).GET('/users/view/me');
  // eslint-disable-next-line no-warning-comments
  //TODO: types of status and message are not set, therefor .status an .message default to never
  if (mispError) error(response["status"] as NumericRange<400, 599>, mispError["message"]);

  return {
    user: user!
  };
};
