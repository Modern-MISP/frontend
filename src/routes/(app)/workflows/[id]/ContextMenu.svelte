<script lang="ts">
  import Button from '$lib/components/button/Button.svelte';
  import Card from '$lib/components/card/Card.svelte';
  import { useEdges, useNodes } from '@xyflow/svelte';
  import { createEventDispatcher } from 'svelte';

  export let id: string;
  export let top: number | undefined;
  export let bottom: number | undefined;
  export let right: number | undefined;
  export let left: number | undefined;

  const dispatch = createEventDispatcher<{ close: void }>();

  const nodes = useNodes();
  const edges = useEdges();

  function deleteNode() {
    $nodes = $nodes.filter((node) => node.id !== id);
    $edges = $edges.filter((edge) => edge.source !== id && edge.target !== id);
    dispatch('close');
  }
</script>

<div
  class="absolute z-10 shadow shadow-black"
  style={`top: ${top}px; left: ${left}px; right: ${right}px; bottom: ${bottom}px;`}
>
  <Card>
    <span>Node: {id}</span>
    <hr class="w-full border-text" />
    <Button on:click={deleteNode} prefixIcon="mdi:delete" class="text-red">Delete</Button>
  </Card>
</div>
