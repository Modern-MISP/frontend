<script lang="ts">
  import attributeCols, { editAttributeCols } from '../../../../attributes/attributeCols';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import { page } from '$app/stores';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';

  export let data;

  const attributeData = {
    event_id: $page.params.id
  };

  const col = createTableHeadGenerator<NonNullable<typeof attributeData>>();

  const editCols = editAttributeCols(data.attributeTypes);

  const header = [
    col(attributeCols.event),
    col(attributeCols.distribution, editCols.distribution),
    col(attributeCols.category, editCols.category),
    col(attributeCols.comment, editCols.comment),
    col(attributeCols.value, editCols.value)
  ];
</script>

<DynCard {header} data={attributeData} />
