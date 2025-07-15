<script lang="ts">
  import { page } from '$app/state';
  import { actionBar } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import type { PageData } from './$types';

  interface Props {
    /** Page data containing the data and cluster overview of the galaxy with the 'id' in the url  */
    data: PageData;
  }

  let { data }: Props = $props();

  let { left, right, galaxy, header } = $derived(data);

  let galaxyData = $derived(galaxy.Galaxy!);
</script>

<!--
  @component

  Information about an galaxy specified by 'id', including a list of its clusters.

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
      action: `/galaxies/${page.params.id}/new_cluster`
    },
    {
      icon: 'mdi:export',
      label: 'Export Galaxy',
      action: `/galaxies/${page.params.id}/export`
    }
  ]}
/>

<ComplexTableLayout
  tableHref={({ id }) => `/galaxies/clusters/${id}`}
  tableData={galaxy.GalaxyCluster ?? []}
  {header}
/>
