import { api } from '$lib/api';
import { get } from 'svelte/store';

import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';

import { invalidateAll } from '$app/navigation';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Icon from '@iconify/svelte';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await get(api).GET('/galaxies', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const tableData = data.map(
    (x) =>
      x.Galaxy as (typeof x)['Galaxy'] & {
        enabled: boolean;
        local_only?: boolean;
      }
  );

  const col = createTableHeadGenerator<(typeof tableData)[number], DynTableHeadExtent>();

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id ?? 'unknown' }),
    col({
      icon: '',
      key: 'icon',
      label: 'Icon',
      value: (x) => ({
        display: Icon,
        props: { icon: `fa6-solid:${x.icon}` }
      })
    }),
    col({
      icon: 'mdi:circle',
      key: 'name',
      label: 'Name',
      value: (x) => ({ display: Info, props: { text: x.name ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:telescope',
      key: 'namespace',
      label: 'Namespace',
      value: (x) => ({ display: Info, props: { text: x.namespace ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'description',
      label: 'Description',
      value: (x) => ({
        display: Info,
        props: { text: x.description ?? 'unknown', class: 'line-clamp-4' }
      })
    }),
    col({
      icon: 'material-symbols:conversion-path',
      key: 'version',
      label: 'Version',
      value: (x) => ({
        display: Info,
        props: { text: x.version ?? 'unknown', class: 'm-auto px-6' }
      })
    }),
    col({
      icon: 'mdi:checkbox-marked-outline',
      key: 'enabled',
      label: 'Enabled',
      value: (x) => ({ display: Boolean, props: { isTrue: x.enabled, class: 'm-auto' } })
    }),
    col({
      icon: 'mdi:cloud-off-outline',
      key: 'local_only',
      label: 'Local only',
      value: (x) => ({ display: Boolean, props: { isTrue: x.local_only, class: 'm-auto' } })
    })
  ];

  const editActions: DynCardActionHeader<typeof tableData>[] = [
    {
      label: 'Enable',
      icon: 'mdi:checkbox-outline',
      action: (selected) => {
        Promise.all(
          selected
            .map((y) => y.id)
            .map((galaxyId) =>
              // @ts-expect-error Not in the OpenAPI spec.. great.
              get(api).POST('/galaxies/enable/{galaxyId}', {
                fetch,
                params: { path: { galaxyId } }
              })
            )
        ).then(invalidateAll);
      }
    },
    {
      label: 'Disable',
      icon: 'mdi:close-box-outline',
      action: (selected) => {
        Promise.all(
          selected
            .map((y) => y.id)
            .map((galaxyId) =>
              // @ts-expect-error Not in the OpenAPI spec.. great.
              get(api).POST('/galaxies/disable/{galaxyId}', {
                fetch,
                params: { path: { galaxyId } }
              })
            )
        ).then(invalidateAll);
      }
    },
    {
      label: 'Delete',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: (x) => {
        if (
          confirm(
            `Are you sure you want to delete the galaxies with ids: ${x.map((x) => x.id).join(', ')}`
          )
        ) {
          Promise.all(
            x
              .map((y) => y.id)
              .map((galaxyId) =>
                //  @ts-expect-error Not in the OpenAPI spec.. great.
                get(api).POST('/galaxies/delete/{galaxyId}', {
                  fetch,
                  params: { path: { galaxyId } }
                })
              )
          ).then(invalidateAll);
        }
      }
    }
  ];
  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:refresh',
      label: 'Refresh Galaxies',
      action: () => {
        if (confirm('Do you want to update all Galaxies?'))
          get(api).POST('/galaxies/update').then(invalidateAll);
      }
    },
    {
      icon: 'mdi:import',
      label: 'Import Galaxies',
      action: '/galaxies/import'
    }
  ];

  return {
    tableData,
    header,
    editActions,
    topMenuActions
  };
};
