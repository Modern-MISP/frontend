<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import { writable, type Writable } from 'svelte/store';
  import type { PageData } from './$types';
  import type { Node, Edge } from '@xyflow/svelte';
  import Flow from '$lib/components/svelteflow/Flow.svelte';

  export let data: PageData;

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
      position: { x: module.pos_x, y: module.pos_y },
      class: '!bg-surface1',
    });
    $edges.push({
      id: `1-${i}`,
      type: 'default',
      source: '1',
      target: `${i}`,
      label: 'triggers'
    })
  }
</script>

<div class="flex flex-row">
  <div class="flex-col basis-1/3">
    <DynCard header={infoHeader} data={trigger} />
  </div>
  <div class="flex-col w-full basis-2/3">
    <Flow {nodes} {edges}></Flow>
  </div>
</div>
