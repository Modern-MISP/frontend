<script lang="ts">
  import EventGraph from '$lib/components/eventGraph/EventGraph.svelte';
  import { SvelteFlowProvider } from '@xyflow/svelte';

  interface Props {
    /**Page data of the event graph */
    data: any;
  }

  let { data }: Props = $props();
</script>

<!--
    @component
    Displays the event graph.
-->
<SvelteFlowProvider>
  <EventGraph event={data.event} eventGraphReferences={data.eventGraphReferences} />
</SvelteFlowProvider>
