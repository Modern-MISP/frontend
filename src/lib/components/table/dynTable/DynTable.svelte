<script lang="ts" generics="T extends IRecord[]">
  import { constant, groupBy } from 'lodash-es';

  import type { DynTableHeadExtent } from './DynTable.model';

  import type { TableHead } from '$lib/models/TableHead.interface';
  import Table from '../modularTable/Table.svelte';
  import Td from '../modularTable/Td.svelte';
  import Th from '../modularTable/Th.svelte';

  /**
   * The header of the table. Also includes the icon and the href.
   * When setting this, it's recommended to use the [`createTableHeadGenerator`](../dynRendering.md#createtableheadgenerator) util function.
   */
  export let header: (TableHead<T[number]> & DynTableHeadExtent)[];
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
      {#each header as head}
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
    <tbody class:border-sky={info !== 'undefined'} class:border-8={info !== 'undefined'}>
      {#if info !== 'undefined'}
        <tr class="bg-sky">
          <td colspan={header.length} class="px-2 text-black">
            {info}
          </td>
        </tr>
      {/if}
      {#each group as row}
        <tr class="hover:bg-sky w-full">
          {#each header as { value, display }}
            {@const v = value(row)}
            <Td href={href && href(row)}>
              <span class="text-lg">
                {#if display && typeof v != 'string'}
                  <svelte:component this={display} {...v} />
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
      <tbody class="bg-black"><tr><td colspan={header.length} /></tr></tbody>
    {/if}
  {/each}
  <!-- </tbody> -->
</Table>
