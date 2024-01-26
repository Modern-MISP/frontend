import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await GET('/galaxies', { fetch });

  if (mispError) throw error(response.status, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.Galaxy?.id ?? 'unknown' }),
    col({
      icon: 'mdi:circle',
      key: 'icon',
      label: 'Icon',
      display: Info,
      value: (x) => ({ text: x.Galaxy?.icon ?? 'unknown' })
    }),
    col({
      icon: 'mdi:circle',
      key: 'name',
      label: 'Name',
      display: Info,
      value: (x) => ({ text: x.Galaxy?.name ?? 'unknown' })
    }),
    col({
      icon: 'mdi:telescope',
      key: 'namespace',
      label: 'Namespace',
      display: Info,
      value: (x) => ({ text: x.Galaxy?.namespace ?? 'unknown' })
    }),
    col({
      icon: 'mdi:information',
      key: 'description',
      label: 'Description',
      display: Info,
      value: (x) => ({ text: x.Galaxy?.description ?? 'unknown', class: 'line-clamp-4' })
    }),
    col({
      icon: 'mdi:circle',
      key: 'version',
      label: 'Version',
      display: Info,
      value: (x) => ({ text: x.Galaxy?.version ?? 'unknown', class: 'm-auto px-6' })
    }),
    col({
      icon: 'mdi:checkbox-marked-outline',
      key: 'enabled',
      label: 'Enabled',
      display: Boolean,
      value: (x) => ({ isTrue: x.Galaxy?.enabled, class: 'm-auto' })
    }),
    col({
      icon: 'mdi:cloud-off-outline',
      key: 'local_only',
      label: 'Local only',
      display: Boolean,
      value: (x) => ({ isTrue: x.Galaxy?.local_only, class: 'm-auto' })
    })
  ];

  return {
    galaxies: data,
    tableData: data,
    header
  };
};
