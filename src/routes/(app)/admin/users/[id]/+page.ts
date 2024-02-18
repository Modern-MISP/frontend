import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

import idCardHeaders from '../idCardHeaders';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/admin/users/view/{userId}', {
    params: { path: { userId: params.id } },
    fetch
  });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const left = [
    idCardHeaders.email,
    idCardHeaders.id,
    idCardHeaders.role,
    idCardHeaders.organisation,
    idCardHeaders.nids_sid,
    idCardHeaders.last_pw_change,
    idCardHeaders.last_login,
    idCardHeaders.created
  ];

  const right = [
    idCardHeaders.disabled,
    idCardHeaders.authkey,
    idCardHeaders.contactaltert,
    idCardHeaders.termsaccepted,
    idCardHeaders.gpgkey,
    idCardHeaders.change_pw,
    idCardHeaders.notification_daily,
    idCardHeaders.notification_weekly,
    idCardHeaders.notification_monthly
  ];

  return {
    user: data,
    left,
    right
  };
};
