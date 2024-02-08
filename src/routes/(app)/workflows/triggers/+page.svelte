<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  /** The data that will be displayed on this page. */
  export let data;
</script>

<!--
  @component
  
  A list of all workflow triggers.
-->
<ComplexTableLayout {...data} topMenuActions={[]} filter={[]}>
  <div slot="pagination"></div>
</ComplexTableLayout>
