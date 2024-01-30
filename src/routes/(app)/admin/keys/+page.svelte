<script lang="ts">
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';

  export let data;

  const { tableData, header } = data;
</script>

<!--
  @component
  
  
-->

<DynTable {header} data={tableData} href={(x) => `/admin/keys/${x.AuthKey?.id}`} />h
