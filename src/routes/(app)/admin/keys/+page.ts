import { api } from '$lib/api';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import RelativeDatePill from '$lib/components/pills/datePill/RelativeDatePill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await get(api).GET('/auth_keys', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<
    (typeof data)[number] & { AuthKey?: { unique_ips?: string[] } },
    DynTableHeadExtent
  >();

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
        display: HrefPill,
        props: {
          icon: 'mdi:account-outline',
          text: x.User?.email,
          href: `/admin/users/${x.User?.id}`
        }
      })
    }),

    col({
      icon: 'mdi:key-outline',
      key: 'key',
      label: 'Key',
      value: (x) => ({
        display: Info,
        props: {
          text: x.AuthKey?.authkey_start + '••••••••••••••' + x.AuthKey?.authkey_end
        }
      })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'comment',
      label: 'Comment',
      value: (x) => ({
        display: Info,
        props: {
          text: x.AuthKey?.comment || 'No Comment',
          class: 'line-clamp-3'
        }
      })
    }),
    col({
      icon: 'mdi:clock-alert-outline',
      key: 'expiration',
      label: 'Expiration',
      value: (x) => ({
        display: RelativeDatePill,
        props: {
          date:
            (x.AuthKey?.expiration &&
              +x.AuthKey.expiration !== 0 &&
              new Date(+x.AuthKey.expiration * 1000)) ||
            null
        }
      })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'last_used',
      label: 'Last used',
      value: (x) => ({
        display: DatePill,
        props: {
          date: (x.AuthKey?.last_used && new Date(+x.AuthKey?.last_used * 1000)) || null
        }
      })
      // class: 'whitespace-nowrap'
    }),
    col({
      icon: 'mdi:eye-circle-outline',
      key: 'last_seen_ip',
      label: 'Last seen Ip',
      value: (x) => ({
        display: Info,
        props: {
          text: x.AuthKey?.unique_ips?.[0] ?? 'Never seen'
        }
      })
      // class: 'whitespace-nowrap'
    }),
    col({
      icon: 'ph:hash-bold',
      key: 'ip_count',
      label: 'Attr.',
      value: (x) => ({
        display: PillCollection,
        props: {
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
      })
    })
  ];

  return {
    header,
    tableData: data
  };
};
