<script lang="ts">
  import Button from '$lib/components/button/Button.svelte';
  import Card from '$lib/components/card/Card.svelte';
  import { useEdges, useNodes } from '@xyflow/svelte';
  import { createEventDispatcher } from 'svelte';

  /** Node id */
  export let id: string;
  /** absolute top distance in pixels */
  export let top: number | undefined;
  /** absolute bottom distance in pixels */
  export let bottom: number | undefined;
  /** absolute right distance in pixels */
  export let right: number | undefined;
  /** absolute left distance in pixels */
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
  class="absolute z-10"
  style={`top: ${top}px; left: ${left}px; right: ${right}px; bottom: ${bottom}px;`}
>
  <Card class="!resize-none shadow-lg shadow-black">
    <span>Node: {id}</span>
    <hr class="w-full border-text" />
    <Button on:click={deleteNode} prefixIcon="mdi:delete" class="text-red">Delete</Button>
  </Card>
</div>
