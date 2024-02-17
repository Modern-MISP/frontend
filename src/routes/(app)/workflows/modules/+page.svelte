<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import EnableFilter from '../../galaxies/EnableFilter.svelte';

  export let data;

  $: filterableTableData = data.tableData.map((d) => ({ ...d, enabled: !d.disabled }));

  let filtered: typeof filterableTableData = [];
</script>

<!--
  @component
  
  A list of all workflow modules except triggers.
-->
<ComplexTableLayout {...data} tableData={filtered}>
  <div slot="filter">
    <EnableFilter bind:data={filterableTableData} bind:filtered></EnableFilter>
  </div>
</ComplexTableLayout>
