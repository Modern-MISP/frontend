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
  } = await get(api).GET('/object_templates/index', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const tableData = data.map((x) => x['ObjectTemplate'] as (typeof x)['ObjectTemplate']);

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
      key: 'name',
      label: 'Name',
      value: (x) => ({ display: Info, props: { text: x.name } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'meta-category',
      label: 'meta-category',
      value: (x) => ({ display: Info, props: { text: x['meta-category'] } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'description',
      label: 'description',
      value: (x) => ({ display: Info, props: { text: x.description } })
    }),
    col({
      icon: 'mdi:share',
      key: 'active',
      label: 'active',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.active }
      })
    }),
    col({
      icon: 'mdi:share',
      key: 'fixed',
      label: 'Fixed',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.fixed }
      })
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
