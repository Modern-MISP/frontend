<script lang="ts" generics="T extends IRecord[]">
  import { derived, type Readable } from 'svelte/store';

  import { constant, groupBy, xor } from 'lodash-es';

  import type { DynTableHeadExtent } from './DynTable.model';

  import type { TableHead } from '$lib/models/TableHead.interface';
  import Table from '../modularTable/Table.svelte';
  import Td from '../modularTable/Td.svelte';
  import Th from '../modularTable/Th.svelte';

  /**
   * The header of the table. Also includes the icon and the href.
   * When setting this, it's recommended to use the [`createTableHeadGenerator`](../dynRendering.md#createtableheadgenerator) util function.
   */
  export let header: Readable<TableHead<T[number]> & DynTableHeadExtent>[];
  /**
   * The data that will be displayed in the table.
   */
  export let data: T;
  /**
   * The callback that will be called when the user clicks on the row.
   */
  export let href: ((row: T[number]) => string | undefined) | undefined = undefined;
  /**
   * The callback that will be called to determine if the row should be grouped with other rows, and what info to show
   */
  export let groupInfo: (x: T[number]) => unknown | undefined = constant(undefined);

  const store = derived(header, (arr) => arr);

  /**
   * currentlyActive rows.
   */
  export let activeRows: T = [] as unknown as T;

  const toggleRow = (row: T[number]) => (activeRows = xor(activeRows, [row]) as T); // This cast is safe, because xor should have IRecord as generic parameter. But ts parses it wrong.
</script>

<!--
  @component
  Creates a dynamic {@link Table} using the `header` and `data` props.

  The `header` props specifies the columns of the table,
  while the `data` prop provides rows of data that conform to the structure of the header.

  Type safety of this is enforced at compile time using Typescript.
  
-->
<Table>
  <thead>
    <tr>
      {#each $store as head}
        <Th
          {...head}
          on:click={() => {
            // data = sortBy(data, (x) => x[head.name].text);
          }}
        />
      {/each}
    </tr>
  </thead>
  {@const grouped = groupBy(data, groupInfo)}
  {#each Object.entries(grouped) as [info, group], i}
    <tbody class:border-blue={info !== 'undefined'} class:border-8={info !== 'undefined'}>
      {#if info !== 'undefined'}
        <tr class="bg-blue">
          <td colspan={$store.length} class="px-2 text-black">
            {info}
          </td>
        </tr>
      {/if}
      {#each group as row}
        <tr
          class="w-full hover:bg-surface2"
          class:bg-surface2={activeRows.includes(row)}
          on:click={() => (href ? undefined : toggleRow(row))}
        >
          {#each $store as { value }}
            {@const v = value(row)}
            <Td href={href && href(row)}>
              <span class="text-lg">
                {#if typeof v != 'string'}
                  <svelte:component this={v.display} {...v.props} />
                {:else}
                  {v}
                {/if}
              </span>
            </Td>
          {/each}
        </tr>
      {/each}
    </tbody>
    <!-- Hack to display a "gap" between `tbody`s, is displayed after all but the last group -->
    {#if i < Object.keys(grouped).length - 1}
      <tbody class="bg-black"><tr><td colspan={$store.length} /></tr></tbody>
    {/if}
  {/each}
  <!-- </tbody> -->
</Table>
