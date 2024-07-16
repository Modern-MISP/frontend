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
import { notifications } from '$lib/stores';
import { successPill } from '$lib/util/pill.util';
import { invalidateAll } from '$app/navigation';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

function download(content: string, fileName: string, contentType: string) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export const load: PageLoad = async ({ fetch }) => {
  // @ts-expect-error Not in the OpenAPI spec?
  const getResult = await get(api).GET('/workflowBlueprints/index', { fetch });
  const { error: mispError, response } = getResult;
  const data = getResult.data as Blueprint[];

  const tableData = data.map((x) => x.WorkflowBlueprint);

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof tableData)[number], DynTableHeadExtent>();
  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.id ?? 'unknown'
    }),
    col({
      icon: 'mdi:ticket-account',
      key: 'uuid',
      label: 'UUID',
      value: (x) => ({ display: Info, props: { text: x.uuid ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:card-account-details',
      key: 'name',
      label: 'Name',
      value: (x) => ({ display: Info, props: { text: x.name ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:subtitles-outline',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.description ?? 'none' } })
    }),
    col({
      icon: 'mdi:timer',
      key: 'timestamp',
      label: 'Timestamp',
      value: (x) => ({ display: Info, props: { text: x.timestamp ?? 'unknown' } })
    }),
    col({
      icon: 'mdi:selection-ellipse-arrow-inside',
      key: 'default',
      label: 'Default',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.default ?? 'unknown' }
      })
    })
  ];

  if (!data) error(500, 'No data returned');

  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:upload',
      label: 'Import Blueprint',
      action: '/workflows/blueprints/import'
    }
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Delete Blueprint',
      icon: 'mdi:delete-outline',
      action: (x) => {
        Promise.all(
          x
            .map((y) => y.id)
            .map((blueprintId) =>
              // @ts-expect-error Not in the OpenAPI spec?
              get(api).DELETE('/workflowBlueprints/delete//{blueprintId}', {
                fetch,
                params: { path: { blueprintId: blueprintId! } }
              })
            )
        ).then(() => {
          notifications.add(successPill('Deleted blueprint ' + x.map((y) => y.id).join(', ')));
          invalidateAll();
        });
      }
    },
    {
      label: 'Export Blueprint',
      icon: 'mdi:download',
      action: (x) => {
        Promise.all(
          x
            .map((y) => y.id)
            .map((blueprintId) =>
              // @ts-expect-error Not in the OpenAPI spec?
              get(api)
                .GET('/workflowBlueprints/export/{blueprintId}', {
                  fetch,
                  params: { path: { blueprintId: blueprintId! } }
                })
                .then((response) =>
                  download(
                    JSON.stringify(response.data, undefined, 2),
                    `blueprint-${blueprintId}.json`,
                    'JSON'
                  )
                )
            )
        ).then(() => {
          notifications.add(successPill('Exported blueprint ' + x.map((y) => y.id).join(', ')));
          invalidateAll();
        });
      }
    }
  ];

  return {
    tableData: tableData,
    header,
    editActions,
    topMenuActions
  };
};
