<script lang="ts">
  /* Imports for search options
  import { api } from '$lib/api';
  import { get } from 'svelte/store';
  import Input from '$lib/components/input/Input.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
  import CreateTag from './CreateTag.svelte';
  */
  import FilterCard from '$lib/components/filter/FilterCard.svelte';
  import CreateTag from './CreateTag.svelte';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  interface Props {
    /**
     * Page data containing the tags table.
     */
    data: any;
  }

  let { data }: Props = $props();

  /* functions for search options
  $: ({ tableData } = data);

  let tagFilter = '';

  $: filtered = tableData.filter((x) => x.name?.toLowerCase()?.includes(tagFilter.toLowerCase()));
  */

  let addTag = $state(false);

  let topMenuActions = $derived([
    addTag
      ? {
          icon: 'mdi:close-circle-outline',
          label: 'Close Create Tag',
          action: () => (addTag = false),
          class: 'text-ctp-red'
        }
      : {
          icon: 'mdi:tag-plus',
          label: 'Create Tag',
          action: () => (addTag = true)
        }
  ]);
</script>

<!--
  @component
  Displays a combined list of the tags of all events.

-->

<ComplexTableLayout {...data} {topMenuActions}>
  <!-- search options
  <div slot="filter">
    <ActionCard class="h-20">
      <Input placeholder="Search tag" class="w-max" on:value={({ detail }) => (tagFilter = detail)}
      ></Input>
    </ActionCard>
  </div>
-->
  {#snippet added()}
    {#if addTag}
      <div
        class="absolute top-0 left-0 z-30 grid w-full h-full grid-cols-2 gap-2 p-1 lg:w-3/4 2xl:w-1/2"
      >
        <FilterCard>
          {#snippet heading()}
            <span> Create a new Tag</span>
          {/snippet}
          <CreateTag on:close={() => (addTag = false)}></CreateTag>
        </FilterCard>
      </div>
    {/if}
  {/snippet}
</ComplexTableLayout>
