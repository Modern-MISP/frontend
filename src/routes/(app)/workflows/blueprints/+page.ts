import type { PageLoad } from './$types';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import { get } from 'svelte/store';
import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import type { Blueprint } from './blueprint';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import Info from '$lib/components/info/Info.svelte';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';

export const load: PageLoad = async ({ fetch }) => {
  // @ts-expect-error Not in the OpenAPI spec.
  //TODO API Endpoint
  const getResult = await get(api).GET('/workflowBlueprints/index', { fetch });
  const { error: mispError, response } = getResult;
  const data = getResult.data as Blueprint[];

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();
  //TODO Icons
  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.WorkflowBlueprint.id ?? 'unknown'
    }),
    col({
      icon: 'mdi:id-card',
      key: 'uuid',
      label: 'UUID',
      value: (x) => ({ display: Info, props: { text: x.WorkflowBlueprint.uuid ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'name',
      label: 'Name',
      value: (x) => ({ display: Info, props: { text: x.WorkflowBlueprint.name ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.WorkflowBlueprint.description ?? 'none' } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'timestamp',
      label: 'Timestamp',
      value: (x) => ({ display: Info, props: { text: x.WorkflowBlueprint.timestamp ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'default',
      label: 'Default',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.WorkflowBlueprint.default ?? 'unknown' }
      })
    })
  ];

  if (!data) error(500, 'No data returned');

  const editActions: DynCardActionHeader<typeof data>[] = [
    //TODO
    {
      label: 'Delete',
      icon: 'mdi:delete-outline',
      action: (x) => {
        x;
      }
    }
  ];

  return {
    data,
    tableData: data,
    header,
    editActions
  };
};
