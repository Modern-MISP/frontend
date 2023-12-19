<script lang="ts">
  import DynTable from '$lib/components/dynTable/DynTable.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const { tableData, header } = data;
</script>

<DynTable urlCb={(id) => `/event/${id}/view`} {header} data={tableData} />
