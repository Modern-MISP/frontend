<script lang="ts">
  import Boolean from '$lib/components/boolean/Boolean.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import Card from '$lib/components/card/Card.svelte';
  import CardRow from '$lib/components/card/CardRow.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const { header, tableData, galaxy } = data;

  const info = galaxy.Galaxy;
</script>

<!--
  @component
  
  Show all information about a single galaxy, including its clusters.
-->
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <Card class="gap-4">
    <CardRow>
      <span class="font-bold">Name</span>
      <span>{info?.name ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">Description</span>
      <span class="pl-10">{info?.description ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">Namespace</span>
      <span>{info?.namespace ?? 'unknown'}</span>
    </CardRow>
  </Card>

  <Card class="gap-4">
    <CardRow>
      <span class="font-bold">Version</span>
      <span>{info?.version ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">Id</span>
      <span>{info?.id ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">UUID</span>
      <span>{info?.uuid ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">Enabled</span>
      <Boolean isTrue={info.enabled} />
    </CardRow>

    <CardRow>
      <span class="font-bold">Local Only</span>
      <Boolean isTrue={info.local_only} />
    </CardRow>
  </Card>
</div>

<DynTable {header} data={tableData} />
