import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { notifications } from '$lib/stores';
import { successPill } from '$lib/util/pill.util';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await GET('/admin/users', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.User?.id ?? 'unknown' }),
    col({
      icon: 'material-symbols:work-outline',
      key: 'org',
      label: 'Organisations',
      value: (x) => ({ display: Info, props: { text: x.Organisation?.name ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:lock-outline',
      key: 'role',
      label: 'Role',
      value: (x) => ({ display: Info, props: { text: x.Role?.name ?? 'unknown' } })
    }),

    col({
      icon: 'mdi:email-outline',
      key: 'email',
      label: 'Email',
      value: (x) => ({ display: Info, props: { text: x.User?.email ?? 'unknown' } })
    }),

    col({
      icon: 'mdi:id-card',
      key: 'nids_sid',
      label: 'NIDS SID',
      // class: 'whitespace-nowrap',
      value: (x) => ({ display: Info, props: { text: x.User?.nids_sid ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'last_login',
      label: 'Last Login',
      // class: 'whitespace-nowrap',
      value: (x) => ({
        display: DatePill,
        props: { date: new Date(+(x.User?.last_login || 0) * 1000) }
      })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'created',
      label: 'Created',
      value: (x) => ({
        display: DatePill,
        props: { date: new Date(+(x.User?.date_created || 0) * 1000) }
      })
    }),
    col({
      icon: 'mdi:lock-outline',
      key: 'totp',
      label: 'TOTP',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.authkey === 'true' } })
    }),

    col({
      icon: 'mdi:account-outline',
      key: 'contact',
      label: 'Contact',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.contactalert } })
    }),
    col({
      icon: 'mdi:bell-outline',
      key: 'notification',
      label: 'Notification',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.autoalert } })
    }),
    col({
      icon: 'mdi:key-outline',
      key: 'pgp_key',
      label: 'PGP',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.gpgkey === 'true' } })
    }),
    col({
      icon: 'mdi:scale-balance',
      label: 'terms',
      key: 'Terms',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.termsaccepted } })
    })
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Enable User',
      icon: 'mdi:account-lock-open-outline',
      action: (x) => {
        notifications.add(successPill('Enable: ' + x.map((y) => y.User?.id).join()));
      }
    },
    {
      label: 'Disable User',
      icon: 'mdi:account-lock-outline',
      action: (x) => {
        alert('Disable' + x.map((y) => y.User?.id).join());
      }
    },
    {
      label: 'Delete User',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: (x) => {
        alert('Delete' + x.map((y) => y.User?.id).join());
      }
    },
    {
      label: 'Send Email Publish',
      icon: 'icon-park-outline:send-email',
      action: (x) => {
        alert('Send email publish' + x.map((y) => y.User?.id).join());
      }
    },
    {
      label: 'Disable Email Publish',
      icon: 'mdi:email-lock-outline',
      action: (x) => {
        alert('Disable email publish' + x.map((y) => y.User?.id).join());
      }
    }
  ];
  return {
    data,
    tableData: data,
    header,
    editActions
  };
};
