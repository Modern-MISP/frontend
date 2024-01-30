<script lang="ts">
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';

  export let data;

  const { tableData, header } = data;
</script>

<DynTable href={({ id }) => `/workflows/modules/${id}`} {header} data={tableData} />
