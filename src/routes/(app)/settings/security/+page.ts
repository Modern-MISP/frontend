import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { PageLoad } from './$types';
import Input from '$lib/components/input/Input.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import Info from '$lib/components/info/Info.svelte';
import RelativeDatePill from '$lib/components/pills/datePill/RelativeDatePill.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
import { api } from '$lib/api';
import { get } from 'svelte/store';
import { goto, invalidateAll } from '$app/navigation';
import { notifications } from '$lib/stores';
import { successPill } from '$lib/util/pill.util';

export const load: PageLoad = async ({ fetch }) => {
  const { userId } = await getUserId(fetch);
  const { userEmail } = await getUserEmail(fetch);
  const card = await loadCard(fetch);
  const table = await loadTable(fetch, userId, userEmail);

  return {
    userId,
    card,
    table
  };
};

// Funktion zum Laden der Benutzer-ID
async function getUserId(fetch: {
  (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  (input: string | Request | URL, init?: RequestInit | undefined): Promise<Response>;
}) {
  const { data } = await get(api).GET('/users/view/me', { fetch });
  return { userId: data.User?.id };
}

async function getUserEmail(fetch: {
  (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  (input: string | Request | URL, init?: RequestInit | undefined): Promise<Response>;
}) {
  const { data } = await get(api).GET('/users/view/me', { fetch });
  return { userEmail: data.User?.email };
}

// Funktion zum Laden der Benutzerinformationen und Auth-Keys
async function loadCard(fetch: {
  (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  (input: string | Request | URL, init?: RequestInit | undefined): Promise<Response>;
}) {
  // API-Aufruf zum Abrufen der Benutzerdaten
  const { data } = await get(api).GET('/users/view/me', { fetch });

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'Email',
      value: () => ({
        display: Input,
        props: {
          value: data.User?.email,
          name: 'email'
        }
      })
    })
  ];

  return {
    header,
    data
  };
}

// Funktion zum Laden der Auth-Keys des Benutzers
async function loadTable(
  fetch: {
    (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
    (input: string | Request | URL, init?: RequestInit | undefined): Promise<Response>;
  },
  userId: string,
  userEmail: string
) {
  // API-Aufruf zum Abrufen der Auth-Keys
  const { data } = await get(api).GET('/auth_keys/index/{userId}', {
    params: { path: { userId: userId } },
    fetch
  });

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
      icon: 'mdi:eye-outline',
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
      label: 'Ip count',
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
      icon: 'mdi:lock-reset',
      label: 'Change Password',
      action: () => goto(`/login/setPassword/${userEmail}`)
    },
    {
      icon: 'mdi:key-add',
      label: 'Add Key',
      action: '/settings/security/new'
    }
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Delete',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: (x) => {
        if (
          confirm(
            `Are you sure you want to delete the auth key with ids: ${x.map((x) => x.AuthKey?.id).join(', ')}`
          )
        ) {
          Promise.all(
            x
              .map((y) => y.AuthKey?.id)
              .map((AuthKeyId) =>
                get(api).POST('/auth_keys/delete/{AuthKeyId}', {
                  fetch,
                  params: { path: { AuthKeyId: AuthKeyId! } }
                })
              )
          ).then(() => {
            notifications.add(
              successPill('Deleted auth key ' + x.map((y) => y.AuthKey?.id).join(', '))
            );
            invalidateAll();
          });
        }
      }
    },
    {
      label: 'Export',
      icon: 'mdi:download',
      action(x) {
        console.log(x);
      }
    }
  ];

  return {
    header,
    tableData: data,
    topMenuActions,
    editActions
  };
}
