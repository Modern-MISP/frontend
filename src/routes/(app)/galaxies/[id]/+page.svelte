<script lang="ts">
  import { page } from '$app/stores';
  import { actionBar } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import type { PageData } from './$types';

  /** Data that is displayed on this page. */
  export let data: PageData;

  $: ({ left, right, galaxy, header } = data);

  $: galaxyData = galaxy.Galaxy!;
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
      icon: 'mdi:plus-circle-outline',
      label: 'Add Cluster',
      action: `/galaxies/${$page.params.id}/new_cluster`
    },
    {
      icon: 'mdi:export',
      label: 'Export Galaxy',
      action: `/galaxies/${$page.params.id}/export`
    }
  ]}
/>

<ComplexTableLayout
  tableHref={({ id }) => `/galaxies/clusters/${id}`}
  tableData={galaxy.GalaxyCluster ?? []}
  {header}
/>
