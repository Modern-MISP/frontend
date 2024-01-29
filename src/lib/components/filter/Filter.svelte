<script lang="ts">
  import Button from '$lib/components/button/Button.svelte';
  import FilterCard from '$lib/components/filter/FilterCard.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import type { TableHead } from '$lib/models/TableHead.interface';
  import { getFormValues } from '$lib/util/form.util';
  import Icon from '@iconify/svelte';
  /**
   * All possible filter
   */
  export let header: TableHead<undefined>[];

  /**
   * The current filter values. You should probably bind this.
   */
  export let currentFilter: Record<string, FormDataEntryValue>[] = [{ id: '12' }];

  let currentOption: string = header[0].label;
  $: option = header.find(({ label }) => label === currentOption);
</script>

<div class="absolute top-0 left-0 z-10 grid w-full h-full grid-cols-2 gap-1 lg:w-1/2">
  <form on:submit|preventDefault={(e) => (currentFilter = [...currentFilter, getFormValues(e)])}>
    <FilterCard>
      <span slot="heading"> Add Filter </span>

      <Select
        options={header.map(({ label }) => ({ label, value: label }))}
        bind:value={currentOption}
        class="!bg-overlay0"
      />

      {#if option}
        <svelte:component this={option.display} {...option.value(undefined)} class="!bg-overlay0" />
      {/if}

      <!-- Add element to list. Triggers form submit, cuz type of submit per default. If you change the default ty of the button, you also have to change this. -->
      <Button class="!bg-overlay0 text-sky self-end w-min gap-4 py-2 mt-auto">
        <span> Add </span>
        <Icon icon="mdi:arrow-right" />
      </Button>
    </FilterCard>
  </form>

  <FilterCard>
    <span slot="heading"> Current Filter </span>

    <body class="flex flex-col gap-2">
      {#each currentFilter as filter}
        <div class="flex items-center gap-3 p-2 rounded-md bg-overlay0">
          <!-- Api request key => Should probably add a label to not show internal attributes. -->
          <span class="grow">
            {Object.keys(filter)[0]}
          </span>

          <!-- Value of the only other key inside of the filter obj. -->
          <span>{filter[Object.keys(filter)[0]]}</span>

          <!-- Delete element -->
          <button on:click={() => (currentFilter = currentFilter.filter((x) => x != filter))}>
            <Icon icon="mdi:delete-outline" class="text-red" />
          </button>
        </div>
      {/each}
    </body>
  </FilterCard>
</div>
