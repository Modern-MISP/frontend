<script lang="ts">
  import { actionBar } from '$lib/actions';
  import DynActionCard from '$lib/components/table/actions/dynCard/DynActionCard.svelte';
  import SelectionCard from '$lib/components/table/actions/selectionCard/SelectionCard.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { mode } from '$lib/stores';
  import type { PageData } from './$types';

  export let data: PageData;

  const { tableData, header, editActions } = data;
  const actions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:user-add-outline',
      label: 'Add User',
      action: '/admin/users/new'
    }
  ];

  let activeRows: typeof tableData = [];

  // On mode change reset selected rows.
  $: if ($mode) activeRows = [];
</script>

<!--
  @component
  Displays a list of all users of the instance.
  
-->

<svelte:window use:actionBar={actions} />

{#if $mode === 'edit'}
  <div class="flex flex-row gap-1">
    <DynActionCard header={editActions} data={activeRows}></DynActionCard>
    <SelectionCard
      numSelected={activeRows.length}
      selectAll={() => (activeRows = tableData)}
      unselectAll={() => (activeRows = [])}
    />
  </div>
{/if}
<DynTable
  {header}
  selectMode={$mode === 'edit'}
  href={(x) => `/admin/users/${x.User?.id}`}
  data={tableData}
  bind:activeRows
/>
