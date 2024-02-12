<script lang="ts">
  import { lockViewMode } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';

  /** Data that is provided +page.ts on page load. */
  export let data;

  const { cardData, leftCardHeader, rightCardHeader, tableData, tableHeader } = data;
</script>

<!--
  @component

  Show all information about a single galaxy cluster, including its elements.
-->

<svelte:window use:lockViewMode={data.cardData?.default ?? false} />

<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard header={leftCardHeader} data={cardData}></DynCard>
  <DynCard header={rightCardHeader} data={cardData}></DynCard>
</div>

<DynTable header={tableHeader} data={tableData} />
