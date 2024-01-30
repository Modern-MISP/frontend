import { GET } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';

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
      value: (x) => ({ display: Info, props: { text: x.Galaxy?.icon ?? 'unknown' } })
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

  return {
    galaxies: data,
    tableData: data,
    header
  };
};
