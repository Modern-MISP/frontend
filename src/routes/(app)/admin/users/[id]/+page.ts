import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

import idCardHeaders from '../idCardHeaders';
import { compatibility } from '$lib/stores';

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

  const {
    data: roles,
    error: mispErrorRoles,
    response : responseRoles
  } = await get(api).GET('/roles', { fetch });

  if (mispErrorRoles) error(responseRoles.status as NumericRange<400, 599>, mispErrorRoles.message);

  const {
    data: orgs,
    error: mispErrorOrgs,
    response: responseOrgs
  } = await get(api).GET('/organisations', { fetch });

  if (mispErrorOrgs) error(responseOrgs.status as NumericRange<400, 599>, mispErrorOrgs.message);

  const left = [
    (!compatibility ? idCardHeaders.name : undefined),
    idCardHeaders.email,
    idCardHeaders.id,
    idCardHeaders.role,
    idCardHeaders.organisation,
    idCardHeaders.nids_sid,
    idCardHeaders.last_pw_change,
    idCardHeaders.last_login,
    idCardHeaders.created
  ].filter((x) => typeof x !== 'undefined');

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
    user: {User: data, Roles: roles, Organisations: orgs},
    left,
    right
  };
};
