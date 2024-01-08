import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import type DynTable from '$lib/components/table/dynTable/DynTable.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const { data, error: mispError, response } = await GET('/admin/users');

  if (mispError) throw error(response.status, mispError.message);

  const header = [
    { icon: 'mdi:id-card', name: 'id', value: 'ID' },

    {
      icon: 'material-symbols:work-outline',
      name: 'org',
      value: 'Organisations',
      displayComp: Info
    },
    {
      icon: 'mdi:lock-outline',
      name: 'role',
      value: 'Role',
      displayComp: Info
    },

    {
      icon: 'mdi:email-outline',
      name: 'email',
      value: 'Email',
      displayComp: Info
    },

    {
      icon: 'mdi:id-card',
      name: 'nids_sid',
      value: 'NIDS SID',
      displayComp: Info,
      class: 'whitespace-nowrap'
    },
    {
      icon: 'mdi:clock-outline',
      name: 'last_login',
      value: 'Last Login',
      displayComp: DatePill,
      class: 'whitespace-nowrap'
    },
    {
      icon: 'mdi:clock-outline',
      name: 'created',
      value: 'Created',
      displayComp: DatePill
    },
    {
      icon: 'mdi:lock-outline',
      name: 'totp',
      value: 'TOTP',
      displayComp: Boolean
    },

    {
      icon: 'mdi:account-outline',
      name: 'contact',
      value: 'Contact',
      displayComp: Boolean
    },
    {
      icon: 'mdi:bell-outline',
      name: 'notification',
      value: 'Notification',
      displayComp: Boolean
    },
    {
      icon: 'mdi:key-outline',
      name: 'pgp_key',
      value: 'PGP',
      displayComp: Boolean
    },
    {
      icon: 'mdi:scale-balance',
      name: 'terms',
      value: 'Terms',
      displayComp: Boolean
    }
  ] as const;

  const tableData: DynTable<typeof header>['$$prop_def']['data'] = data.map((x) => ({
    created: {
      date: new Date()
    },
    email: {
      text: x.User?.email
    },
    id: x.User?.id,
    last_login: {
      date: new Date(+(x.User?.last_login || 0) * 1000)
    },
    nids_sid: {
      text: x.User?.nids_sid
    },
    role: {
      text: x.Role?.name,
      class: 'whitespace-nowrap'
    },
    org: {
      text: x.Organisation?.name
    },
    notification: {
      isTrue: x.User?.autoalert,
      class: 'mx-auto'
    },
    contact: {
      isTrue: x.User?.contactalert,
      class: 'mx-auto'
    },
    pgp_key: {
      isTrue: x.User?.gpgkey,

      class: 'mx-auto'
    },
    terms: {
      isTrue: x.User?.termsaccepted,

      class: 'mx-auto'
    },
    totp: {
      isTrue: x.User?.authkey,

      class: 'mx-auto'
    }
  }));
  return {
    data,
    tableData,
    header
  };
};
