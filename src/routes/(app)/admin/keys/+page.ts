import { invalidateAll } from '$app/navigation';
import { POST } from '$lib/api';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import RelativeDatePill from '$lib/components/pills/datePill/RelativeDatePill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await POST('/auth_keys', { fetch, body: { limit: 50, page: 1 } }); // I think limit does not work here. I guess there is no api support. great...

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
  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:key-add',
      label: 'Add Key',
      action: '/admin/keys/new'
    }
  ];
  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Delete',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: (x) => {
        if (!x) return;
        if (
          confirm(
            `Are you sure you want to delete the keys with ids: ${x.map((x) => x.AuthKey?.id).join(', ')}`
          )
        ) {
          Promise.all(
            x
              .map((y) => y.AuthKey?.id)
              .filter((x) => x)
              .map((keyId) =>
                // @ts-expect-error Not in the OpenAPI spec.. great.
                POST('/auth_keys/delete/{keyId}', {
                  fetch,
                  params: { path: { keyId: keyId as string } }
                })
              )
          ).then(invalidateAll);
        }
      }
    }
  ];

  return {
    header,
    tableData: data,
    topMenuActions,
    editActions
  };
};
