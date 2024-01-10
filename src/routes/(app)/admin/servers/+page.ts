import { GET } from '$lib/api';
import { createTableHeadGenerator } from '$lib/components/table/TableBuilder';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const { data, error: mispError, response } = await GET('/servers');

  if (mispError) throw error(response.status, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();
  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.Server?.id ?? 'unknown'
    })
  ];

  return {
    data,
    tableData: data,
    header
  };
};
