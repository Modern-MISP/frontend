<script lang="ts">
  import { currentAction, currentRoute } from '$lib/stores';

  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const { tableData, header } = data;

  $currentRoute = [
    {
      name: 'Events',
      icon: 'mdi:calendar-outline',
      href: 'event'
    }
  ];
  $currentAction = 'list';
</script>

<DynTable urlCb={(id) => `/event/${id}/view`} {header} data={tableData} />
