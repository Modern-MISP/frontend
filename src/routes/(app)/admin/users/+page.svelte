<script lang="ts">
  import { actionBar } from '$lib/actions';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import type { PageData } from './$types';

  export let data: PageData;

  const { tableData, header } = data;
  const actions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:user-add-outline',
      label: 'Add User',
      action: '/admin/users/new'
    }
  ];
</script>

<!--
  @component
  Displays a list of all users of the instance.
  
-->

<svelte:window use:actionBar={actions} />
<DynTable href={(x) => `/admin/users/${x.User?.id}`} {header} data={tableData} />
