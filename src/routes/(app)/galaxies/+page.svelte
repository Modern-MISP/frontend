<script lang="ts">
  import { actionBar } from '$lib/actions';
  import ActiveEntry from '$lib/components/menus/topmenu/actionbar/ActiveEntry.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

  import { findKey, values } from 'lodash-es';
  import type { PageData } from './$types';

  /**
   * The data that will be displayed on this page
   */
  export let data: PageData;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { tableData, header } = data as any;

  const actions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:plus',
      label: 'add',
      action: '/add'
    },
    {
      icon: 'mdi:lightbulb-question',
      label: 'test',
      action: () => {
        alert('hi');
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
</script>

<!--
  @component
  
  A list of all galaxies.
-->

<svelte:window use:actionBar={actions} />

<ActionCard>
  <ActiveEntry label="All" icon="mdi:all-inclusive" bind:active={filter.all}></ActiveEntry>
  <ActiveEntry label="Enabled" icon="mdi:checkbox-outline" bind:active={filter.enabled}
  ></ActiveEntry>
  <ActiveEntry label="Disabled" icon="mdi:close-box-outline" bind:active={filter.disabled}
  ></ActiveEntry>
</ActionCard>

<DynTable href={(x) => `/galaxies/${x.Galaxy?.id}`} {header} data={filtered} />
