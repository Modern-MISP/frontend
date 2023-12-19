<script lang="ts">
  import { currentAction, currentRoute } from '$lib/stores';

  import DynTable from '$lib/components/dynTable/DynTable.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const { tableData, header } = data;
</script>

<DynTable urlCb={(id) => `${id}/view`} {header} data={tableData} />
