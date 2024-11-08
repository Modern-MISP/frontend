<script lang="ts">
  import EventGraph from '$lib/components/eventGraph/EventGraph.svelte';
  import { SvelteFlowProvider } from '@xyflow/svelte';

  /**Page data of the event graph */
  export let data;
</script>

<!--
    @component
    Displays the event graph.
-->
<SvelteFlowProvider>
  <EventGraph event={data.event} eventGraphReferences={data.eventGraphReferences} />
</SvelteFlowProvider>
