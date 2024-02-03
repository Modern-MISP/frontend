<script lang="ts">
  import { actionBar } from '$lib/actions';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import type { PageData } from './$types';

  export let data: PageData;

  const { tableData, header } = data;

  const actions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:server-add',
      label: 'Add Server',
      action: '/admin/servers/new'
    }
  ];
</script>

<!--
  @component
  Displays a list of all remote servers of the instance.
  
-->

<svelte:window use:actionBar={actions} />
<DynTable href={(x) => `/admin/servers/${x.Server?.id}`} {header} data={tableData} />
