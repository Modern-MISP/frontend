<script lang="ts">
  import Input from '$lib/components/input/Input.svelte';
  import Pagination from '$lib/components/pagination/Pagination.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
  import CreateTag from './CreateTag.svelte';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

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

  <div slot="added">
    {#if addTag}
      <CreateTag on:close={() => (addTag = false)}></CreateTag>
    {/if}
  </div>

  <div slot="pagination">
    <Pagination bind:page />
  </div>
</ComplexTableLayout>
