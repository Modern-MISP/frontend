<script lang="ts">
  import Input from '$lib/components/input/Input.svelte';
  import Pagination from '$lib/components/pagination/Pagination.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
  import CreateTag from './CreateTag.svelte';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import FilterCard from '$lib/components/filter/FilterCard.svelte';
  import CardHeading from '$lib/components/card/CardHeading.svelte';

  /**
   * Page data
   */
  export let data;

  $: ({ tableData } = data);

  let tagFilter = '';

  $: filtered = tableData.filter((x) => x.name?.includes(tagFilter));

  // should be implemented with paginated post request to api.But the api does not support this.
  $: sliced = filtered.slice(50 * page - 50, 50 * page);
  $: page = 1;

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

<ComplexTableLayout {...data} {topMenuActions} tableData={sliced} filter={[]}>
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
          <CardHeading>Create a new Tag</CardHeading>
          <CreateTag on:close={() => (addTag = false)}></CreateTag>
        </FilterCard>
      </div>
    {/if}
  </svelte:fragment>

  <div slot="pagination">
    <Pagination bind:page length={tableData.length / 50} />
  </div>
</ComplexTableLayout>
