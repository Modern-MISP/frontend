<script lang="ts">
  import { actionBar } from '$lib/actions';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

  import type { PageData } from './$types';

  /**
   * The data that will be displayed on this page
   */
  export let data: PageData;

  const { tableData, header } = data;

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
</script>

<!--
  @component
  
  A list of all galaxies.
-->

<svelte:window use:actionBar={actions} />
<DynTable href={(x) => `/galaxies/${x.Galaxy?.id}`} {header} data={tableData} />
