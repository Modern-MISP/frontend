<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import EnableFilter from '../../galaxies/EnableFilter.svelte';

  /** The data that will be displayed on this page. */
  export let data;

  $: filterableTableData = data.tableData.map((d) => ({ ...d, enabled: !d.disabled }));

  let filtered: typeof filterableTableData = [];
</script>

<!--
  @component
  
  A list of all workflow triggers.
-->
<ComplexTableLayout {...data} tableData={filtered}>
  <div slot="filter">
    <EnableFilter bind:data={filterableTableData} bind:filtered></EnableFilter>
  </div>
</ComplexTableLayout>
