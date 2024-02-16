<script lang="ts">
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import { page } from '$app/stores';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import { actionBar } from '$lib/actions';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

  export let data;

  const attributeData = {
    event_id: $page.params.id
  };

  const col = createTableHeadGenerator<NonNullable<typeof attributeData>>();

  // const editCols = editAttributeCols(data.attributeTypes);

  const header = [
    // col(attributeCols.event),
    // col(attributeCols.distribution, editCols.distribution),
    // col(attributeCols.category, editCols.category),
    // col(attributeCols.type, editCols.type),
    // col(attributeCols.comment, editCols.comment),
    // col(attributeCols.value, editCols.value)
  ];

  const actions: ActionBarEntryProps[] = [
    {
      icon: 'material-symbols:save-outline',
      label: 'Save',
      action: () => {}
    }
  ];
</script>

<svelte:window use:actionBar={actions} />
<DynCard {header} data={attributeData} />
