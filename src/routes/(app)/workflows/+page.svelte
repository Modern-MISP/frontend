<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import EnableFilter from '../galaxies/EnableFilter.svelte';

  /** The data that will be displayed on this page. */
  export let data;

  $: ({ tableData, header } = data);

  $: filterableTableData = tableData.map((d) => ({ ...d, enabled: d.enabled ?? true }));

  let filtered: typeof filterableTableData = [];
</script>

<!--
  @component
  
  A list of all workflows.
-->
<ComplexTableLayout tableHref={({ id }) => `/workflows/${id}`} {header} tableData={filtered}>
  <div slot="filter">
    <EnableFilter data={filterableTableData} bind:filtered></EnableFilter>
  </div>
</ComplexTableLayout>
