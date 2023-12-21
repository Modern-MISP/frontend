import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import type DynTable from '$lib/components/dynTable/DynTable.svelte';
import Info from '$lib/components/info/Info.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const { data, error: mispError, response } = await GET('/workflows/moduleIndex');

  if (mispError) throw error(response.status, mispError.message);

  const header = [
    { icon: 'mdi:id-card', name: 'id', value: 'ID' },
    { icon: 'mdi:circle', name: 'name', value: 'Name', displayComp: Info },
    {
      icon: 'mdi:information-outline',
      name: 'description',
      value: 'Description',
      displayComp: Info
    },
    {
      icon: 'mdi:circle',
      name: 'type',
      value: 'Type',
      displayComp: Info
    },
    {
      icon: 'material-symbols:conversion-path',
      name: 'version',
      value: 'Version',
      displayComp: Info
    },
    {
      icon: 'mdi:cancel',
      name: 'blocking',
      value: 'Blocking',
      displayComp: Boolean
    },
    {
      icon: 'mdi:circle',
      name: 'misp_core',
      value: 'Misp Core Format',
      displayComp: Boolean
    },
    {
      icon: 'mdi:circle',
      name: 'misp_module',
      value: 'Misp Module',
      displayComp: Boolean
    },
    {
      icon: 'mdi:circle',
      name: 'custom',
      value: 'Custom',
      displayComp: Boolean
    },

    {
      icon: 'mdi:checkbox-outline',
      name: 'enabled',
      value: 'Enabled',
      displayComp: Boolean
    }
  ] as const;

  if (!data) throw error(500, 'No data returned');
  const tableData: DynTable<typeof header>['$$prop_def']['data'] = data.map((x) => ({
    id: x.id,
    name: { text: x.name },
    description: { text: x.description },
    type: { text: x.module_type, class: 'm-auto px-6' },
    version: { text: x.version, class: 'm-auto px-6' },
    blocking: { isTrue: x.blocking, class: 'm-auto' },
    misp_core: { isTrue: x.expect_misp_core_format, class: 'm-auto' },
    misp_module: { isTrue: x.misp_module, class: 'm-auto' },
    custom: { isTrue: x.is_custom, class: 'm-auto' },
    enabled: { isTrue: !x.disabled, class: 'm-auto' }
  }));
  return {
    data,
    tableData,
    header
  };
};
