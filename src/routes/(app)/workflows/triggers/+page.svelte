<script lang="ts">
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { PageData } from './$types';

  /** The data that will be displayed on this page. */
  export let data: PageData;

  const { tableData, header } = data;
</script>

<!--
  @component
  
  A list of all workflow triggers.
-->
<DynTable href={({ id }) => `/workflows/triggers/${id}`} {header} data={tableData} />
