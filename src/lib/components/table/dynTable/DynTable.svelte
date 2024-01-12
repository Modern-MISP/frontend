<script
  lang="ts"
  generics="T extends IRecord[], 
 "
>
  import type { DynTableHeadExtent } from './DynTable.model';

  import type { TableHead } from '$lib/models/TableHead.interface';
  import Table from '../modularTable/Table.svelte';
  import Td from '../modularTable/Td.svelte';
  import Th from '../modularTable/Th.svelte';

  /**
   * The header of the table. Also includes the icon and the href.
   * When setting this it is recommended to use the {@link createTableHeadGenerator} util function inside of {@link tableBuilder.util}
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
</script>

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
  <tbody>
    {#each data as row}
      <tr class="hover:bg-sky">
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
</Table>
