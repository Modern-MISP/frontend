import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import config from '$lib/settings';

export const load = async () => {
  const {
    data,
    error: mispError,
    response
  } = await get(api)
    // @ts-expect-error Not in the OpenAPI spec
    .GET('/users/view/me');
  const cfg = await config();

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  // .then((resp) => {
  //   // @ts-expect-error Not in the OpenAPI spec
  //   admin.set(resp.data?.Role?.perm_admin ?? false);
  // });

  return {
    // @ts-expect-error Not in the OpenAPI spec
    admin: (data?.Role?.perm_admin ?? false) as boolean,
    // @ts-expect-error Not in the OpenAPI spec
    email: (data?.User?.email ?? '') as string,
    cfg
  };
};
