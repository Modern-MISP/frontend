<script lang="ts">
  import EventGraph from '$lib/components/eventGraph/EventGraph.svelte';
  import { SvelteFlowProvider } from '@xyflow/svelte';

  export let data;
</script>

<SvelteFlowProvider>
  <EventGraph event={data.event} />
</SvelteFlowProvider>
