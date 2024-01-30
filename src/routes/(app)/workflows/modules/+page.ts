import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // @ts-expect-error Not in the OpenAPI spec ;-;
  const getResult = await GET('/workflows/moduleIndex', { fetch });
  const { error: mispError, response } = getResult;
  const data = getResult.data as {
    id?: string;
    name?: string;
    description?: string;
    module_type?: string;
    version?: string;
    blocking?: boolean;
    expect_misp_core_format?: boolean;
    misp_module?: boolean;
    is_custom?: boolean;
    disabled?: boolean;
  }[];

  console.log(data);

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    // col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id }),
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
      label: 'Misp Core Format',
      value: (x) => ({ display: Boolean, props: { isTrue: x.expect_misp_core_format } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'misp_module',
      label: 'Misp Module',
      value: (x) => ({ display: Boolean, props: { isTrue: x.misp_module } })
    }),
    col({
      icon: 'mdi:circle',
      key: 'custom',
      label: 'Custom',
      value: (x) => ({ display: Boolean, props: { isTrue: x.is_custom } })
    }),

    col({
      icon: 'mdi:checkbox-outline',
      key: 'enabled',
      label: 'Enabled',
      value: (x) => ({ display: Boolean, props: { isTrue: !x.disabled } })
    })
  ];

  if (!data) error(500, 'No data returned');

  return {
    data,
    tableData: data,
    header
  };
};
