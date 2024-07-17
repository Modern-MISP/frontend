import { goto } from '$app/navigation';
import { token } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { api } from '$lib/api';
import { get } from 'svelte/store';
import { page } from '$app/stores';

export const load = async ({ params, url, fetch }) => {
  const code = url.searchParams.get('code');
  const { data, error: mispError, response } = await get(api).POST('/auth/login/idp/{identityProviderName}/callback', {
    params: { path: { identityProviderName: params.name } },
    body: { code: code, redirect_uri: `${window.location.origin}/login/oidc/${params.name}/callback` }
  })
  if (mispError) error(response.status as NumericRange<400, 599>, mispError.detail);

  return {
    token: data.token
  }
};
