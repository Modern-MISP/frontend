import { GET } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/attributes/view/{attributeId}', {
    params: { path: { attributeId: params.id } },
    fetch
  });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  return {
    attribute: data.Attribute! as NonNullable<typeof data.Attribute>
  };
};
