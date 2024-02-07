<script lang="ts">
  import { actionBar } from '$lib/actions.js';
  import Input from '$lib/components/input/Input.svelte';
  import Pagination from '$lib/components/pagination/Pagination.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface.js';
  import { mode } from '$lib/stores.js';
  import CreateTag from './CreateTag.svelte';

  import DynActionCard from '$lib/components/table/actions/dynCard/DynActionCard.svelte';
  import SelectionCard from '$lib/components/table/actions/selectionCard/SelectionCard.svelte';
  /**
   * Page data
   */
  export let data;

  $: ({ tableData, header, editActions } = data);

  let tagFilter = '';

  $: filtered = tableData.filter((x) => x.name?.includes(tagFilter));

  // FIXME: should be implemented with paginated post request to api. Server fault...
  $: sliced = filtered.slice(50 * page - 50, 50 * page);
  $: page = 1;

  let addTag = false;

  $: topMenuActions = [
    addTag
      ? {
          icon: 'mdi:close-circle-outline',
          label: 'Close Create Tag',
          action: () => (addTag = false),
          class: 'text-red'
        }
      : {
          icon: 'mdi:tag-plus',
          label: 'Create Tag',
          action: () => (addTag = true)
        }
  ];

  let activeRows: typeof tableData = [];
</script>

<!--
  @component
  Displays a combined list of the tags of all events.
  
-->
<svelte:window use:actionBar={topMenuActions} />

<div class="flex flex-row gap-1">
  <ActionCard class="h-20">
    <Input placeholder="Search tag" class="w-max" on:value={({ detail }) => (tagFilter = detail)}
    ></Input>
  </ActionCard>
  {#if $mode === 'edit'}
    <SelectionCard
      numSelected={activeRows.length}
      selectAll={() => (activeRows = tableData)}
      unselectAll={() => (activeRows = [])}
    />

    <DynActionCard header={editActions} data={activeRows}></DynActionCard>
  {/if}
</div>

{#if addTag}
  <CreateTag></CreateTag>
{/if}
<DynTable
  href={({ id }) => `tags/${id}`}
  {header}
  data={sliced}
  bind:activeRows
  selectMode={$mode === 'edit'}
/>

<Pagination bind:page />
