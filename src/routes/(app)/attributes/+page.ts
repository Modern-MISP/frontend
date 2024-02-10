import { POST } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import attributeCols from './attributeCols';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';

export const load: PageLoad = async ({ fetch }) => {
  const {
    response,
    data,
    error: mispError
  } = await POST('/attributes/restSearch', { fetch, body: { limit: 50, page: 1 } });

  if (mispError) throw error(response.status as NumericRange<400, 599>, mispError.message);

  const tableData = data.response?.Attribute ?? [];

  const col = createTableHeadGenerator<(typeof tableData)[number], DynTableHeadExtent>();

  const header = [
    col(attributeCols.id),
    col(attributeCols.event),
    col(attributeCols.distribution),
    col(attributeCols.category),
    col(attributeCols.comment),
    col(attributeCols.value),
    col(attributeCols.object_id),
    col(attributeCols.object_relation),
    col(attributeCols.type),
    col(attributeCols.deleted)
  ];
  return {
    tableData,
    header
  };
};
