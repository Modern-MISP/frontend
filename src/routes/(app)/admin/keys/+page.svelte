<script lang="ts">
  import { actionBar } from '$lib/actions';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface.js';

  import CallbackEntry from '$lib/components/menus/topmenu/actionbar/CallbackEntry.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
  import { mode } from '$lib/stores';

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

{#if $mode === 'edit'}
  <div class="flex gap-4">
    <ActionCard>
      <CallbackEntry
        action={() => alert('DELTEE!')}
        label="Delete"
        icon="mdi:delete-outline"
        class="text-red"
      ></CallbackEntry>
    </ActionCard>
  </div>
{/if}
<DynTable {header} data={tableData} href={(x) => `/admin/keys/${x.AuthKey?.id}`} />h
