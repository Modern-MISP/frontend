<script lang="ts">
  import ActiveEntry from '$lib/components/menus/topmenu/actionbar/ActiveEntry.svelte';
  import Pill from '$lib/components/pills/pill/Pill.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';

  /**
   * Are the Filter open
   */
  export let filterOpen = false;

  /**
   * Currently Filter
   */
  export let currentFilter: Record<string, string>[] = [];
</script>

<ActionCard class="!w-auto gap-4 flex">
  <ActiveEntry label="Filter" icon="mdi:filter-outline" bind:active={filterOpen}></ActiveEntry>
  <slot />
  {#if currentFilter.length > 0}
    <div class="flex flex-wrap w-full h-full gap-2">
      {#each currentFilter as filter}
        {@const label = Object.keys(filter)[0]}
        {@const text = filter[label]}
        <Pill {label} {text} class="h-min"></Pill>
      {/each}
    </div>
  {/if}
</ActionCard>
