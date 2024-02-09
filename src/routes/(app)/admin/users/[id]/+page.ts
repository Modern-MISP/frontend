import { GET } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Input from '$lib/components/input/Input.svelte';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/admin/users/view/{userId}', { params: { path: { userId: params.id } }, fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<
    typeof data & {
      User?: {
        notification_daily?: boolean;
        notification_weekly?: boolean;
        notification_monthly?: boolean;
        last_pw_change?: number;
      };
    }
  >();

  const left = [
    col({
        key: 'email',
        label: 'Name',
        value: (x) => x.User?.email ?? 'unknown'
      },
      {
        value: (x) => ({ display: Input, props: { value: x.User?.email ?? 'unknown' } })
      }
    ),
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
    col(
      {
        key: 'nids_sid',
        label: 'NIDS SID',
        value: (x) => x.User?.nids_sid ?? 'unknown'
      },
      {
        value: (x) => ({ display: Input, props: { value: x.User?.nids_sid ?? 'unknown' } })
      }
    ),
    col({
      icon: 'mdi:clock-outline',
      key: 'last_pw_change',
      label: 'Last password change',
      // class: 'whitespace-nowrap',
      value: (x) => ({
        display: DatePill,
        props: { date: new Date(+(x.User?.last_pw_change || 0) * 1000) }
      })
    })
  ];

  const right = [
    col({
        key: 'disabled',
        label: 'Is enabled',
        value: (x) => ({ display: Boolean, props: { isTrue: !x.User?.disabled } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'disabled', checked: !x.User?.disabled ?? false }
        })
      }
    ),
    col({
        key: 'authkey',
        label: 'TOTP set',
        value: (x) => ({ display: Boolean, props: { isTrue: x.User?.authkey ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'authkey', checked: x.User?.authkey ?? false }
        })
      }
    ),
    col({
        key: 'contactalert',
        label: 'Contact enables',
        value: (x) => ({ display: Boolean, props: { isTrue: x.User?.contactalert ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'contactalert', checked: x.User?.contactalert ?? false }
        })
      }
    ),
    col({
        key: 'termsaccepted',
        label: 'Terms accepted',
        value: (x) => ({ display: Boolean, props: { isTrue: x.User?.termsaccepted ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'termsaccepted', checked: x.User?.termsaccepted ?? false }
        })
      }
    ),
    col({
      key: 'gpgkey',
      label: 'PGP key',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.gpgkey ?? false } })
    }),
    col({
      key: 'change_pw',
      label: 'Must change password',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.change_pw === '1' } })
    }),
    col({
        key: 'notification_daily',
        label: 'daily',
        value: (x) => ({ display: Boolean, props: { isTrue: x.User?.notification_daily ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'notification_daily', checked: x.User?.notification_daily ?? false }
        })
      }
    ),
    col({
        key: 'notification_weekly',
        label: 'weekly',
        value: (x) => ({ display: Boolean, props: { isTrue: x.User?.notification_weekly ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'notification_weekly', checked: x.User?.notification_weekly ?? false }
        })
      }
    ),
    col({
        key: 'notification_monthly',
        label: 'monthly',
        value: (x) => ({ display: Boolean, props: { isTrue: x.User?.notification_monthly ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'notification_monthly', checked: x.User?.notification_monthly ?? false }
        })
      }
    )
  ];

  return {
    user: data,
    left,
    right
  };
};
