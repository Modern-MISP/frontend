import { api } from '$lib/api';
import { get } from 'svelte/store';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Module } from './module';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { invalidateAll } from '$app/navigation';

export const load: PageLoad = async ({ fetch }) => {
  // @ts-expect-error Not in the OpenAPI spec ;-;
  const getResult = await get(api).GET('/workflows/moduleIndex/type:all', { fetch });
  const { error: mispError, response } = getResult;
  const data = getResult.data as Module[];

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'name',
      label: 'Name',
      value: (x) => ({ display: Info, props: { text: x.name } })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.description } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'type',
      label: 'Type',
      value: (x) => ({ display: Info, props: { text: x.module_type } })
    }),
    col({
      icon: 'material-symbols:conversion-path',
      key: 'version',
      label: 'Version',
      value: (x) => ({ display: Info, props: { text: x.version } })
    }),
    col({
      icon: 'mdi:cancel',
      key: 'blocking',
      label: 'Blocking',
      value: (x) => ({ display: Boolean, props: { isTrue: x.blocking } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'misp_core',
      label: 'MISP Core Format',
      value: (x) => ({ display: Boolean, props: { isTrue: x.expect_misp_core_format } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'misp_module',
      label: 'MISP Module',
      value: (x) => ({ display: Boolean, props: { isTrue: x.is_misp_module } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'custom',
      label: 'Custom',
      value: (x) => ({ display: Boolean, props: { isTrue: x.is_custom } })
    }),

    col({
      icon: 'mdi:checkbox-marked-outline',
      key: 'enabled',
      label: 'Enabled',
      value: (x) => ({ display: Boolean, props: { isTrue: !x.disabled } })
    })
  ];

  if (!data) error(500, 'No data returned');

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Enable',
      icon: 'mdi:checkbox-outline',
      action: (x) => {
        if (!x) return;
        if (
          confirm(
            `Are you sure you want to enable the following modules?\n${x.map((x) => x.id).join(', ')}`
          )
        ) {
          Promise.all(
            x.map((module) =>
              // @ts-expect-error Not in the OpenAPI spec
              get(api).POST('/workflows/toggleModule/{moduleId}/1', {
                fetch,
                params: { path: { moduleId: module.id } }
              })
            )
          ).then(invalidateAll);
        }
      }
    },
    {
      label: 'Disable',
      icon: 'mdi:close-box-outline',
      action: (x) => {
        if (!x) return;
        if (
          confirm(
            `Are you sure you want to disable the following modules?\n${x.map((x) => x.id).join(', ')}`
          )
        ) {
          Promise.all(
            x.map((module) =>
              // @ts-expect-error Not in the OpenAPI spec
              get(api).POST('/workflows/toggleModule/{moduleId}/0', {
                fetch,
                params: { path: { moduleId: module.id } }
              })
            )
          ).then(invalidateAll);
        }
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
