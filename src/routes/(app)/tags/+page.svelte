<script lang="ts">
  import Pagination from '$lib/components/pagination/Pagination.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { PageData } from './$types';

  /**
   * Page data
   */
  export let data: PageData;

  let { tableData, header } = data;

  // FIXME: should be implemented with paginated post request to api. Server fault...
  $: sliced = tableData.slice(50 * page - 50, 50 * page);
  $: page = 1;
</script>

<!--
  @component
  Displays a combined list of the tags of all events.
  
-->

<DynTable href={({ id }) => `tags/${id}`} {header} data={sliced} />

<Pagination bind:page />
