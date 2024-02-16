<script lang="ts">
  import ActiveEntry from '$lib/components/menus/topmenu/actionbar/ActiveEntry.svelte';
  import Pill from '$lib/components/pills/pill/Pill.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
  import Icon from '@iconify/svelte';
  import { omit } from 'lodash-es';

  /**
   * Are the Filter open
   */
  export let filterOpen = false;

  /**
   * Currently Filter
   */
  export let currentFilter: Record<string, string> = {};
  $: filterKeys = Object.keys(currentFilter);
</script>

<ActionCard class="!w-auto gap-4 flex flex-nowrap">
  <ActiveEntry label="Filter" icon="mdi:filter-outline" bind:active={filterOpen}></ActiveEntry>
  <slot />
  {#if filterKeys.length > 0}
    <div class="flex flex-wrap items-center w-full h-full gap-2">
      {#each filterKeys as filterKey}
        {@const label = filterKey}
        {@const text = currentFilter[label]}
        <Pill {label} {text} class="h-min">
          <span class="flex overflow-hidden shrink line-clamp-1">
            {text}
          </span>
          <button
            type="button"
            on:click={() => (currentFilter = omit(currentFilter, filterKey))}
            class="justify-center pl-1 align-middle hover:text-red shrink-0"
          >
            <Icon icon="mdi:close-circle-outline" />
          </button>
        </Pill>
      {/each}
    </div>
  {/if}
</ActionCard>
