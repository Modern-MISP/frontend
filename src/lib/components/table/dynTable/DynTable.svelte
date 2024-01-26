<script lang="ts" generics="T extends IRecord[]">
  import { derived, type Readable } from 'svelte/store';

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

  const store = derived(header, (arr) => arr);
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
  <tbody>
    {#each data as row}
      <tr class="hover:bg-sky">
        {#each $store as { value }}
          {@const v = value(row)}
          <Td href={href && href(row)}>
            <span class="text-lg">
              {#if typeof v !== 'string'}
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
</Table>
