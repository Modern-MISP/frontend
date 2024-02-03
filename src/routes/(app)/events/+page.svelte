<script lang="ts">
  import { POST } from '$lib/api';
  import Pagination from '$lib/components/pagination/Pagination.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';

  import Filter from '$lib/components/filter/Filter.svelte';
  import Pill from '$lib/components/pills/pill/Pill.svelte';
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

  $: loadMore({ ...merge({}, ...currentFilter), page });

  let filterOpen = false;
  let currentFilter: Record<string, string>[] = [];

  export const snapshot = {
    capture: () => currentFilter,
    restore: (value) => (currentFilter = value)
  };
</script>

<!--
  @component
  Displays a list of all events.
  
-->

<div class="flex gap-4">
  <ActionCard>
    <ActionEntry icon="mdi:filter-outline" text="filter" bind:active={filterOpen} />
  </ActionCard>

  {#if currentFilter.length > 0}
    <ActionCard class="p-4">
      <div class="flex gap-2">
        {#each currentFilter as filter}
          {@const label = Object.keys(filter)[0]}
          {@const text = filter[label]}
          <Pill {label} {text}></Pill>
        {/each}
      </div>
    </ActionCard>
  {/if}
</div>
<div class="relative flex h-full overflow-hidden">
  <DynTable href={({ id }) => `/events/${id}`} {header} data={tableData} />

  {#if filterOpen}
    <Filter header={filter} bind:currentFilter />
  {/if}
</div>
<Pagination bind:page />
