import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from '../../[id]/$types';

import Info from '$lib/components/info/Info.svelte';

import type DynTable from '$lib/components/table/dynTable/DynTable.svelte';

export const load: PageLoad = async ({ params }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/galaxy_clusters/view/{galaxyClusterId}', { params: { path: { galaxyClusterId: params.id } } });

  if (mispError) throw error(response.status, mispError.message);
  const header = [
    { icon: 'mdi:id-card', name: 'id', value: 'ID' },
    { icon: 'mdi:key', name: 'key', value: 'key', displayComp: Info },
    { icon: 'mdi:circle', name: 'value', value: 'Value', displayComp: Info },
  ] as const;

  const tableData: DynTable<typeof header>['$$prop_def']['data'] = data.GalaxyCluster.GalaxyElement.map((x) => ({
    id: x.id,
    key: { text: x.key },
    value: { text: x.value },
  }));

  return {
    galaxyCluster: data,
    tableData,
    header
  };
};
