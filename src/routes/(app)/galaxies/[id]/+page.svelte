<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const { left, right, galaxy, header } = data;
</script>

<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard header={left} data={galaxy.Galaxy} />
  <DynCard header={right} data={galaxy.Galaxy} />
</div>

<DynTable
  href={({ id }) => `/galaxies/clusters/${id}`}
  data={galaxy.GalaxyCluster ?? []}
  {header}
/>
