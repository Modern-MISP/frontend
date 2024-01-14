<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import IconCardRow from '$lib/components/eventGraph/IconCardRow.svelte';
  import Flow from '$lib/components/svelteflow/Flow.svelte';
  import Icon from '@iconify/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable, type Writable } from 'svelte/store';
  const nodes: Writable<Node[]> = writable([]);

  const edges: Writable<Edge[]> = writable([]);

  let tableView: 'objects' | 'attributes' = 'objects';

  type Event = Record<string, unknown>;

  /**
   * The Event to be displayed on this page.
   */
  export let event: Event;
</script>

<!--
  @component
  
  The event Graph component. Uses the {@link Flow} component to render the graph.
  Uses the {@link Card} component to render the action Bar and a table, where the unreferenced objects and attributes are displayed.

-->
<header class="flex justify-between w-full gap-2">
  <div class="flex gap-2">
    <Card>
      <Icon icon="mdi:magnify" />
    </Card>
    <Card />
    <Card />
    <Card />
  </div>
  <div class="flex gap-4 shrink-0">
    <Card>Objects</Card>
    <Card>Attributes</Card>
  </div>
</header>
<div class="flex flex-row w-full h-full">
  <div class="flex-col w-full basis-2/3">
    <Flow {nodes} {edges} />
  </div>

  <Card>
    {#each [{ text: 'test', icon: 'mdi:file' }] as obj}
      <IconCardRow {...obj} />
    {/each}
  </Card>
</div>
