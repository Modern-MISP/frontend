<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import { writable, type Writable } from 'svelte/store';
  import { type Node, type Edge, getNodesBounds, useSvelteFlow } from '@xyflow/svelte';
  import Flow from '$lib/components/svelteflow/Flow.svelte';
  import type { Trigger } from '../triggers/trigger.js';
  import { objectEntries } from 'ts-extras';

  /** The data that will be displayed on this page. */
  export let data;

  const svelteFlow = useSvelteFlow();

  const { infoHeader } = data;
  const workflow = (data.workflow as Trigger['Workflow'])!;
  const wfData = workflow.data!;

  console.log(workflow);

  const nodes: Writable<Node[]> = writable([]);
  const edges: Writable<Edge[]> = writable([]);

  for (const [, module] of objectEntries(wfData).filter(([key]) => key !== '_frames')) {
    $nodes.push({
      id: `${module.id}`,
      type: module.data.module_type, // 'trigger' or 'action'
      data: {
        inputs: Object.keys(module.inputs),
        outputs: Object.keys(module.outputs),
        moduleData: module.data,
        onUpdate: onNodeUpdate
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
          animated: true,
          style: 'stroke-width: 4px'
        });
      }
    }
  }

  for (const frame of Object.values(wfData._frames ?? {})) {
    const node = {
      id: frame.id,
      type: 'frame',
      data: { nodes: frame.nodes, width: 0, height: 0, label: frame.text },
      position: { x: 0, y: 0 },
      zIndex: -100,
      draggable: false,
      selectable: false
    };
    $nodes.push(node);
  }

  function updateFrame(frame: Node) {
    const padding = 20;
    const additionalLabelPadding = 30;

    const children = $nodes.filter((n) => frame.data.nodes.includes(n.id));
    const bounds = getNodesBounds(children);

    frame.position.x = bounds.x - padding;
    frame.position.y = bounds.y - padding - additionalLabelPadding;
    frame.width = bounds.width + 2 * padding;
    frame.height = bounds.height + 2 * padding + additionalLabelPadding;
    svelteFlow.updateNode(frame.id, frame);
  }

  async function onNodeUpdate(nodeId: string) {
    $nodes.forEach((frameNode) => {
      if (frameNode.type === 'frame' && frameNode.data.nodes.includes(nodeId)) {
        updateFrame(frameNode);
      }
    });
  }

  function onNodeDrag({ detail: { node } }: Flow['$$events_def']['nodedrag']) {
    onNodeUpdate(node.id);
  }

  // Idk why this works with `setTimeout` but not with `onMount` (not even with `await tick()` in the `onMount`),
  // or when adding the frames in the first place, but apparently it works.
  // TODO: (Optional) Find out why this happens?
  setTimeout(() => $nodes.filter((n) => n.type === 'frame').forEach(updateFrame), 1000);
</script>

<!--
  @component
  
  All the information about a specific workflow,
  including an interactive node-based diagram for visualization.
-->
<div class="flex flex-row h-full">
  <div class="flex-col">
    <DynCard header={infoHeader} data={workflow} />
  </div>
  <div class="flex-col w-full h-full basis-full">
    <Flow {nodes} {edges} on:nodedrag={onNodeDrag} />
  </div>
</div>
