import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';

import type DynTable from '$lib/components/dynTable/DynTable.svelte';

export const load: PageLoad = async () => {
  const { data, error: mispError, response } = await GET('/galaxies');

  if (mispError) throw error(response.status, mispError.message);

  const header = [
    { icon: 'mdi:id-card', name: 'id', value: 'ID' },
    { icon: 'mdi:circle', name: 'icon', value: 'Icon', displayComp: Info },
    { icon: 'mdi:circle', name: 'name', value: 'Name', displayComp: Info },
    { icon: 'mdi:telescope', name: 'namespace', value: 'Namespace', displayComp: Info },
    { icon: 'mdi:information', name: 'description', value: 'Description', displayComp: Info },
    {
      icon: 'mdi:circle',
      name: 'version',
      value: 'Version',
      displayComp: Info
    },
    {
      icon: 'mdi:checkbox-marked-outline',
      name: 'enabled',
      value: 'Enabled',
      displayComp: Boolean
    },
    {
      icon: 'mdi:cloud-off-outline',
      name: 'local_only',
      value: 'Local only',
      class: 'whitespace-nowrap',
      displayComp: Boolean
    }
  ] as const;

  const tableData: DynTable<typeof header>['$$prop_def']['data'] = data
    .map((x) => x.Galaxy)
    .map((x) => ({
      id: x?.id ?? '',
      icon: { text: x?.icon ?? '' },
      name: { text: x?.name ?? '' },
      namespace: { text: x?.namespace ?? '' },
      description: { text: x?.description ?? '' },
      version: { text: x?.version ?? '', class: 'm-auto px-6' },
      enabled: { isTrue: x?.enabled ?? '', class: 'm-auto' },
      local_only: { isTrue: x?.local_only ?? '', class: 'm-auto' }
    }));
  return {
    galaxies: data,
    tableData,
    header
  };
};
