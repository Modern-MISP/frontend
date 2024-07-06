import { get } from 'svelte/store';
import { api } from '$lib/api';
import type { Log } from './log';
import { error, type NumericRange } from '@sveltejs/kit';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import Info from '$lib/components/info/Info.svelte';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';

export const load = async ({ fetch }) => {
  // @ts-expect-error Not in the OpenAPI spec ;-;
  const getResult = await get(api).POST('/logs/index', { fetch, body: { limit: 50, page: 1 } });

  const { error: mispError, response } = getResult;
  const data = getResult.data as Log[];

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => ({ display: Info, props: { text: x.id } }) //TODO type of id should be number
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
      icon: 'mdi:circle',
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
      icon: 'mdi:circle',
      key: 'model',
      label: 'Model',
      value: (x) => ({ display: Info, props: { text: x.model } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'model-id',
      label: 'Model-ID',
      value: (x) => ({ display: Info, props: { text: x.model_id } }) //TODO Number
    }),
    col({
      icon: 'mdi:circle',
      key: 'action',
      label: 'Action',
      value: (x) => ({ display: Boolean, props: { isTrue: x.action } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'title',
      label: 'Title',
      value: (x) => ({ display: Info, props: { text: x.title } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'change',
      label: 'Change',
      value: (x) => ({ display: Info, props: { text: x.change } })
    })
  ];

  if (!data) error(500, 'No data returned');

  const editActions: DynCardActionHeader<typeof data>[] = [];

  return {
    data,
    header,
    editActions
  };
};
