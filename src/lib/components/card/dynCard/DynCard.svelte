<script lang="ts" generics="T">
  import type { TableHead } from '$lib/models/TableHead.interface';
  import Card from '$lib/components/card/Card.svelte';
  import CardRow from '$lib/components/card/CardRow.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

  /**
   * The header of the table. Also includes the icon and the href.
   */
  export let header: TableHead<T>[];
  /**
   * The data that will be displayed in the table.
   */
  export let data: T;
</script>

<!-- 
  @component
  A card that displays the data of the given header.

  This works dynamically similar to the {@link DynTable} component. So you should probably use the {@link createTableHeadGenerator} util function to create the header.
 -->

<Card class="gap-4">
  {#each header as { label, value, display }}
    <CardRow class="gap-2">
      <span class="font-bold">{label}</span>
      {#if display}
        <svelte:component this={display} {...value(data)} />
      {:else}
        <span>{value(data)}</span>
      {/if}
    </CardRow>
  {/each}
</Card>
