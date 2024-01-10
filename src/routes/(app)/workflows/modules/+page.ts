import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import { createTableHeadGenerator } from '$lib/components/table/TableBuilder';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const { data, error: mispError, response } = await GET('/workflows/moduleIndex');
  console.log(data);

  if (mispError) throw error(response.status, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    // col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id }),
    col({
      icon: 'mdi:circle',
      key: 'name',
      label: 'Name',
      display: Info,
      value: (x) => ({ text: x.name })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'description',
      label: 'Description',
      display: Info,
      value: (x) => ({ text: x.description })
    }),
    col({
      icon: 'mdi:circle',
      key: 'type',
      label: 'Type',
      display: Info,
      value: (x) => ({ text: x.module_type })
    }),
    col({
      icon: 'material-symbols:conversion-path',
      key: 'version',
      label: 'Version',
      display: Info,
      value: (x) => ({ text: x.version })
    }),
    col({
      icon: 'mdi:cancel',
      key: 'blocking',
      label: 'Blocking',
      display: Boolean,
      value: (x) => ({ isTrue: x.blocking })
    }),
    col({
      icon: 'mdi:circle',
      key: 'misp_core',
      label: 'Misp Core Format',
      display: Boolean,
      value: (x) => ({ isTrue: x.expect_misp_core_format })
    }),
    col({
      icon: 'mdi:circle',
      key: 'misp_module',
      label: 'Misp Module',
      display: Boolean,
      value: (x) => ({ isTrue: x.misp_module })
    }),
    col({
      icon: 'mdi:circle',
      key: 'custom',
      label: 'Custom',
      display: Boolean,
      value: (x) => ({ isTrue: x.is_custom })
    }),

    col({
      icon: 'mdi:checkbox-outline',
      key: 'enabled',
      label: 'Enabled',
      display: Boolean,
      value: (x) => ({ isTrue: !x.disabled })
    })
  ];

  if (!data) throw error(500, 'No data returned');

  return {
    data,
    tableData: data,
    header
  };
};
