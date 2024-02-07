<script lang="ts">
  import { actionBar } from '$lib/actions.js';
  import Input from '$lib/components/input/Input.svelte';
  import Pagination from '$lib/components/pagination/Pagination.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';

  /**
   * Page data
   */
  export let data;

  $: ({ tableData, header } = data);

  let tagFilter = '';

  $: filtered = tableData.filter((x) => x.name?.includes(tagFilter));

  // FIXME: should be implemented with paginated post request to api. Server fault...
  $: sliced = filtered.slice(50 * page - 50, 50 * page);
  $: page = 1;
</script>

<!--
  @component
  Displays a combined list of the tags of all events.
  
-->
<svelte:window use:actionBar={[]} />

<div class="flex flex-row gap-1">
  <ActionCard>
    <Input placeholder="Search tag" class="w-max" on:value={({ detail }) => (tagFilter = detail)}
    ></Input>
  </ActionCard>
</div>

<DynTable href={({ id }) => `tags/${id}`} {header} data={sliced} />

<Pagination bind:page />
