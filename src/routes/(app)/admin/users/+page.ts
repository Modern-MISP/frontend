import { api } from '$lib/api';
import { invalidateAll } from '$app/navigation';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Select from '$lib/components/form/Select.svelte';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { notifications } from '$lib/stores';
import { errorPill, successPill } from '$lib/util/pill.util';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await get(api).GET('/admin/users', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.User?.id ?? 'unknown' }),
    col({
      icon: 'material-symbols:work-outline',
      key: 'org',
      label: 'Organizations',
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
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:email-outline',
          text: x.User?.email,
          href: `/admin/users/${x.User?.id}`
        }
      })
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
      label: 'Terms',
      key: 'terms',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.termsaccepted } })
    })
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Enable User',
      icon: 'mdi:account-lock-open-outline',
      action: (x) => {
        Promise.all(
          x
            .map((y) => y.User?.id)
            .map((userId) =>
              get(api).PUT('/admin/users/edit/{userId}', {
                fetch,
                params: { path: { userId: userId! } },
                body: { disabled: false }
              })
            )
        ).then(() => {
          notifications.add(successPill('Enabled users ' + x.map((y) => y.User?.id).join(', ')));
          invalidateAll();
        });
      }
    },
    {
      label: 'Disable User',
      icon: 'mdi:account-lock-outline',
      action: (x) => {
        Promise.all(
          x
            .map((y) => y.User?.id)
            .map((userId) =>
              get(api).PUT('/admin/users/edit/{userId}', {
                fetch,
                params: { path: { userId: userId! } },
                body: { disabled: true }
              })
            )
        ).then(() => {
          notifications.add(successPill('Disabled users ' + x.map((y) => y.User?.id).join(', ')));
          invalidateAll();
        });
      }
    },
    {
      label: 'Delete User',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: (x) => {
        Promise.all(
          x
            .map((y) => y.User?.id)
            .map((userId) =>
              get(api).DELETE('/admin/users/delete/{userId}', {
                fetch,
                params: { path: { userId: userId! } }
              })
            )
        ).then(() => {
          notifications.add(successPill('Deleted users ' + x.map((y) => y.User?.id).join(', ')));
          invalidateAll();
        });
      }
    },
    {
      label: 'Enable Email Publish',
      icon: 'icon-park-outline:send-email',
      action: (x) => {
        // TODO: add a endpoint if found.
        notifications.add(
          errorPill(
            'Do not know the endpoint. Send email publish ' + x.map((y) => y.User?.id).join(', ')
          )
        );
      }
    },
    {
      label: 'Disable Email Publish',
      icon: 'mdi:email-lock-outline',
      action: (x) => {
        // TODO: add a endpoint if found.
        notifications.add(
          errorPill(
            'Do not know the endpoint. Disable email publish ' + x.map((y) => y.User?.id).join(', ')
          )
        );
      }
    }
  ];

  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:user-add-outline',
      label: 'Add User',
      action: '/admin/users/new'
    }
  ];

  // @ts-expect-error Not in the OpenAPI spec.. great.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: roleData }: { data: any[] } = await get(api).GET('/roles');
  const { data: orgData } = await get(api).GET('/organisations');

  const fil = createTableHeadGenerator<undefined>();
  const filter = [
    fil({
      label: 'ID',
      value: () => 'id'
    }),

    fil({
      label: 'Org',
      value: () => ({
        display: Select,
        props: {
          options:
            orgData?.map((x) => ({
              label: x.Organisation?.name ?? 'unknown',
              value: x.Organisation?.id ?? 'unknown'
            })) ?? [],
          value: orgData && orgData.length > 0 ? orgData[0].Organisation?.id ?? '0' : '0',
          name: 'org'
        }
      })
    }),
    fil({
      label: 'Role',
      value: () => ({
        display: Select,
        props: {
          options:
            roleData?.map((x) => ({
              label: x.Role?.name ?? 'unknown',
              value: x.Role?.id ?? 'unknown'
            })) ?? [],
          value: roleData && roleData.length > 0 ? roleData[0].Role?.id ?? '0' : '0',
          name: 'role'
        }
      })
    }),
    fil({
      label: 'Email',
      value: () => 'email'
    }),
    fil({
      label: 'NIDS SID',
      value: () => 'nids_sid'
    }),
    fil({
      label: 'Last Login',
      value: () => 'last_login'
    }),
    fil({
      label: 'Created',
      value: () => 'created'
    }),
    fil({
      label: 'TOTP',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'totp'
        }
      })
    }),
    fil({
      label: 'Contact',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'contact'
        }
      })
    }),
    fil({
      label: 'Notification',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'notification'
        }
      })
    }),
    fil({
      label: 'PGP-Key',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'pgp_key'
        }
      })
    }),
    fil({
      label: 'Terms',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'termstrue '
        }
      })
    })
  ];
  return {
    data,
    tableData: data,
    header,
    editActions,
    topMenuActions,
    filter
  };
};
