<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  let { data } = $props();
</script>

<!--
  @component
  A list of all imported/created workflow-blueprints ordered in a table view.
  Contains following attributes for each blueprint:
  - ID
  - UUID
  - Name
  - Default
  - Description
  - Timestamp
-->
<ComplexTableLayout {...data} tableHref={(x) => `/workflows/blueprints/${x.id}`}
></ComplexTableLayout>
