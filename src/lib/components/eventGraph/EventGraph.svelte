<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import IconCardRow from '$lib/components/eventGraph/IconCardRow.svelte';
  import Flow from '$lib/components/svelteflow/Flow.svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable, type Writable } from 'svelte/store';
  import CardRow from '../card/CardRow.svelte';
  import IconCard from './IconCard.svelte';
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

    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="mdi:magnify" text="Details" />
    </CardRow>

    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="mdi:show" text="Show" />
      <IconCard icon="mdi:hide" text="Hide" class="!text-red" />
    </CardRow>

    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="bx:expand" text="Expand" />
      <IconCard icon="bx:collapse" text="Collapse" class="!text-red" />
    </CardRow>

    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="mdi:edit" text="Edit" />
      <IconCard icon="bx:duplicate" text="Duplicate" />
      <IconCard icon="mdi:delete" text="Delete" class="!text-red" />
    </CardRow>
    

  </div>
  <div class="flex gap-4 shrink-0">
    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="mdi:web" text="Unreferenced Objects" />
      <IconCard icon="mdi:flag" text="Unreferenced Attributes" />
    </CardRow>
  </div>
</header>
<div class="flex flex-row w-full h-full">
  <div class="flex-col w-full">
    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="mdi:web-plus" text="Add Object" />
      <IconCard icon="mdi:flag-add" text="Add Attribute" />
      <IconCard icon="icon-park-outline:connection" text="Add Reference" />
    </CardRow>
    <Flow {nodes} {edges} />
  </div>

  <Card>
    {#each [{ text: 'test', icon: 'mdi:file' }, { text: 'test 2', icon: 'mdi:server' }] as obj}
      <IconCardRow {...obj} />
    {/each}
  </Card>
</div>
