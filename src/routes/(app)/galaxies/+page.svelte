<script lang="ts">
  import EnableFilter from './EnableFilter.svelte';

  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  /**
   * The data that will be displayed on this page
   */
  export let data;

  $: ({ tableData } = data);

  let filtered: typeof tableData = [];
</script>

<!--
  @component
  
  A list of all galaxies.
-->

<ComplexTableLayout {...data} {tableData}>
  <div slot="filter">
    <EnableFilter bind:data={tableData} bind:filtered></EnableFilter>
  </div>
</ComplexTableLayout>
