<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import { writable, type Writable } from 'svelte/store';
  import type { Node, Edge } from '@xyflow/svelte';
  import Flow from '$lib/components/svelteflow/Flow.svelte';

  /** The data that will be displayed on this page. */
  export let data;

  const { trigger, infoHeader } = data;
  const wfData = trigger.Workflow?.data ?? {};

  console.log(trigger);

  const nodes: Writable<Node[]> = writable([
    {
      id: '1',
      type: 'trigger',
      data: { label: wfData[1].data.name },
      position: { x: wfData[1].pos_x, y: wfData[1].pos_y }
    }
  ]);

  const edges: Writable<Edge[]> = writable([]);

  for (let i = 2; ; i++) {
    const module = wfData[i];
    if (!module) {
      break;
    }
    $nodes.push({
      id: `${i}`,
      type: 'module',
      data: { label: module.name },
      position: { x: module.pos_x, y: module.pos_y }
    });
    $edges.push({
      id: `1-${i}`,
      type: 'default',
      source: '1',
      target: `${i}`,
      label: 'triggers'
    });
  }
</script>

<!--
  @component
  
  All the information about a specific workflow trigger,
  including an interactive node-based diagram for visualizing the workflow.
-->
<div class="flex flex-row">
  <div class="flex-col basis-1/3">
    <DynCard header={infoHeader} data={trigger} />
  </div>
  <div class="flex-col w-full basis-2/3">
    <Flow {nodes} {edges} />
  </div>
</div>
