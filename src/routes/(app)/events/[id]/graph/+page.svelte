<script lang="ts">
  import EventGraph from "$lib/components/eventGraph/EventGraph.svelte";

  export let data;
</script>
<EventGraph event={data.event} />