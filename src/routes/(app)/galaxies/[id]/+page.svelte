<script lang="ts">
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import type { PageData } from './$types';
  import { actionBar } from '$lib/actions';
  import { page } from '$app/stores';

  /** Data that is displayed on this page. */
  export let data: PageData;

  const { left, right, galaxy, header } = data;

  const galaxyData = galaxy.Galaxy!;
</script>

<!--
  @component
  
  Information about a single galaxy, including a list of its clusters.
-->

<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard header={left} data={galaxyData} />
  <DynCard header={right} data={galaxyData} />
</div>

<svelte:window
  use:actionBar={[
    {
      icon: 'mdi:plus',
      label: 'Add Cluster',
      action: `/galaxies/${$page.params.id}/new_cluster`
    }
  ]}
/>

<DynTable
  href={({ id }) => `/galaxies/clusters/${id}`}
  data={galaxy.GalaxyCluster ?? []}
  {header}
/>
