<script lang="ts" generics="T">
  import { derived, type Readable } from 'svelte/store';
  import type { TableHead } from '$lib/models/TableHead.interface';
  import CardRow from '$lib/components/card/CardRow.svelte';

  interface Props {
    /**
     * The header of the table. Also includes the icon and the href.
     */
    header: Readable<TableHead<T>>[];
    /**
     * The data that will be displayed in the table.
     */
    data: T;
  }

  let { header, data }: Props = $props();
  /**
   * The titel of the card.
   */
  const store = derived(header, (arr) => arr);
</script>

{#each $store as { label, value, hidden } (label)}
  <CardRow class="gap-2 {hidden ? 'hidden' : ''}">
    <span class="font-bold">{label}</span>
    {@const v = value(data)}
    {#if v !== null && v !== undefined}
      {#if typeof v !== 'string'}
        <v.display {...v.props} />
      {:else}
        <span>{v}</span>
      {/if}
    {:else}
      <span class="text-red">undefined</span>
    {/if}
  </CardRow>
{/each}
