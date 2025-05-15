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
  } = await get(api).GET('/organisations/index', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const tableData = data.map((x) => x['Organisation'] as (typeof x)['Organisation']);

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
      key: 'nationality',
      label: 'Nationality',
      value: (x) => ({ display: Info, props: { text: x.nationality } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'sector',
      label: 'Sector',
      value: (x) => ({ display: Info, props: { text: x.sector } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'type',
      label: 'Type',
      value: (x) => ({ display: Info, props: { text: x.type } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'uuid',
      label: 'UUID',
      value: (x) => ({ display: Info, props: { text: x.uuid } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.description } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'user_count',
      label: 'Users#',
      value: (x) => ({ display: Info, props: { text: x.user_count } })
    }),
    col({
      icon: 'mdi:share',
      key: 'local',
      label: 'Local',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.local }
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
