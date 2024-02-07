<script lang="ts">
  import EnableFilter from './EnableFilter.svelte';

  import { actionBar } from '$lib/actions';
  import DynActionCard from '$lib/components/table/actions/dynCard/DynActionCard.svelte';
  import SelectionCard from '$lib/components/table/actions/selectionCard/SelectionCard.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';

  import { mode } from '$lib/stores';

  /**
   * The data that will be displayed on this page
   */
  export let data;

  $: ({ tableData, header, editActions, topMenuActions } = data);

  let activeRows: typeof tableData = [];

  let filtered: typeof tableData = [];
</script>

<!--
  @component
  
  A list of all galaxies.
-->

<svelte:window use:actionBar={topMenuActions} />

<div class="flex flex-row gap-1">
  <EnableFilter bind:data={tableData} bind:filtered></EnableFilter>

  {#if $mode === 'edit'}
    <SelectionCard
      numSelected={activeRows.length}
      selectAll={() => (activeRows = tableData)}
      unselectAll={() => (activeRows = [])}
    />

    <DynActionCard header={editActions} data={activeRows}></DynActionCard>
  {/if}
</div>

<DynTable
  href={(x) => `/galaxies/${x.id}`}
  {header}
  data={filtered}
  bind:activeRows
  selectMode={$mode === 'edit'}
/>
