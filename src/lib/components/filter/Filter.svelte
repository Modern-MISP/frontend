<script lang="ts">
  import { preventDefault } from 'svelte/legacy';

  import Button from '$lib/components/button/Button.svelte';
  import FilterCard from '$lib/components/filter/FilterCard.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import type { TableHead } from '$lib/models/TableHead.interface';
  import { getFormValues } from '$lib/util/form.util';
  import { omit } from 'lodash-es';
  import { derived as storeDerived, type Readable } from 'svelte/store';
  import Input from '../input/Input.svelte';
  import Pill from '../pills/pill/Pill.svelte';

  const store = storeDerived(header, (arr) => arr);

  interface Props {
    /**
     * All possible filter
     */
    header: Readable<TableHead<undefined>>[];
    /**
     * The current filter values. You should probably bind this.
     */
    currentFilter?: Record<string, string>;
  }

  let { header, currentFilter = $bindable({}) }: Props = $props();

  let currentOption: string = $state($store[0].label);
  let option = $derived($store.find(({ label }) => label === currentOption));
  let optionValue = $derived(option?.value(undefined));
</script>

<div
  class="absolute top-0 left-0 z-30 grid w-full h-full grid-cols-2 gap-2 p-1 lg:w-3/4 2xl:w-1/2"
  id="filter"
>
  <form
    onsubmit={preventDefault((e) => {
      currentFilter = { ...currentFilter, ...getFormValues(e) };
    })}
  >
    <FilterCard>
      {#snippet heading()}
        <span> Add Filter </span>
      {/snippet}

      <Select
        options={$store.map(({ label }) => ({ label, value: label }))}
        bind:value={currentOption}
        class="bg-ctp-overlay0!"
      />

      {#if optionValue && typeof optionValue != 'string'}
        <optionValue.display {...optionValue.props} />
      {:else}
        <Input name={optionValue} placeholder={option?.label} />
      {/if}

      <Button
        class="self-end py-2 mt-auto w-min text-ctp-sky"
        suffixIcon="mdi:arrow-right"
        type="submit">Add</Button
      >
    </FilterCard>
  </form>

  <FilterCard>
    {#snippet heading()}
      <span> Current Filter </span>
    {/snippet}

    <div class="flex flex-col w-full gap-2">
      {#each Object.keys(currentFilter) as filterKey}
        <Pill
          label={filterKey}
          text={currentFilter[filterKey]}
          class="justify-between! w-full h-10"
          action={{
            icon: 'mdi:delete-outline',
            onClick: () => (currentFilter = omit(currentFilter, filterKey)),
            class: 'hover:text-ctp-red'
          }}
          title={currentFilter[filterKey]}
        ></Pill>
      {/each}
    </div>
  </FilterCard>
</div>
