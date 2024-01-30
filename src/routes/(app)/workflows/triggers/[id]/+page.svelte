<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import { writable, type Writable } from 'svelte/store';
  import type { PageData } from './$types';
  import { type Node, type Edge, getNodesBounds } from '@xyflow/svelte';
  import Flow from '$lib/components/svelteflow/Flow.svelte';

  /** The data that will be displayed on this page. */
  export let data: PageData;

  const { trigger, infoHeader } = data;
  const wfData = trigger.Workflow?.data ?? {};

  console.log(trigger);

  const nodes: Writable<Node[]> = writable([]);
  const edges: Writable<Edge[]> = writable([]);

  for (const [, module] of Object.entries(wfData).filter(([key]) => key !== '_frames')) {
    $nodes.push({
      id: `${module.id}`,
      type: module.data.module_type,  // 'trigger' or 'action'
      data: {
        label: module.name,
        inputs: Object.keys(module.inputs),
        outputs: Object.keys(module.outputs)
      },
      position: { x: module.pos_x, y: module.pos_y }
    });
    // create input edges for this module
    for (const [inputName, input] of Object.entries(module.inputs)) {
      for (const connection of input.connections ?? []) {
        $edges.push({
          id: `${connection.node}-${module.id}`,
          type: 'default',
          source: connection.node,
          sourceHandle: connection.input,
          target: `${module.id}`,
          targetHandle: inputName,
          animated: true
        });
      }
    }
  }

  for (const frame of Object.values(wfData._frames)) {
    const node = {
      id: frame.id,
      type: 'frame',
      data: { nodes: frame.nodes, width: 0, height: 0, label: frame.text },
      position: { x: 0, y: 0},
      zIndex: -100,
      draggable: false,
      selectable: false
    }
    $nodes.push(node);
    updateFrame(node);
  }

  console.log($nodes);

  function updateFrame(frame: Node) {
    const padding = 20;
    const additionalLabelPadding = 30;

    const children = $nodes.filter((n) => frame.data.nodes.includes(n.id));
    const bounds = getNodesBounds(children);

    frame.position.x = bounds.x - padding;
    frame.position.y = bounds.y - padding - additionalLabelPadding;
    frame.width = bounds.width + 2*padding;
    frame.height = bounds.height + 2*padding + additionalLabelPadding;
  }

  function onNodeDrag({ detail: { node } }: { detail: { node: Node }}) {
    $nodes.forEach((frameNode) => {
      if (frameNode.type === 'frame' && frameNode.data.nodes.includes(node.id)) {
        updateFrame(frameNode);
      }
    });
    $nodes = $nodes;
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
    <Flow {nodes} {edges} on:nodedrag={onNodeDrag} />
  </div>
</div>
