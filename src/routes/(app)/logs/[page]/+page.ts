import { get } from 'svelte/store';
import { api } from '$lib/api';
import type { Log } from './log';
import { error, type NumericRange } from '@sveltejs/kit';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import Info from '$lib/components/info/Info.svelte';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const page = Math.max(parseInt(params.page), 1);
  // @ts-expect-error Not in the OpenAPI spec ;-;
  const getResult = await get(api).GET('/logs/index/', {
    fetch,
    params: { query: { /*model: 'Workflow',*/ page, limit: 50 } }
  });

  const { error: mispError, response } = getResult;
  const data = (getResult.data as Log[]).map((x) => x.Log!);

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.id ?? 'unknown'
    }),
    col({
      icon: 'mdi:ip-outline',
      key: 'ip',
      label: 'IP',
      value: (x) => ({ display: Info, props: { text: x.ip } })
    }),
    col({
      icon: 'mdi:email',
      key: 'email',
      label: 'E-Mail',
      value: (x) => ({ display: Info, props: { text: x.email } })
    }),
    col({
      icon: 'mdi:factory',
      key: 'org',
      label: 'Organisation',
      value: (x) => ({ display: Info, props: { text: x.org } })
    }),
    col({
      icon: 'mdi:timer-edit-outline',
      key: 'created',
      label: 'Created',
      value: (x) => ({ display: Info, props: { text: x.created } })
    }),
    col({
      icon: 'mdi:view-grid-plus',
      key: 'model',
      label: 'Model',
      value: (x) => ({ display: Info, props: { text: x.model } })
    }),
    col({
      icon: 'mdi:view-grid-plus-outline',
      key: 'model-id',
      label: 'Model-ID',
      value: (x) => x.model_id ?? 'unknown'
    }),
    col({
      icon: 'mdi:autorenew',
      key: 'action',
      label: 'Action',
      value: (x) => ({ display: Info, props: { text: x.action } })
    }),
    col({
      icon: 'mdi:subtitles-outline',
      key: 'title',
      label: 'Title',
      value: (x) => ({ display: Info, props: { text: x.title } })
    }),
    col({
      icon: 'mdi:swap-horizontal',
      key: 'change',
      label: 'Change',
      value: (x) => ({ display: Info, props: { text: x.change } })
    })
  ];

  if (!data) error(500, 'No data returned');

  const editActions: DynCardActionHeader<typeof data>[] = [];

  return {
    data,
    tableData: data,
    header,
    editActions,
    page
  };
};
