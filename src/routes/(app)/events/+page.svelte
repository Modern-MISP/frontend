<script lang="ts">
  import { POST } from '$lib/api';
  import Pagination from '$lib/components/pagination/Pagination.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';

  import Filter from '$lib/components/filter/Filter.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
  import ActionEntry from '$lib/components/table/actions/entry/ActionEntry.svelte';
  import { merge } from 'lodash-es';
  /**
   * Page data
   */
  export let data;

  let { tableData, header, filter } = data;

  // TODO: move to generic util function. Smth. link (url, page)
  const loadMore = async (bodyOptions: Record<string, unknown>) => {
    const {
      data: _data,
      error: mispError,
      response
    } = await POST('/events/index', { body: { limit: 50, ...bodyOptions } });

    if (mispError) {
      console.error(mispError);
      alert('Error fetching more data');
    }

    if (response.ok && _data) {
      tableData = _data;
    }
  };

  $: page = 1;
  // $: loadMore({ page });

  $: loadMore({ ...merge({}, ...currentFilter), page });

  let filterOpen = false;
  let currentFilter: Record<string, FormDataEntryValue>[] = [];
</script>

<!--
  @component
  Displays a list of all events.
  
-->

<ActionCard>
  <ActionEntry icon="mdi:filter-outline" text="filter" bind:active={filterOpen} />
</ActionCard>
<body class="relative flex h-full overflow-hidden">
  <DynTable href={({ id }) => `/events/${id}`} {header} data={tableData} />

  {#if filterOpen}
    <Filter header={filter} bind:currentFilter />
  {/if}
</body>
<Pagination bind:page />
