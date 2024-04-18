<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';

  /** The data that will be displayed on this page. */
  export let data;

  const { trigger, infoHeader, workflowHeader } = data;
</script>

<!--
  @component
  
  All the information about a specific workflow trigger,
  including an interactive node-based diagram for visualizing the workflow.
-->
<div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
  <DynCard header={infoHeader} data={trigger} />
  <DynCard header={workflowHeader} data={trigger} />
</div>
