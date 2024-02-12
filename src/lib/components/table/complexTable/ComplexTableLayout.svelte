<script lang="ts" generics="T extends IRecord">
  import type { FastFilter } from '$lib/models/FastFilter.interface';

  import ActiveEntry from '$lib/components/menus/topmenu/actionbar/ActiveEntry.svelte';

  import type { api } from '$lib/api';

  import { errorPill } from '$lib/util/pill.util';

  import { page } from '$app/stores';

  import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';

  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

  import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';

  import type { TableHead } from '$lib/models/TableHead.interface';

  import type { Readable } from 'svelte/store';

  import FilterCard from '$lib/components/table/actions/filterCard/FilterCard.svelte';

  import { actionBar } from '$lib/actions';
  import Pagination from '$lib/components/pagination/Pagination.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';

  import DynActionCard from '$lib/components/table/actions/dynCard/DynActionCard.svelte';
  import SelectionCard from '$lib/components/table/actions/selectionCard/SelectionCard.svelte';

  import Filter from '$lib/components/filter/Filter.svelte';
  import { mode, notifications } from '$lib/stores';
  import { constant, isMatch, merge, omitBy } from 'lodash-es';

  /**
   * Your initial data
   */
  export let tableData: T[];
  /**
   * Your table header. {@link DynTable.header}
   */
  export let header: Readable<TableHead<T> & DynTableHeadExtent>[];
  /**
   * Your filter header. {@link Filter.header }
   */
  export let filter: Readable<TableHead<undefined>>[];

  /**
   * Your edit actions. {@link DynActionCard.header}
   */
  export let editActions: DynCardActionHeader<T[]>[];

  /**
   * Your top menu actions. {@link actionBar}
   */
  export let topMenuActions: ActionBarEntryProps[];

  /**
   * Do you want to include pagination in the request and in the page. Default: true
   */
  export let pagination = true;

  /**
   * The callback that will be called to determine if the row should be grouped with other rows, and what info to show
   */
  export let groupInfo: (x: T) => unknown | undefined = constant(undefined);

  /**
   * The href where the use will be navigated, if clicked on an row {@see DynTable.href}
   * @param row The row the user clicked. Defaults to the id. You should define this, if your data does not include an id.
   * @param row.id Defaults to the id of the row
   * @returns The href th user will be navigate to
   */
  export let tableHref: ((row: T) => string | undefined) | undefined = ({ id }) =>
    `${$page.url}/${id}`;

  /**
   * The endpoint where the requests will be sent to.
   */
  export let endpoint:
    | ((body: Record<string, unknown>) => ReturnType<(typeof $api)['POST'] | (typeof $api)['GET']>)
    | undefined = undefined;

  /**
   * A transform function for the response data, after more data gets loaded (by pagination, filter). Default: (x) => x as T[] (no transformation)
   * @param x response data (untransformed)
   * @returns The transformed data
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Can not know the type of the response here. Depends on endpoint. Fixing this with a generic would be too much work.
  export let dataAccess: (body: any) => T[] = (x) => x as T[];

  const loadMore = async (bodyOptions: Record<string, unknown>) => {
    if (!endpoint) return;
    const { data: _data, error: mispError, response } = await endpoint(bodyOptions);

    if (mispError) {
      console.error(mispError);
      notifications.add(errorPill('Error fetching more data'));
    }

    if (response.ok && _data) {
      tableData = dataAccess(_data);
    }
  };

  $: pagPage = 1;

  $: loadMore({ ...merge({}, currentFilter, pagination ? { page: pagPage, limit: 50 } : {}) });

  let filterOpen = false;
  let currentFilter: Record<string, string> = {};

  let activeRows: typeof tableData = [];

  // Reset selected rows, if tableData changed
  let lastTableData: typeof tableData = [];
  $: if (tableData !== lastTableData) {
    lastTableData = tableData;
    activeRows = [];
  }

  /**
   * Defined some fast filter attributes
   */
  export let fastFilter: FastFilter[] = [];
  // The fastFilter should be active if ifActive is a subset of currentFilter
  $: activeFastFilter = fastFilter.map((x) => isMatch(currentFilter, x.ifActive));
</script>

<svelte:window use:actionBar={topMenuActions} />

<div class="flex gap-4">
  <slot name="filter">
    {#if filter.length > 0}
      <FilterCard bind:currentFilter bind:filterOpen>
        {#each fastFilter as fastFilterEntry, i}
          <ActiveEntry
            {...fastFilterEntry}
            active={activeFastFilter[i]}
            on:click={() =>
              // If the activeFastFilter is set, omit all values provided in ifActive. Else add them the the current filter
              (currentFilter = !activeFastFilter[i]
                ? { ...currentFilter, ...fastFilterEntry.ifActive }
                : omitBy(
                    currentFilter,
                    (value, key) =>
                      Object.keys(fastFilter[i].ifActive).includes(key) &&
                      fastFilter[i].ifActive[key] === value
                  ))}
          ></ActiveEntry>
        {/each}
      </FilterCard>
    {/if}
  </slot>
  <slot name="actionList">
    {#if $mode === 'edit'}
      <SelectionCard
        numSelected={activeRows.length}
        selectAll={() => (activeRows = tableData)}
        unselectAll={() => (activeRows = [])}
      />
      <slot name="editActions">
        <DynActionCard header={editActions} data={activeRows}></DynActionCard>
      </slot>
    {/if}
  </slot>
  <slot name="moreActions" />
</div>
<div class="relative flex h-full overflow-hidden">
  <slot>
    <slot name="table">
      <DynTable
        href={tableHref}
        {header}
        data={tableData}
        selectMode={$mode === 'edit'}
        bind:activeRows
        {groupInfo}
      />
    </slot>
    {#if filter.length > 0 && filterOpen}
      <Filter header={filter} bind:currentFilter />
    {/if}
    <slot name="added" />
  </slot>
</div>

{#if pagination}
  <slot name="pagination">
    <Pagination bind:page={pagPage} />
  </slot>
{/if}
