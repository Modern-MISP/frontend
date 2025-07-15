<script lang="ts">
  import Button from '$lib/components/button/Button.svelte';
  import Card from '$lib/components/card/Card.svelte';
  import { useSvelteFlow } from '@xyflow/svelte';
  import { capitalize } from 'lodash-es';
  import { createEventDispatcher } from 'svelte';

  interface Props {
    /** Node or edge id */
    id: string;
    /** target type */
    type: 'node' | 'edge';
    /** absolute top distance in pixels */
    top: number | undefined;
    /** absolute bottom distance in pixels */
    bottom: number | undefined;
    /** absolute right distance in pixels */
    right: number | undefined;
    /** absolute left distance in pixels */
    left: number | undefined;
  }

  let { id, type, top, bottom, right, left }: Props = $props();

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
    <Button on:click={deleteTarget} prefixIcon="mdi:delete" class="text-ctp-red">Delete</Button>
  </Card>
</div>
