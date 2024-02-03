import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import CallbackEntry from '$lib/components/menus/topmenu/actionbar/CallbackEntry.svelte';

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

  const editAction = createTableHeadGenerator<typeof data>();

  const defaultEditAction = (
    label: string,
    icon: string,
    clazz: string,
    action: (x: typeof data) => void
  ) =>
    editAction({
      label: '',
      value: (x) => ({
        display: CallbackEntry,
        props: {
          action: () => action(x),
          label,
          icon,
          class: clazz
        }
      })
    });

  const editActions = [
    defaultEditAction('Delete', 'mdi:delete-outline', 'text-red', (x) =>
      alert('DELETE!' + x?.[0]?.User?.id)
    ),
    defaultEditAction('Delete', 'mdi:delete-outline', '', (x) =>
      alert('DELETE!' + x?.[0]?.User?.id)
    )
  ];
  return {
    data,
    tableData: data,
    header,
    editActions
  };
};
