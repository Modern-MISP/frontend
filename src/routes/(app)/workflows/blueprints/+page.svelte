<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  export let data;
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
<ComplexTableLayout
  {...data}
  tableHref={(x) => `/workflowBlueprints/view/${x.WorkflowBlueprint.id}`}
></ComplexTableLayout>
