import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/admin/users/view/{userId}', { params: { path: { userId: params.id } }, fetch });

  if (mispError) error(response.status, mispError.message);

  const col = createTableHeadGenerator<typeof data>();

  const left = [
    col({
      key: 'email',
      label: 'Name',
      value: (x) => x.User?.email ?? 'unknown'
    }),
    col({
      key: 'id',
      label: 'ID',
      value: (x) => x.User?.id ?? 'unknown'
    }),
    col({
      key: 'name',
      label: 'Role',
      value: (x) => x.Role?.name ?? 'unknown'
    }),
    col({
      key: 'nids_sid',
      label: 'NIDS SID',
      value: (x) => x.User?.nids_sid ?? 'unknown'
    }),
    col({
      icon: 'mdi:clock-outline',  
      key: 'last_pw_change',
      label: 'Last password change',
      display: DatePill,
      // class: 'whitespace-nowrap',
      value: (x) => ({ date: new Date(+(x.User?.last_pw_change || 0) * 1000) })
      })
  ];

  const right = [
    col({
        key: 'disabled',
        label: 'Is enabled',
        display: Boolean,
        value: (x) => ({ isTrue: !(x.User?.disabled) })
    }),
    col({
        key: 'authkey',
        label: 'TOTP set',
        display: Boolean,
        value: (x) => ({ isTrue: x.User?.authkey ?? false })
    }),
    col({
        key: 'contactalert',
        label: 'Contact enables',
        display: Boolean,
        value: (x) => ({ isTrue: x.User?.contactalert ?? false })
    }),
    col({
        key: 'termsaccepted',
        label: 'Terms accepted',
        display: Boolean,
        value: (x) => ({ isTrue: x.User?.termsaccepted ?? false })
    }),
    col({
        key: 'gpgkey',
        label: 'PGP key',
        display: Boolean,
        value: (x) => ({ isTrue: x.User?.gpgkey ?? false })
    }),
    col({
        key: 'force_logout',
        label: 'Must change password',
        display: Boolean,
        value: (x) => ({ isTrue: x.User?.change_pw === "1" ?? false })
    }),

    //TODO: formatting

    col({
        key: 'notification_daily',
        label: 'daily',
        display: Boolean,
        value: (x) => ({ isTrue: x.User?.notification_daily ?? false })
    }),
    col({
        key: 'notification_weekly',
        label: 'weekly',
        display: Boolean,
        value: (x) => ({ isTrue: x.User?.notification_weekly ?? false })
    }),
    col({
        key: 'notification_monthly',
        label: 'monthly',
        display: Boolean,
        value: (x) => ({ isTrue: x.User?.notification_monthly ?? false })
    })
  ];

  return {
    user: data,
    left,
    right
  };
};