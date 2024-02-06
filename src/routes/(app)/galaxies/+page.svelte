<script lang="ts">
  import { actionBar } from '$lib/actions';
  import ActiveEntry from '$lib/components/menus/topmenu/actionbar/ActiveEntry.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import SelectionCard from '$lib/components/table/actions/selectionCard/SelectionCard.svelte';
  import DynActionCard from '$lib/components/table/actions/dynCard/DynActionCard.svelte';

  import { findKey, values } from 'lodash-es';
  import type { PageData } from './$types';
  import { mode } from '$lib/stores';

  /**
   * The data that will be displayed on this page
   */
  export let data: PageData;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { tableData, header, editActions } = data as any;

  const actions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:refresh',
      label: 'Refresh Galaxies',
      action: () => {
        // TODO: Implement api endpoint
        alert('Will refresh Galaxies');
      }
    },
    {
      icon: 'mdi:import',
      label: 'Import Galaxies',
      action: () => {
        // TODO: Implement api endpoint
        alert('Will open a dialog or redirect to a page with free text import');
      }
    }
  ];

  let filter = { all: true, enabled: false, disabled: false };

  $: filtered = tableData.filter(
    (x: { Galaxy: { enabled: boolean } }) =>
      filter.all || (filter.enabled && x.Galaxy.enabled) || (filter.disabled && !x.Galaxy.enabled)
  );

  let lastFilter: keyof typeof filter = 'all';

  $: if (values(filter).filter(Boolean).length > 1) {
    filter[lastFilter] = false;
    lastFilter = (findKey(filter, Boolean) as keyof typeof filter) ?? 'all';
  } else {
    filter[lastFilter] = true;
  }

  let activeRows: typeof tableData = [];
</script>

<!--
  @component
  
  A list of all galaxies.
-->

<svelte:window use:actionBar={actions} />

<div class="flex flex-row gap-1">
  <ActionCard>
    <ActiveEntry label="All" icon="mdi:all-inclusive" bind:active={filter.all}></ActiveEntry>
    <ActiveEntry label="Enabled" icon="mdi:checkbox-outline" bind:active={filter.enabled}
    ></ActiveEntry>
    <ActiveEntry label="Disabled" icon="mdi:close-box-outline" bind:active={filter.disabled}
    ></ActiveEntry>
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

<DynTable
  href={(x) => `/galaxies/${x.Galaxy?.id}`}
  {header}
  data={filtered}
  bind:activeRows
  selectMode={$mode === 'edit'}
/>
