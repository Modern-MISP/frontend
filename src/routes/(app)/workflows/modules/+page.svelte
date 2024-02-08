<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  export let data;
</script>

<!--
  @component
  
  A list of all workflow modules except triggers.
-->
<ComplexTableLayout {...data} topMenuActions={[]} filter={[]}>
  <div slot="pagination"></div>
</ComplexTableLayout>
