import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import RelativeDatePill from '$lib/components/pills/datePill/RelativeDatePill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/auth_keys/view/{authKeyId}', { params: { path: { authKeyId: params.id } }, fetch });

  if (mispError) error(response.status, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number]>();

  const left = [
    col({
        key: 'id',
        label: 'ID',
        value: (x) => x.AuthKey?.id ?? ''
    }),
    col({
        key: 'uuid',
        label: 'UUID',
        value: (x) => x.AuthKey?.uuid ?? ''
    }),
    col({
        key: 'key',
        label: 'Key',
        display: Info,
        value: (x) => ({
          text: x.AuthKey?.authkey_start + '••••••••••••••' + x.AuthKey?.authkey_end
        })
    }),
    col({
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
        icon: 'mdi:information-outline',
        key: 'expiration',
        label: 'Expires',
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
        key: 'read_only',
        label: 'Read only',
        display: Boolean,
        value: (x) => ({ isTrue: x.AuthKey?.read_only ?? false })
    }),
    col({
        key: 'comment',
        label: 'Comment',
        value: (x) => ({
          text: x.AuthKey?.comment || 'No Comment',
          class: 'line-clamp-3'
        }),
        display: Info
    }),
  ];

  const right = [
    col({
        key: 'seen_ip',
        label: 'Seen Ip',
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
    key: data,
    left,
    right
  };
};