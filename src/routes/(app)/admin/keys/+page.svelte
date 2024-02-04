<script lang="ts">
  import { actionBar } from '$lib/actions';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface.js';

  export let data;

  const { tableData, header } = data;
  const actions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:key-add',
      label: 'Add Key',
      action: '/admin/keys/new'
    }
  ];
</script>

<!--
  @component
  
  
-->

<svelte:window use:actionBar={actions} />
<DynTable {header} data={tableData} href={(x) => `/admin/keys/${x.AuthKey?.id}`} />h
