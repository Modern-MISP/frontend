<script lang="ts" generics="T">
  import { derived, type Readable } from 'svelte/store';

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
  export let header: Readable<TableHead<T>>[];
  /**
   * The data that will be displayed in the table.
   */
  export let data: T;

  const store = derived(header, (arr) => arr);
</script>

<!-- 
  @component
  A card that displays the data of the given header.

  This works dynamically similar to the {@link DynTable} component. So you should probably use the [`createTableHeadGenerator`](../dynRendering.md#createtableheadgenerator) util function to create the header.
 -->

<Card class="gap-4">
  {#each $store as { label, value }}
    <CardRow class="gap-2">
      <span class="font-bold">{label}</span>
      {@const v = value(data)}
      {#if v !== null && v !== undefined}
        {#if typeof v !== 'string'}
          <svelte:component this={v.display} {...v.props} />
        {:else}
          <span>{v}</span>
        {/if}
      {:else}
        <span class="text-red">undefined</span>
      {/if}
    </CardRow>
  {/each}
</Card>
