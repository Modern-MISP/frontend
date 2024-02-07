import { GET, POST } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';

import { invalidateAll } from '$app/navigation';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Icon from '@iconify/svelte';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await GET('/galaxies', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<
    (typeof data)[number] & { Galaxy?: { enabled?: boolean; local_only?: boolean } },
    DynTableHeadExtent
  >();

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.Galaxy?.id ?? 'unknown' }),
    col({
      icon: 'mdi:circle',
      key: 'icon',
      label: 'Icon',
      value: (x) => ({
        display: Icon,
        props: { icon: `fa6-solid:${x.Galaxy?.icon}` }
      })
    }),
    col({
      icon: 'mdi:circle',
      key: 'name',
      label: 'Name',
      value: (x) => ({ display: Info, props: { text: x.Galaxy?.name ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:telescope',
      key: 'namespace',
      label: 'Namespace',
      value: (x) => ({ display: Info, props: { text: x.Galaxy?.namespace ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:information',
      key: 'description',
      label: 'Description',
      value: (x) => ({
        display: Info,
        props: { text: x.Galaxy?.description ?? 'unknown', class: 'line-clamp-4' }
      })
    }),
    col({
      icon: 'mdi:circle',
      key: 'version',
      label: 'Version',
      value: (x) => ({
        display: Info,
        props: { text: x.Galaxy?.version ?? 'unknown', class: 'm-auto px-6' }
      })
    }),
    col({
      icon: 'mdi:checkbox-marked-outline',
      key: 'enabled',
      label: 'Enabled',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Galaxy?.enabled, class: 'm-auto' } })
    }),
    col({
      icon: 'mdi:cloud-off-outline',
      key: 'local_only',
      label: 'Local only',
      value: (x) => ({ display: Boolean, props: { isTrue: x.Galaxy?.local_only, class: 'm-auto' } })
    })
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Enable',
      icon: 'mdi:checkbox-outline',
      action: (selected) => {
        Promise.all(
          selected
            .map((y) => y.Galaxy?.id)
            .map((galaxyId) =>
              // @ts-expect-error Not in the OpenAPI spec.. great.
              POST('/galaxies/enable/{galaxyId}', { fetch, params: { path: { galaxyId } } })
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
            .map((y) => y.Galaxy?.id)
            .map((galaxyId) =>
              // @ts-expect-error Not in the OpenAPI spec.. great.
              POST('/galaxies/disable/{galaxyId}', { fetch, params: { path: { galaxyId } } })
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
            `Are you sure you want to delete the galaxies with ids: ${x.map((x) => x.Galaxy?.id).join(', ')}`
          )
        ) {
          Promise.all(
            x
              .map((y) => y.Galaxy?.id)
              .map((galaxyId) =>
                // @ts-expect-error Not in the OpenAPI spec.. great.
                POST('/galaxies/delete/{galaxyId}', { fetch, params: { path: { galaxyId } } })
              )
          ).then(invalidateAll);
        }
      }
    }
  ];

  return {
    galaxies: data,
    tableData: data,
    header,
    editActions
  };
};
