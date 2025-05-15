import { api } from '$lib/api';
import Info from '$lib/components/info/Info.svelte';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import type { FastFilter } from '$lib/models/FastFilter.interface';

export const load: PageLoad = async ({ fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/taxonomies/index', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const tableData = data.map((x) => x['Taxonomy'] as (typeof x)['Taxonomy']);

  const col = createTableHeadGenerator<(typeof tableData)[number], DynTableHeadExtent>();

  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => ({ display: Info, props: { text: x.id ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'namespace',
      label: 'Namespace',
      value: (x) => ({ display: Info, props: { text: x.namespace } })
    }),
    col({
      icon: 'mdi:share',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.description } })
    })
  ];

  const filter = [];
  const topMenuActions: ActionBarEntryProps[] = [];

  const editActions: DynCardActionHeader<typeof data>[] = [];

  const fastFilter: FastFilter[] = [];
  return {
    header,
    tableData: tableData,
    filter,
    topMenuActions,
    editActions,
    fastFilter,
    maxCount: +response.headers.get('X-result-count')!
  };
};
