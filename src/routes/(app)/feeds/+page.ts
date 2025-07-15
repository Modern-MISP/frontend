import { api } from '$lib/api';
import Info from '$lib/components/info/Info.svelte';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { notifications } from '$lib/stores.svelte.ts';
import { successPill } from '$lib/util/pill.util';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

import { invalidateAll } from '$app/navigation';
import type { FastFilter } from '$lib/models/FastFilter.interface';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await get(api).GET('/feeds/index', { fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const tableData = data.map((x) => x['Feed'] as (typeof x)['Feed']);

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
      icon: 'mdi:account-voice',
      key: 'provider',
      label: 'Provider',
      value: (x) => ({ display: Info, props: { text: x.provider } })
    }),

    col({
      icon: 'mdi:share',
      key: 'distribution',
      label: 'Distribution',
      value: (x) => ({
        display: LookupPill,
        props: { value: +(x.distribution ?? 0), options: DISTRIBUTION_LOOKUP }
      })
    })
  ];

  const filter = [];
  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:plus-box',
      label: 'Add Feed',
      action: '/feeds/new'
    }
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Delete feed',
      icon: 'mdi:delete-outline',
      class: 'text-ctp-red',
      action: (x) => {
        Promise.all(
          x
            .map((y) => y.id)
            .map((feedId) =>
              get(api).DELETE('/feeds/delete/{feedId}', {
                fetch,
                params: { path: { feedId: feedId! } }
              })
            )
        ).then(() => {
          notifications.add(successPill('Deleted feeds ' + x.map((y) => y.name).join(', ')));
          invalidateAll();
        });
      }
    },
    {
      label: 'Fetch',
      icon: 'mdi:download',
      action: (x) => {
        Promise.all(
          x
            .map((y) => y.id)
            .map((feedId) =>
              get(api).POST('/feeds/fetchFromFeed/{feedId}', {
                fetch,
                params: { path: { feedId: feedId! } }
              })
            )
        ).then(() => {
          notifications.add(
            successPill('Started fetching feeds ' + x.map((y) => y.name).join(', '))
          );
          invalidateAll();
        });
      }
    }
  ];

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
