<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import EnableFilter from '../galaxies/EnableFilter.svelte';

  /** Page data containing the workflows table */
  export let data;

  $: ({ tableData, header, editActions } = data);

  $: filterableTableData = tableData.map((d) => ({ ...d, enabled: d.enabled ?? true }));

  let filtered: typeof filterableTableData = [];
</script>

<!--
  @component
  
  Displays a list of all workflows.
-->
<ComplexTableLayout
  tableHref={({ id }) => `/workflows/${id}`}
  {header}
  tableData={filtered}
  {editActions}
>
  <div slot="filter">
    <EnableFilter data={filterableTableData} bind:filtered></EnableFilter>
  </div>
</ComplexTableLayout>
