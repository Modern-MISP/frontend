<script lang="ts" generics="T">
  import { derived, type Readable } from 'svelte/store';

  import type { TableHead } from '$lib/models/TableHead.interface';
  import ActionCard from '../card/ActionCard.svelte';

  /**
   * The header of the table. Also includes the icon and the href.
   */
  export let header: Readable<TableHead<T[]>>[];
  /**
   * The data that will be displayed in the table.
   */
  export let data: T[];

  const store = derived(header, (arr) => arr);

  let clazz = '';

  /**
   * Class overload
   */
  export { clazz as class };
</script>

<ActionCard class={clazz}>
  {#each $store as { value }}
    {@const v = value(data)}
    {#if typeof v !== 'string'}
      <svelte:component this={v.display} {...v.props} />
    {/if}
  {/each}
</ActionCard>
