<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import IconCardRow from '$lib/components/eventGraph/IconCardRow.svelte';
  import Flow from '$lib/components/svelteflow/Flow.svelte';
  import Icon from '@iconify/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable, type Writable } from 'svelte/store';
  const nodes: Writable<Node[]> = writable([]);

  const edges: Writable<Edge[]> = writable([]);

  // TODO: fix lint error properly
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let tableView: 'objects' | 'attributes' = 'objects';

  type Event = Record<string, unknown>;

  /**
   * The Event to be displayed on this page.
   */
  // TODO: fix lint error properly
  // eslint-disable-next-line svelte/valid-compile
  export let event: Event;

  event;
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
    <Card>
      <Icon icon="mdi:show" />
    </Card>
    <Card>
      <Icon icon="mdi:hide" />
    </Card>
    <Card>
      <Icon icon="bx:expand" />
    </Card>
    <Card>
      <Icon icon="bx:collapse" />
    </Card>
    <Card>
      <Icon icon="mdi:edit" />
    </Card>
    <Card>
      <Icon icon="bx:duplicate" />
    </Card>
    <Card>
      <Icon icon="mdi:delete" />
    </Card>
    

  </div>
  <div class="flex gap-4 shrink-0">
    <Card>Unreferenced Objects</Card>
    <Card>Unreferenced Attributes</Card>
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
