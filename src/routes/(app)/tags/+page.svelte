<script lang="ts">
  import FilterCard from '$lib/components/filter/FilterCard.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import CreateTag from './CreateTag.svelte';

  /**
   * Page data
   */
  export let data;

  $: ({ tableData } = data);

  let tagFilter = '';

  $: filtered = tableData.filter((x) => x.name?.includes(tagFilter));

  let addTag = false;

  $: topMenuActions = [
    addTag
      ? {
          icon: 'mdi:close-circle-outline',
          label: 'Close Create Tag',
          action: () => (addTag = false),
          class: 'text-red'
        }
      : {
          icon: 'mdi:tag-plus',
          label: 'Create Tag',
          action: () => (addTag = true)
        }
  ];
</script>

<!--
  @component
  Displays a combined list of the tags of all events.
  
-->

<ComplexTableLayout {...data} {topMenuActions} tableData={filtered}>
  <div slot="filter">
    <ActionCard class="h-20">
      <Input placeholder="Search tag" class="w-max" on:value={({ detail }) => (tagFilter = detail)}
      ></Input>
    </ActionCard>
  </div>

  <svelte:fragment slot="added">
    {#if addTag}
      <div
        class="absolute top-0 left-0 z-30 grid w-full h-full grid-cols-2 gap-2 p-1 lg:w-3/4 2xl:w-1/2"
      >
        <FilterCard>
          <span slot="heading"> Create a new Tag</span>
          <CreateTag on:close={() => (addTag = false)}></CreateTag>
        </FilterCard>
      </div>
    {/if}
  </svelte:fragment>
</ComplexTableLayout>
