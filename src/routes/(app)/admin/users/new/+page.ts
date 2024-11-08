import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import { compatibility } from '$lib/stores';

import idCardHeaders from '../idCardHeaders';

export const load: PageLoad = async ({ fetch }) => {
  const { data: roles, error: mispError, response } = await get(api).GET('/roles', { fetch });
  // eslint-disable-next-line no-warning-comments
  //TODO: types of status and message are not set, therefor .status an .message default to never
  if (mispError) error(response['status'] as NumericRange<400, 599>, mispError['message']);

  const {
    data: orgs,
    error: mispErrorOrgs,
    response: responseOrgs
  } = await get(api).GET('/organisations', { fetch });
  // eslint-disable-next-line no-warning-comments
  //TODO: types of status and message are not set, therefor .status an .message default to never
  if (mispErrorOrgs)
    error(responseOrgs['status'] as NumericRange<400, 599>, mispErrorOrgs['message']);

  const header = [
    !compatibility ? idCardHeaders.name : undefined,
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
  ].filter((x) => typeof x !== 'undefined');

  return {
    roles: { Roles: roles, Organisations: orgs },
    header
  };
};
