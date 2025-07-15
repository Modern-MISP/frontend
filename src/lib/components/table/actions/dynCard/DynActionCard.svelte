<script lang="ts" generics="T">
  import CallbackEntry from '$lib/components/menus/topmenu/actionbar/CallbackEntry.svelte';
  import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
  import ActionCard from '../card/ActionCard.svelte';

  interface Props {
    /**
     * The header of the table. Also includes the icon and the href.
     */
    header: DynCardActionHeader<T[]>[];
    /**
     * The data that will be displayed in the table.
     */
    data: T[];
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { header, data, class: clazz = '', children }: Props = $props();
  /**
   * Class overload
   */
</script>

{#if header.length > 0}
  <ActionCard class="{clazz} gap-4 ">
    {@render children?.()}
    {#each header as props}
      <CallbackEntry {...props} action={() => props.action(data)} class="w-max {props.class}"
      ></CallbackEntry>
    {/each}
  </ActionCard>
{/if}
