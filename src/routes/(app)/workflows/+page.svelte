<script lang="ts">
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';

  /** The data that will be displayed on this page. */
  export let data;

  const { tableData, header } = data;
</script>

<!--
  @component
  
  A list of all workflows.
-->
<DynTable href={({ id }) => `/workflows/${id}`} {header} data={tableData} />
