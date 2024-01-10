<script lang="ts">
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const { tableData, header } = data;
</script>

<DynTable href={(x) => `/galaxies/${x.Galaxy?.id}`} {header} data={tableData} />
