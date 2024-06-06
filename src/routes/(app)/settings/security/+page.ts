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

export const load: PageLoad = async ({ fetch }) => {
  const card = await loadCard(fetch);
  const table = await loadTable(fetch);

  return {
    card,
    table
  };
};

function loadCard(fetch: {
  (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  (input: string | Request | URL, init?: RequestInit | undefined): Promise<Response>;
}) {
  // This is a mock data. Actual Data will be fetched from API.
  fetch;

  const data = [
    {
      User: {
        email: 'admin@admin.test',
        date_created: '2023-09-01',
        last_login: '2024-05-03'
      },
      Role: {
        name: 'admin'
      },
      Organisation: {
        name: 'Musterorganisation'
      },
      UserSetting: {
        name: 'Max Mustermann',
        menu_open_default: true,
        theme: 0
      }
    }
  ];

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'Email',
      value: () => ({
        display: Input,
        props: {
          value: data[0].User.email,
          name: 'email'
        }
      })
    }),
    col({
      label: 'Password',
      value: () => ({
        display: Input,
        props: {
          placeholder: 'Enter New Password',
          name: 'password'
        }
      })
    })
  ];

  return {
    header,
    data
  };
}

function loadTable(fetch: {
  (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  (input: string | Request | URL, init?: RequestInit | undefined): Promise<Response>;
}) {
  // This is a mock data. Actual Data will be fetched from API.
  fetch;

  const data = [
    {
      AuthKey: {
        allowed_ips: null,
        authkey_end: 'GGMX',
        authkey_start: 'RQYG',
        comment: 'Initial auto-generated key',
        expiration: '0',
        id: '1',
        last_used: null,
        unique_ips: []
      }
    },
    {
      AuthKey: {
        allowed_ips: [],
        authkey_end: 'JKDA',
        authkey_start: 'CIEA',
        comment: 'Login key',
        expiration: '0',
        id: '2',
        last_used: null,
        unique_ips: []
      }
    }
  ];

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
        console.log(x);
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
