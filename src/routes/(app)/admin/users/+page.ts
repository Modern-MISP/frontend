import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';

export const load: PageLoad = async () => {
  const { data, error: mispError, response } = await GET('/admin/users');

  if (mispError) throw error(response.status, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.User?.id ?? 'unknown' }),
    col({
      icon: 'material-symbols:work-outline',
      key: 'org',
      label: 'Organisations',
      display: Info,
      value: (x) => ({ text: x.Organisation?.name ?? 'unknown' })
    }),
    col({
      icon: 'mdi:lock-outline',
      key: 'role',
      label: 'Role',
      display: Info,
      value: (x) => ({ text: x.Role?.name ?? 'unknown' })
    }),

    col({
      icon: 'mdi:email-outline',
      key: 'email',
      label: 'Email',
      display: Info,
      value: (x) => ({ text: x.User?.email ?? 'unknown' })
    }),

    col({
      icon: 'mdi:id-card',
      key: 'nids_sid',
      label: 'NIDS SID',
      display: Info,
      // class: 'whitespace-nowrap',
      value: (x) => ({ text: x.User?.nids_sid ?? 'unknown' })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'last_login',
      label: 'Last Login',
      display: DatePill,
      // class: 'whitespace-nowrap',
      value: (x) => ({ date: new Date(+(x.User?.last_login || 0) * 1000) })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'created',
      label: 'Created',
      display: DatePill,
      value: (x) => ({ date: new Date(+(x.User?.date_created || 0) * 1000) })
    }),
    col({
      icon: 'mdi:lock-outline',
      key: 'totp',
      label: 'TOTP',
      display: Boolean,
      value: (x) => ({ isTrue: x.User?.authkey === 'true' })
    }),

    col({
      icon: 'mdi:account-outline',
      key: 'contact',
      label: 'Contact',
      display: Boolean,
      value: (x) => ({ isTrue: x.User?.contactalert })
    }),
    col({
      icon: 'mdi:bell-outline',
      key: 'notification',
      label: 'Notification',
      display: Boolean,
      value: (x) => ({ isTrue: x.User?.autoalert })
    }),
    col({
      icon: 'mdi:key-outline',
      key: 'pgp_key',
      label: 'PGP',
      display: Boolean,
      value: (x) => ({ isTrue: x.User?.gpgkey === 'true' })
    }),
    col({
      icon: 'mdi:scale-balance',
      label: 'terms',
      key: 'Terms',
      display: Boolean,
      value: (x) => ({ isTrue: x.User?.termsaccepted })
    })
  ];
  return {
    data,
    tableData: data,
    header
  };
};
