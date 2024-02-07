<script lang="ts">
  import Button from '$lib/components/button/Button.svelte';
  import FilterCard from '$lib/components/filter/FilterCard.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import type { TableHead } from '$lib/models/TableHead.interface';
  import { getFormValues } from '$lib/util/form.util';
  import Icon from '@iconify/svelte';
  import { derived, type Readable } from 'svelte/store';
  import Input from '../input/Input.svelte';
  /**
   * All possible filter
   */
  export let header: Readable<TableHead<undefined>>[];

  const store = derived(header, (arr) => arr);

  /**
   * The current filter values. You should probably bind this.
   */
  export let currentFilter: Record<string, FormDataEntryValue[] | FormDataEntryValue | unknown>[] =
    [];

  let currentOption: string = $store[0].label;
  $: option = $store.find(({ label }) => label === currentOption);
  $: optionValue = option?.value(undefined);
</script>

<div class="absolute top-0 left-0 z-10 grid w-full h-full grid-cols-2 gap-1 lg:w-1/2">
  <form on:submit|preventDefault={(e) => (currentFilter = [...currentFilter, ...getFormValues(e)])}>
    <FilterCard>
      <span slot="heading"> Add Filter </span>

      <Select
        options={$store.map(({ label }) => ({ label, value: label }))}
        bind:value={currentOption}
        class="!bg-overlay0"
      />

      {#if optionValue && typeof optionValue != 'string'}
        <svelte:component this={optionValue.display} {...optionValue.props} class="!bg-overlay0" />
      {:else}
        <Input name={optionValue} placeholder={option?.label} class="!bg-overlay0" />
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
