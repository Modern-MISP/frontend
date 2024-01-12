import { GET } from '$lib/api';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import RelativeDatePill from '$lib/components/pills/datePill/RelativeDatePill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const { data, error: mispError, response } = await GET('/auth_keys');

  if (mispError) throw error(response.status, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.AuthKey?.id ?? ''
    }),

    col({
      icon: 'mdi:account-outline',
      key: 'user',
      label: 'User',
      value: (x) => ({
        icon: 'mdi:account-outline',
        text: x.User?.email,
        href: `/admin/users/${x.User?.id}`
      }),
      display: HrefPill
    }),

    col({
      icon: 'mdi:key-outline',
      key: 'key',
      label: 'Key',
      display: Info,
      value: (x) => ({
        text: x.AuthKey?.authkey_end + '••••••••••••••' + x.AuthKey?.authkey_end
      })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'comment',
      label: 'Comment',
      value: (x) => ({
        text: x.AuthKey?.comment || 'No Comment',
        class: 'line-clamp-3'
      }),
      display: Info
    }),
    col({
      icon: 'mdi:clock-alert-outline',
      key: 'expiration',
      label: 'Expiration',
      value: (x) => ({
        date:
          (x.AuthKey?.expiration &&
            +x.AuthKey.expiration !== 0 &&
            new Date(+x.AuthKey.expiration * 1000)) ||
          null
      }),
      display: RelativeDatePill
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'last_used',
      label: 'Last used',
      value: (x) => ({
        date: (x.AuthKey?.last_used && new Date(+x.AuthKey?.last_used * 1000)) || null
      }),
      display: DatePill
      // class: 'whitespace-nowrap'
    }),
    col({
      icon: 'mdi:eye-circle-outline',
      key: 'last_seen_ip',
      label: 'Last seen Ip',
      value: (x) => ({
        text: x.AuthKey?.unique_ips?.[0] ?? 'Never seen'
      }),
      display: Info
      // class: 'whitespace-nowrap'
    }),
    col({
      icon: 'ph:hash-bold',
      key: 'ip_count',
      label: 'Attr.',
      value: (x) => ({
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
      }),
      display: PillCollection
    })
  ];

  return {
    header,
    tableData: data
  };
};
