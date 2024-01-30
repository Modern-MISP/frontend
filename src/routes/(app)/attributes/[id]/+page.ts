import { GET } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import attributeCols from '../attributeCols';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    response,
    data,
    error: mispError
  } = await GET('/attributes/view/{attributeId}', {
    params: { path: { attributeId: params.id } },
    fetch
  });

  if (mispError) throw error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<NonNullable<(typeof data)['Attribute']>>();

  console.log(Object.keys(data.Attribute!));

  const header = [
    col(attributeCols.id),
    col(attributeCols.event),
    col(attributeCols.distribution),
    col(attributeCols.category),
    col(attributeCols.comment),
    col(attributeCols.value),
    col(attributeCols.object_id),
    col(attributeCols.object_relation)
  ];

  return {
    header,
    tableData: data.Attribute!
  };
};
