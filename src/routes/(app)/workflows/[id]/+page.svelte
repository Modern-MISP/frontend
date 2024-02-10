<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import { type Node, useSvelteFlow } from '@xyflow/svelte';
  import Flow from '$lib/components/svelteflow/Flow.svelte';
  import ModuleInfo from './ModuleInfo.svelte';
  import { mode } from '$lib/stores';
  import Card from '$lib/components/card/Card.svelte';
  import ModuleCard from './ModuleCard.svelte';
  import { fly } from 'svelte/transition';
  import type { Module } from '../modules/module';
  import type { ModuleNodeData, Workflow } from '../workflow';
  import { constructWorkflowData, generateFlowContent, updateFrame } from './utils';
  import { writable } from 'svelte/store';
  import { objectEntries } from 'ts-extras';
  import { range } from 'lodash-es';
  import { actionBar } from '$lib/actions';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';

  /** The data that will be displayed on this page. */
  export let data;

  const svelteFlow = useSvelteFlow();

  const { infoHeader, moduleData, checkGraph } = data;
  const workflow = (data.workflow as Workflow)!;
  const wfData = workflow.data!;

  console.log(workflow);

  const _generatedFlowContent = generateFlowContent(wfData, onNodeUpdate);
  const nodes = writable(_generatedFlowContent.nodes);
  const edges = writable(_generatedFlowContent.edges);

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

  async function onNodeUpdate(nodeId: string) {
    $nodes.forEach((frameNode) => {
      if (frameNode.type === 'frame' && frameNode.data.nodes.includes(nodeId)) {
        svelteFlow.updateNode(...updateFrame($nodes, frameNode));
      }
    });
  }

  function onNodeDrag({ detail: { node } }: Flow['$$events_def']['nodedrag']) {
    onNodeUpdate(node.id);
  }

  let nodeContext: ModuleNodeData | null = null;
  function onNodeClick({ detail: { node } }: Flow['$$events_def']['nodeclick']) {
    if (node.type !== 'frame') {
      nodeContext = node.data.moduleData;
    } else {
      nodeContext = null;
    }
  }

  function onPaneClick() {
    nodeContext = null;
  }

  // Idk why this works with `setTimeout` but not with `onMount` (not even with `await tick()` in the `onMount`),
  // or when adding the frames in the first place, but apparently it works.
  // TODO: (Optional) Find out why this happens?
  setTimeout(
    () =>
      $nodes
        .filter((n) => n.type === 'frame')
        .forEach((n) => svelteFlow.updateNode(...updateFrame($nodes, n))),
    1000
  );

  function onDragOver(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();

    if (!event.dataTransfer) {
      return null;
    }

    const newModule: Module = JSON.parse(event.dataTransfer.getData('application/svelteflow'));

    const position = svelteFlow.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    });

    const emptyAnyputs = (count: number, id: (i: number) => string) => {
      return range(1, count + 1).map(id);
    };

    const newId =
      Math.max(...$nodes.filter((n) => n.type !== 'frame').map((n) => Number.parseInt(n.id))) + 1;
    const newNode = {
      id: `${newId}`,
      type: newModule.module_type,
      position,
      data: {
        inputs: emptyAnyputs(newModule.inputs ?? 0, (i) => `input_${i}`),
        outputs: emptyAnyputs(newModule.inputs ?? 0, (i) => `output_${i}`),
        moduleData: {
          id: newModule.id,
          name: newModule.name,
          module_type: newModule.module_type,
          indexed_params: []
        } as ModuleNodeData,
        onUpdate: onNodeUpdate
      },
      origin: [0.5, 0.0]
    } satisfies Node;

    $nodes.push(newNode);
    $nodes = $nodes;
  }

  async function applyGraphCheck() {
    const checkResult = await checkGraph(() => constructWorkflowData(wfData, $nodes, $edges));
    if (checkResult.multiple_output_connection.has_multiple_output_connection) {
      const nodesWithBadEdges = checkResult.multiple_output_connection.edges;
      if (Array.isArray(nodesWithBadEdges)) return;
      for (const [sourceNode, targetNodes] of objectEntries(nodesWithBadEdges)) {
        // need to use the svelteflow getter for edges to actually update
        const badEdges = svelteFlow.getEdges(
          $edges
            .filter(
              (e) =>
                e.source === sourceNode && targetNodes.map((n) => n.toString()).includes(e.target)
            )
            .map((e) => e.id)
        );
        badEdges.forEach((e) => {
          e.style = 'stroke: red; stroke-width: 4px;';
          e.animated = false;
        });
      }
    }
  }

  const workflowActions: ActionBarEntryProps[] = [
    {
      icon: 'material-symbols:save-outline-rounded',
      label: 'Save',
      class: 'text-green',
      action: () => {}
    },
    {
      icon: workflow.debug_enabled ? 'mdi:bug-check' : 'mdi:bug',
      label: 'Debug',
      class: workflow.debug_enabled ? 'text-green' : 'text-text',
      action: () => {}
    }
  ];

  // reactively check graph when edges change
  $: {
    $edges;
    applyGraphCheck();
  }
</script>

<!--
  @component
  
  All the information about a specific workflow,
  including an interactive node-based diagram for visualization.
-->
<svelte:window use:actionBar={workflowActions} />
<div class="flex flex-row h-full">
  <div class="flex flex-col max-w-md gap-1">
    {#if $mode === 'view'}
      <div class="flex-row basis-full">
        <DynCard header={infoHeader} data={workflow} />
      </div>
      {#if nodeContext}
        <div class="flex-row">
          <ModuleInfo data={nodeContext} />
        </div>
      {/if}
    {:else}
      <div in:fly={{ x: -200 }} class="overflow-auto">
        <Card class="flex flex-col">
          {#await moduleData}
            Loading
          {:then modules}
            {#each modules as module}
              <div class="flex-row">
                <ModuleCard {module} />
              </div>
            {/each}
          {/await}
        </Card>
      </div>
    {/if}
  </div>
  <div class="flex-col w-full h-full basis-full">
    <Flow
      {nodes}
      {edges}
      defaultEdgeOptions={{
        animated: true,
        style: 'stroke-width: 4px'
      }}
      on:nodedrag={onNodeDrag}
      on:nodeclick={onNodeClick}
      on:paneclick={onPaneClick}
      on:dragover={onDragOver}
      on:drop={onDrop}
    />
  </div>
</div>
