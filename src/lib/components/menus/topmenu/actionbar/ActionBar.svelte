<script lang="ts">
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { slide } from 'svelte/transition';
  import CallbackEntry from './CallbackEntry.svelte';
  import HrefEntry from './HrefEntry.svelte';
  import type { ComponentType, SvelteComponent } from 'svelte';

  /** Actions that are displayed. */
  export let entries: ActionBarEntryProps[];

  const entryFactory = (
    actionBarEntry: ActionBarEntryProps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): ComponentType<SvelteComponent<any>> => {
    return typeof actionBarEntry.action !== 'string' ? CallbackEntry : HrefEntry;
  };
</script>

<!--
    @component
    
    The action bar contains actions that can be performed when in edit mode.
-->

{#if entries.length > 0}
  <div class="flex flex-row items-center justify-between gap-4 text-text" in:slide>
    {#each entries as entry}
      <svelte:component this={entryFactory(entry)} {...entry} />
    {/each}
  </div>
{/if}
