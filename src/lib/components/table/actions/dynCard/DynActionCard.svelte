<script lang="ts" generics="T">
  import CallbackEntry from '$lib/components/menus/topmenu/actionbar/CallbackEntry.svelte';
  import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
  import ActionCard from '../card/ActionCard.svelte';

  /**
   * The header of the table. Also includes the icon and the href.
   */
  export let header: DynCardActionHeader<T[]>[];
  /**
   * The data that will be displayed in the table.
   */
  export let data: T[];

  let clazz = '';
  /**
   * Class overload
   */
  export { clazz as class };
</script>

<ActionCard class="{clazz} gap-4 ">
  <slot />
  {#each header as props}
    <CallbackEntry {...props} action={() => props.action(data)} class="w-max {props.class}"
    ></CallbackEntry>
  {/each}
</ActionCard>
