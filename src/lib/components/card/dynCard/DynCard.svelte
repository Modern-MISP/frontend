<script lang="ts" generics="T">
  import type { ITableHead } from '$lib/models/ITableHead.interface';
  import Card from '$lib/components/card/Card.svelte';
  import CardRow from '$lib/components/card/CardRow.svelte';

  /**
   * The header of the table. Also includes the icon and the href.
   */
  export let header: ITableHead<T>[];
  /**
   * The data that will be displayed in the table.
   */
  export let data: T;
</script>

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
