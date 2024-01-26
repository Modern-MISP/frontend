import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from '../../[id]/$types';

import Info from '$lib/components/info/Info.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';

export const load: PageLoad = async ({ params }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/galaxy_clusters/view/{galaxyClusterId}', {
    params: { path: { galaxyClusterId: params.id } }
  });

  if (mispError) error(response.status, mispError.message);
  const col = createTableHeadGenerator<
    (typeof data.GalaxyCluster.GalaxyElement)[number], // FIXME: make typesafe
    DynTableHeadExtent
  >();
  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id }),
    col({
      icon: 'mdi:key',
      key: 'key',
      label: 'key',
      display: Info,
      value: (x) => ({ text: x.key })
    }),
    col({
      icon: 'mdi:circle',
      key: 'value',
      label: 'Value',
      display: Info,
      value: (x) => ({ text: x.value })
    })
  ];

  return {
    galaxyCluster: data,
    tableData: data?.GalaxyCluster?.GalaxyElement ?? [],
    header
  };
};
