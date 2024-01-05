<script lang="ts">
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  const { tableData, header } = data;
</script>

<DynTable urlCb={(id) => `/events/${id}`} {header} data={tableData} />
