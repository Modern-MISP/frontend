import { GET } from '$lib/api';
import type DynTable from '$lib/components/table/dynTable/DynTable.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Info from '$lib/components/info/Info.svelte';
import RelativeDatePill from '$lib/components/pills/datePill/RelativeDatePill.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';

export const load: PageLoad = async () => {
  const { data, error: mispError, response } = await GET('/auth_keys');

  if (mispError) throw error(response.status, mispError.message);

  const header = [
    { icon: 'mdi:id-card', name: 'id', value: 'ID' },
    {
      icon: 'mdi:account-outline',
      name: 'user',
      value: 'User',
      displayComp: HrefPill
    },
    {
      icon: 'mdi:key-outline',
      name: 'key',
      value: 'Key',
      displayComp: Info
    },
    {
      icon: 'mdi:information-outline',
      name: 'comment',
      value: 'Comment',
      displayComp: Info
    },
    {
      icon: 'mdi:clock-alert-outline',
      name: 'expiration',
      value: 'Expiration',
      displayComp: RelativeDatePill
    },
    {
      icon: 'mdi:clock-outline',
      name: 'last_used',
      value: 'Last used',
      displayComp: DatePill,
      class: 'whitespace-nowrap'
    },
    {
      icon: 'mdi:eye-circle-outline',
      name: 'last_seen_ip',
      value: 'Last seen IP',
      displayComp: Info,
      class: 'whitespace-nowrap'
    },
    {
      icon: 'ph:hash-bold',
      name: 'ip_count',
      value: 'IP count',
      displayComp: PillCollection
    }
  ] as const;

  console.log(data);

  const tableData: DynTable<typeof header>['$$prop_def']['data'] = data.map((x) => ({
    id: x.AuthKey?.id,
    user: {
      icon: 'mdi:account-outline',
      text: x.User?.email,
      href: `/admin/users/${x.User?.id}/view`
    },
    expiration: {
      date: +x.AuthKey?.expiration && new Date(+x.AuthKey?.expiration * 1000) // "0" evaluates to false is js. Thats the reason this works XD
    },
    last_seen_ip: {
      text: x.AuthKey.unique_ips?.[0] ?? 'Never seen'
    },
    last_used: {
      date: x.AuthKey?.last_used && new Date(+x.AuthKey?.last_used * 1000),
      onNullText: 'Never'
    },
    key: {
      text: x.AuthKey?.authkey_end + '••••••••••••••' + x.AuthKey?.authkey_end
    },
    comment: {
      text: x.AuthKey?.comment,
      class: 'line-clamp-3'
    },
    ip_count: {
      pills: [
        {
          label: 'Seen',
          text: x.AuthKey?.unique_ips?.length
        },
        {
          label: 'Allowed',
          text: x.AuthKey?.allowed_ips?.length ?? 'All'
        }
      ]
    }
  }));
  return {
    data,
    tableData,
    header
  };
};
