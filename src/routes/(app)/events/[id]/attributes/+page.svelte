<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import tableHeader from '../../../attributes/attributeCols';

  export let data;

  const tableData = data.event.Attribute!;

  const col = createTableHeadGenerator<(typeof tableData)[number], DynTableHeadExtent>();
  const header = [
    col(tableHeader.id),
    col(tableHeader.distribution),
    col(tableHeader.category),
    col(tableHeader.comment),
    col(tableHeader.value),
    col(tableHeader.object_id),
    col(tableHeader.object_relation),
    col(tableHeader.type)
  ];
</script>

<ComplexTableLayout
  {tableData}
  {header}
  tableHref={(row) => `/attributes/${row.id}`}
  editActions={[]}
  filter={[]}
></ComplexTableLayout>
