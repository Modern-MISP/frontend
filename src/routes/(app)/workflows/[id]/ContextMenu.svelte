<script lang="ts">
  import Button from '$lib/components/button/Button.svelte';
  import Card from '$lib/components/card/Card.svelte';
  import { useSvelteFlow } from '@xyflow/svelte';
  import { capitalize } from 'lodash-es';
  import { createEventDispatcher } from 'svelte';

  /** Node or edge id */
  export let id: string;
  /** target type */
  export let type: 'node' | 'edge';
  /** absolute top distance in pixels */
  export let top: number | undefined;
  /** absolute bottom distance in pixels */
  export let bottom: number | undefined;
  /** absolute right distance in pixels */
  export let right: number | undefined;
  /** absolute left distance in pixels */
  export let left: number | undefined;

  const dispatch = createEventDispatcher<{ close: void }>();

  const svelteFlow = useSvelteFlow();

  function deleteTarget() {
    if (type === 'node') {
      svelteFlow.deleteElements({ nodes: [{ id }] });
    } else {
      svelteFlow.deleteElements({ edges: [{ id }] });
    }
    dispatch('close');
  }
</script>

<div
  class="absolute z-10"
  style={`top: ${top}px; left: ${left}px; right: ${right}px; bottom: ${bottom}px;`}
>
  <Card class="shadow-lg shadow-black">
    <span>{capitalize(type)}: {id}</span>
    <hr class="w-full border-text" />
    <Button on:click={deleteTarget} prefixIcon="mdi:delete" class="text-red">Delete</Button>
  </Card>
</div>
