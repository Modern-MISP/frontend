<script lang="ts">
  import ActiveEntry from '$lib/components/menus/topmenu/actionbar/ActiveEntry.svelte';
  import Pill from '$lib/components/pills/pill/Pill.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
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
        <Pill
          {label}
          {text}
          class="h-min"
          action={{
            icon: 'mdi:close-circle-outline',
            onClick: () => (currentFilter = omit(currentFilter, filterKey)),
            class: 'hover:text-red'
          }}
        ></Pill>
      {/each}
    </div>
  {/if}
</ActionCard>
