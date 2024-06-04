import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { PageLoad } from './$types';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import type { FastFilter } from '$lib/models/FastFilter.interface';

export const load: PageLoad = async () => {
  // Static data
  const data = [
    {
      User: {
        id: '1',
        email: 'user1@example.com',
        password: 'asdsad',
        nids_sid: 'Organisation one',
        last_login: 1625140800,
        date_created: 1612137600,
        authkey: 'true',
        contactalert: true,
        autoalert: true,
        gpgkey: 'true',
        termsaccepted: true
      },
      Organisation: { name: 'Org 1' },
      Role: { name: 'Admin' }
    },
    {
      User: {
        id: '2',
        password: 'sdasda',
        email: 'user2@example.com',
        nids_sid: 'Organisation two',
        last_login: 1625140800,
        date_created: 1612137600,
        authkey: 'false',
        contactalert: false,
        autoalert: false,
        gpgkey: 'false',
        termsaccepted: false
      },
      Organisation: { name: 'Org 2' },
      Role: { name: 'User' }
    }
  ];

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({
      icon: 'mdi:person-outline',
      key: 'nids_sid',
      label: 'Name',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'material-symbols:work-outline',
          text: x.User?.nids_sid ?? 'unknown',
          href: `/admin/users/${x.User?.id}`
        }
      })
    }),

    col({
      icon: 'mdi:pound',
      key: 'users',
      label: 'Users',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:pound',
          text: x.User?.id,
          href: `/admin/users/${x.User?.id}`
        }
      })
    }),
    col({
      icon: 'mdi:pound',
      key: 'events',
      label: 'Events',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:pound',
          text: x.User?.id,
          href: `/admin/users/${x.User?.id}`
        }
      })
    }),

    col({
      icon: 'mdi:pound',
      key: 'attributes',
      label: 'Attributes',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:pound',
          text: x.User?.id,
          href: `/admin/users/${x.User?.id}`
        }
      })
    }),
    col({
      icon: 'mdi:alert-circle-outline',
      key: 'type',
      label: 'Type',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:tag',
          text: x.User?.id,
          href: `/admin/users/${x.User?.id}`
        }
      })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'last_activity',
      label: 'Activity',
      value: (x) => ({
        display: DatePill,
        props: { date: new Date(+(x.User?.last_login || 0) * 1000) }
      })
    })
  ];

  const fil = createTableHeadGenerator<undefined>();

  const filter = [
    fil({
      label: 'Local Organisations',
      value: () => ({
        display: Checkbox,
        props: {
          checked: true,
          name: 'Local Organisations'
        }
      })
    }),
    fil({
      label: 'Known remote Organisations',
      value: () => ({
        display: Checkbox,
        props: {
          checked: true,
          name: 'Known remote Organisations'
        }
      })
    })
  ];
  const fastFilter: FastFilter[] = [
    {
      label: 'Local Organisations',
      icon: 'mdi:monitor',
      ifActive: {}
    },
    {
      label: 'Known remote Organisations',
      icon: 'mdi:remote-desktop',
      ifActive: {}
    }
  ];

  return {
    data,
    tableData: data,
    header,
    filter,
    fastFilter,
    maxCount: data.length
  };
};
