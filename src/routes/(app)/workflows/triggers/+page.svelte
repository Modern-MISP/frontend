<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import EnableFilter from '../../galaxies/EnableFilter.svelte';

  /** Page data containing the workflow triggers table */
  export let data;

  $: filterableTableData = data.tableData.map((d) => ({ ...d, enabled: !d.disabled }));

  let filtered: typeof filterableTableData = [];
</script>

<!--
  @component
  Displays a table with all workflow triggers.
-->
<ComplexTableLayout {...data} tableData={filtered}>
  <div slot="filter">
    <EnableFilter bind:data={filterableTableData} bind:filtered></EnableFilter>
  </div>
</ComplexTableLayout>
