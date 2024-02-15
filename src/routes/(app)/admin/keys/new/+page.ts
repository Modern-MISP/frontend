import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load = async () => {
  const { response, data: users, error: mispError } = await get(api).GET('/admin/users');

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  return {
    users: users!
  };
};
