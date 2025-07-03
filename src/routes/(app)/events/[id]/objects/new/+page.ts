import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load() {
  const { error: mispError, data, response } = await get(api).GET('/object_templates/index', {});
  // eslint-disable-next-line no-warning-comments
  //TODO: types of status and message are not set, therefor .status an .message default to never
  if (mispError) error(response['status'] as NumericRange<400, 599>, mispError['message']);

  // Mapping meta-category to name
  const categoryToNameMap: Record<string, string[]> = data.reduce(
    (acc, item) => {
      const category = item.ObjectTemplate['meta-category'];

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item.ObjectTemplate);

      return acc;
    },
    {} as Record<string, string[]>
  );

  console.log(categoryToNameMap);
  const categories = Object.keys(categoryToNameMap);

  return {
    // cast type to fix wrong MISP API spec
    categoryToNameMap,
    categories
  };
}
