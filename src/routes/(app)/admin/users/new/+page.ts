import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

import idCardHeaders from '../idCardHeaders';

export const load: PageLoad = async ({ fetch }) => {
  const { data: roles, error: mispError, response } = await get(api).GET('/roles', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const {
    data: orgs,
    error: mispErrorOrgs,
    response: responseOrgs
  } = await get(api).GET('/organisations', { fetch });

  if (mispErrorOrgs) error(responseOrgs.status as NumericRange<400, 599>, mispErrorOrgs.message);

  const header = [
    idCardHeaders.name,
    idCardHeaders.email,
    idCardHeaders.password,
    idCardHeaders.organisation,
    idCardHeaders.role,
    idCardHeaders.nids_sid,
    idCardHeaders.disabled,
    idCardHeaders.authkey,
    idCardHeaders.contactaltert,
    idCardHeaders.notification_daily,
    idCardHeaders.notification_weekly,
    idCardHeaders.notification_monthly,
    idCardHeaders.termsaccepted
  ];

  return {
    roles: { Roles: roles, Organisations: orgs },
    header
  };
};
