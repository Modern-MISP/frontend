<script lang="ts" generics="T extends IRecord">
  import { run } from 'svelte/legacy';

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
  import { appState, notifications } from '$lib/stores.svelte.ts';
  import { constant, isMatch, merge, omitBy } from 'lodash-es';

  const LIMIT = 5;

  /**
   * A transform function for the response data, after more data gets loaded (by pagination, filter). Default: (x) => x as T[] (no transformation)
   * @param x response data (untransformed)
   * @returns The transformed data
   */

  // first loadMore is unnecessary, because we fetch Data in page.ts
  let skipRequests = -1;

  const loadMore = async (bodyOptions: Record<string, unknown>) => {
    if (endpoint == undefined) return;
    if (skipRequests < 0) {
      skipRequests += 1;
      return;
    }
    const { data: _data, error: mispError, response } = await endpoint(bodyOptions);

    if (mispError) {
      console.error(mispError);
      notifications.add(errorPill('Error fetching more data'));
    }

    if (response.ok && _data) {
      tableData = dataAccess(_data);
    }
  };

  let filterOpen = $state(false);
  let currentFilter: Record<string, string> = $state({});

  let activeRows: typeof tableData = $state([]);

  // Reset selected rows, if tableData changed
  let lastTableData: typeof tableData = $state([]);

  interface Props {
    /**
     * Your initial data
     */
    tableData: T[];
    /**
     * Your table header. {@link DynTable.header}
     */
    header: Readable<TableHead<T> & DynTableHeadExtent>[];
    /**
     * Your filter header. {@link Filter.header }
     */
    filter?: Readable<TableHead<undefined>>[];
    /**
     * Your edit actions. {@link DynActionCard.header}
     */
    editActions?: DynCardActionHeader<T[]>[];
    /**
     * Your top menu actions. {@link actionBar}
     */
    topMenuActions?: ActionBarEntryProps[];
    /**
     * Do you want to include pagination in the request and in the page. Default: true
     */
    pagination?: boolean;
    /**
     * max number of elements.
     */
    maxCount?: any;
    /**
     * The callback that will be called to determine if the row should be grouped with other rows, and what info to show
     */
    groupInfo?: (x: T) => unknown | undefined;
    /**
     * The href where the user will be navigated, if clicked on a row {@see DynTable.href}
     * @param row The row the user clicked. Defaults to the id. You should define this, if your data does not include an id.
     * @param row.id Defaults to the id of the row
     * @returns The href the user will be navigated to
     */
    tableHref?: ((row: T) => string | undefined) | undefined;
    /**
     * The endpoint where the requests will be sent to.
     */
    endpoint?:
      | ((
          body: Record<string, unknown>
        ) => ReturnType<(typeof $api)['POST'] | (typeof $api)['GET']>)
      | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Can not know the type of the response here. Depends on endpoint. Fixing this with a generic would be too much work.
    dataAccess?: (body: any) => T[];
    /**
     * Defined some fast filter attributes
     */
    fastFilter?: FastFilter[];
    s_filter?: import('svelte').Snippet;
    actionList?: import('svelte').Snippet;
    s_editActions?: import('svelte').Snippet;
    moreActions?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
    table?: import('svelte').Snippet;
    added?: import('svelte').Snippet;
    s_pagination?: import('svelte').Snippet;
  }

  let {
    tableData = $bindable(),
    header,
    filter = [],
    editActions = [],
    topMenuActions = [],
    pagination = true,
    maxCount = tableData.length,
    groupInfo = constant(undefined),
    tableHref = ({ id }) => `${$page.url}/${id}`,
    endpoint = undefined,
    dataAccess = (x) => x as T[],
    fastFilter = [],
    s_filter,
    actionList,
    s_editActions,
    moreActions,
    children,
    table,
    added,
    s_pagination
  }: Props = $props();

  //  let sliced: typeof tableData = $state([]);
  let pagPage = $state(1);

  run(() => {
    loadMore({ ...merge({}, currentFilter, pagination ? { page: pagPage, limit: LIMIT } : {}) });
    activeRows = [];
    if (endpoint === undefined) {
      maxCount = tableData.length;
    }
  });

  let pTableData = $derived.by(() => {
    if (endpoint === undefined) return tableData.slice(LIMIT * pagPage - LIMIT, LIMIT * pagPage);
    else return tableData;
  });
  // The fastFilter should be active if ifActive is a subset of currentFilter
  let activeFastFilter = $derived(fastFilter.map((x) => isMatch(currentFilter, x.ifActive)));
</script>

<!-- Feel free to change the css here because i don't have a clue what i am doing here if changed check if its still correct under /workerManagement/{id}-->
<svelte:window use:actionBar={topMenuActions} />
<div class="flex flex-col h-full w-full gap-2">
  <div class="flex gap-4 h-fit" id="filterRow">
    {#if s_filter}{@render s_filter()}{:else if filter.length > 0}
      <FilterCard bind:currentFilter bind:filterOpen>
        {#each fastFilter as fastFilterEntry, i}
          <ActiveEntry
            class="w-max"
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
    {#if actionList}{@render actionList()}{:else if editActions.length > 0}
      <!-- removes the selection when no action is defined to performe on the selectet rows-->
      {#if appState.mode === 'edit'}
        <SelectionCard
          numSelected={activeRows.length}
          selectAll={() => (activeRows = tableData)}
          unselectAll={() => (activeRows = [])}
        />
        {#if s_editActions}{@render s_editActions()}{:else}
          <DynActionCard
            header={editActions.map((a) => ({ disabled: activeRows.length === 0, ...a }))}
            data={activeRows}
          ></DynActionCard>
        {/if}
      {/if}
    {/if}
    {@render moreActions?.()}
  </div>
  <div class="relative flex h-9/10 overflow-hidden">
    {#if children}{@render children()}{:else}
      {#if table}{@render table()}{:else}
        <DynTable
          href={tableHref}
          {header}
          data={pTableData}
          selectMode={appState.mode === 'edit'}
          bind:activeRows
          {groupInfo}
        />
      {/if}
      {#if filter.length > 0 && filterOpen}
        <Filter header={filter} bind:currentFilter />
      {/if}
      {@render added?.()}
    {/if}
  </div>
  {#if maxCount > LIMIT}
    <div class="h-fit">
      {#if s_pagination}{@render s_pagination()}{:else}
        <Pagination bind:page={pagPage} length={maxCount / LIMIT} />
      {/if}
    </div>
  {/if}
</div>
