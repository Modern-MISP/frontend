import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { notifications } from '$lib/stores';
import { successPill } from '$lib/util/pill.util';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { PageLoad } from './$types';
import { api } from '$lib/api';
import { get } from 'svelte/store';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import { invalidateAll } from '$app/navigation';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await get(api).GET('/auth/openID/getAllOpenIDConnectProviders', { fetch });

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();
  
  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id ?? 'unknown' }),
    col({
      icon: 'mdi:watermark',
      key: 'provider',
      label: 'Provider',
      value: (x) => x.name ?? 'unknown'
    }),
    col({
      icon: 'mdi:link-variant',
      key: 'path',
      label: 'Path',
      value: (x) => x.base_url ?? 'unknown'
    }),
    col({
      icon: 'mdi:key-outline',
      key: 'token',
      label: 'Token',
      value: (x) => x.client_secret ?? 'unknown'
    }),
    col({
      icon: 'mdi:play',
      key: 'active',
      label: 'Active',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.active ?? false }
      })
    }),
    col({
      icon: 'mdi:account-group',
      key: 'organization',
      label: 'Organization',
      value: (x) => x.org_id ?? 'unknown' //api soll name der org geben
    }),
    col({
      icon: 'mdi:clipboard-account-outline',
      key: 'client_id',
      label: 'Client ID',
      value: (x) => x.client_id ?? 'unknown'
    })
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Delete Provider',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: (x) => {
        if (
          confirm(
            `Are you sure you want to delete the provider with ids: ${x.map((x) => x.id).join(', ')}`
          )
        ) {
          Promise.all(
            x
              .map((y) => y.id)
              .map((openIDConnectProvider) =>
                get(api).DELETE('/auth/openID/delete/{openIDConnectProvider}', {
                  fetch,
                  params: { path: { openIDConnectProvider: openIDConnectProvider! } }
                })
              )
          ).then(() => {
            notifications.add(successPill('Deleted provider ' + x.map((y) => y.id).join(', ')));
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

  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:plus-outline',
      label: 'Add Provider',
      action: '/admin/OIDConnect/new'
    }
  ];

  return {
    data,
    tableData: data,
    header,
    editActions,
    topMenuActions,
    maxCount: data.length
  };
};
