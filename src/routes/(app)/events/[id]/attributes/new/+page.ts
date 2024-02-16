import { api } from '$lib/api';
// import { api } from '../../../../../../lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load() {
  const { error: mispError, data, response } = await get(api).GET('/attributes/describeTypes', {});

  if (mispError) throw error(response.status as NumericRange<400, 599>, mispError.message);

  return {
    // cast type to fix wrong MISP API spec
    attributeTypes: (data as unknown as { result: typeof data }).result
  };
}
