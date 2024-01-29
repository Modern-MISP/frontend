<script lang="ts">
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const { tableData, header } = data;
</script>

<!--
  @component
  Displays a list of all remote servers of the instance.
  
-->

<DynTable href={(x) => `/admin/servers/${x.Server?.id}`} {header} data={tableData} />
