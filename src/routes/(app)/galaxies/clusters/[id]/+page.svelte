<script lang="ts">
  import Boolean from '$lib/components/boolean/Boolean.svelte';
  import Card from '$lib/components/card/Card.svelte';
  import CardRow from '$lib/components/card/CardRow.svelte';
  import Info from '$lib/components/info/Info.svelte';
  import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
  import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
  import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
  import type { PageData } from './$types';

  /** Data that is provided +page.ts on page load. */
  export let data: PageData;

  const { header, tableData, galaxyCluster } = data;

  const info = galaxyCluster.GalaxyCluster;
  console.log(info);
</script>

<!--
  @component

  Show all information about a single galaxy cluster, including its elements.
-->

<!-- TODO: convert to dnyCard with tableBuilder -->
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <Card class="gap-4">
    <CardRow>
      <span class="font-bold">Value</span>
      <span>{info?.value ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">Description</span>
      <span class="pl-10">{info?.description ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">Type</span>
      <span class="pl-10">{info?.type ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">Parent Galaxy</span>
      <HrefPill
        icon="streamline:galaxy-2-solid"
        label={info?.galaxy_id ?? 'unknown'}
        text={info?.Galaxy.name}
        href="/galaxies/{info?.galaxy_id}"
      />
    </CardRow>

    <CardRow>
      <span class="font-bold">Source</span>
      <span class="pl-10">{info?.source ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">Authors</span>
      <PillCollection
        pills={info?.authors.map((a) => ({ icon: 'streamline:user-circle-single', text: a }))}
        class="pl-4"
      />
    </CardRow>

    <CardRow>
      <span class="font-bold">Events</span>
      <Info>{info?.tag_count ?? 'unknown'}</Info>
    </CardRow>

    <CardRow>
      <span class="font-bold">Tag</span>
      <HrefPill
        icon="mdi:tag"
        label={info?.tag_id ?? '?'}
        text={info?.tag_name ?? 'unknown'}
        href={info?.tag_id ? '/tags/' + info.tag_id : '#'}
      />
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
      <span class="font-bold">Collection UUID</span>
      <span>{info?.collection_uuid ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">Owner Organization</span>
      <span>{info?.Org.name ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">Creator Organization</span>
      <span>{info?.Orgc.name ?? 'unknown'}</span>
    </CardRow>

    <CardRow>
      <span class="font-bold">Distribution</span>
      <LookupPill value={+info.distribution} options={DISTRIBUTION_LOOKUP} />
    </CardRow>

    <CardRow>
      <span class="font-bold">Default</span>
      <Boolean isTrue={info.default} />
    </CardRow>
  </Card>
</div>

<DynTable {header} data={tableData} />
