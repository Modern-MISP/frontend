<script lang="ts">
  import type { components } from '$lib/api/misp';
  import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
  import DynTable from '$lib/components/table/dynTable/DynTable.svelte';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import attributeCols from './attributeCols';

  type Attribute = components['schemas']['Attribute'];

  /**
   * The list of attributes to display.
   */
  export let data: Attribute[];

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col(attributeCols.id),
    col(attributeCols.event),
    col(attributeCols.distribution),
    col(attributeCols.category),
    col(attributeCols.comment),
    col(attributeCols.value),
    col(attributeCols.object_id),
    col(attributeCols.object_relation),
    col(attributeCols.type),
    col(attributeCols.deleted)
  ];
</script>

<DynTable
  {header}
  {data}
  href={(x) => `/attributes/${x.id}`}
  groupInfo={(x) => (x.object_id === '0' ? undefined : `Object: ${x.object_id}`)}
/>
