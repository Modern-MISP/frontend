import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type DynTable from '$lib/components/dynTable/DynTable.svelte';

export const load: PageLoad = async () => {
  const { data, error: mispError, response } = await GET('/galaxies');

  if (mispError) throw error(response.status, mispError.message);

  const header = [] as const;

  const tableData: DynTable<typeof header>['$$prop_def']['data'] = data
    .map((x) => x.Galaxy)
    .map((x) => ({}));
  return {
    data,
    tableData,
    header
  };
};
