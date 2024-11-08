<script lang="ts">
  import LocalFilter from './LocalFilter.svelte';

  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  /**
   * Page data of the organisations table.
   */
  export let data;

  $: ({ tableData } = data);

  let filtered: typeof tableData = [];
</script>

<!--
  @component
  
  A list of all the organisations available to the user.
-->

<ComplexTableLayout {...data} tableData={filtered}>
  <div slot="filter">
    <LocalFilter bind:data={tableData} bind:filtered></LocalFilter>
  </div>
</ComplexTableLayout>
