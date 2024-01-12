<script lang="ts">
  import CallbackEntry from './CallbackEntry.svelte';
  import HrefEntry from './HrefEntry.svelte';
  import { slide } from 'svelte/transition';
  import type { ActionBarEntry } from '$lib/models/ActionBarEntry.interface';

  /** Actions that are displayed. */
  export let entries: Array<ActionBarEntry>;

  const entryFactory = (actionBarEntry: ActionBarEntry) => {
    return typeof actionBarEntry.action === 'string' ? HrefEntry : CallbackEntry;
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
