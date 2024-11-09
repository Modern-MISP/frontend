import { get } from 'svelte/store';
import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
  // @ts-expect-error Not in OpenAPI spec
  const getResult = await get(api).GET('/workflows/workflowsSetting', { fetch });
  const { response, error: mispError } = getResult;

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const data: boolean = getResult.data as unknown as boolean;
  return { data };
};
