import { GET } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from '../../[id]/$types';

import Info from '$lib/components/info/Info.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/galaxy_clusters/view/{galaxyClusterId}', {
    params: { path: { galaxyClusterId: params.id } },
    fetch
  });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  
  const galaxyElements = data.GalaxyCluster?.GalaxyElement ?? [];
  const col = createTableHeadGenerator<
    (typeof galaxyElements)[number],
    DynTableHeadExtent
  >();
  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id ?? 'unknown' }),
    col({
      icon: 'mdi:key',
      key: 'key',
      label: 'key',
      value: (x) => ({
        display: Info,
        props: {
          text: x.key
        }
      })
    }),
    col({
      icon: 'mdi:circle',
      key: 'value',
      label: 'Value',
      value: (x) => ({
        display: Info,
        props: { text: x.value }
      })
    })
  ];

  return {
    galaxyCluster: data,
    tableData: galaxyElements,
    header
  };
};
