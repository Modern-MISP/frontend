<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import {
    type Node,
    useSvelteFlow,
    type NodeTypes,
    useStore,
    ControlButton
  } from '@xyflow/svelte';
  import Flow from '$lib/components/svelteflow/Flow.svelte';
  import ModuleInfo from './ModuleInfo.svelte';
  import { mode } from '$lib/stores';
  import Card from '$lib/components/card/Card.svelte';
  import ModuleCard from './ModuleCard.svelte';
  import { fly } from 'svelte/transition';
  import type { Module } from '../modules/module';
  import type { ModuleNodeData, WorkflowData } from '../workflow';
  import { constructWorkflowData, generateFlowContent, updateFrame } from './utils';
  import { writable } from 'svelte/store';
  import { objectEntries } from 'ts-extras';
  import { cloneDeep, debounce, range } from 'lodash-es';
  import { actionBar, lockEditMode } from '$lib/actions';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import ModuleNode from './ModuleNode.svelte';
  import FrameNode from './FrameNode.svelte';
  import ContextMenu from './ContextMenu.svelte';
  import Icon from '@iconify/svelte';
  import { createTooltip, melt } from '@melt-ui/svelte';
  import type { ComponentProps } from 'svelte';
  import { invalidateAll } from '$app/navigation';

  /** The data that will be displayed on this page. */
  export let data;

  const svelteFlow = useSvelteFlow();

  let { workflow } = data;
  let wfData = workflow.data!;
  let originalWfData = cloneDeep(wfData);
  let modifiedWfData = wfData;
  let isModified = false;

  const _generatedFlowContent = generateFlowContent(wfData, { onNodeUpdate });
  const nodes = writable(_generatedFlowContent.nodes);
  const edges = writable(_generatedFlowContent.edges);

  $: {
    // handle invalidateAll
    workflow = data.workflow;
    wfData = workflow.data!;
    originalWfData = cloneDeep(wfData);
    modifiedWfData = wfData;
    const _generatedFlowContent = generateFlowContent(wfData, { onNodeUpdate });
    $nodes = _generatedFlowContent.nodes;
    $edges = _generatedFlowContent.edges;
    updateAllFrames();
  }

  $: modifiedWfData = constructWorkflowData(wfData, $nodes, $edges) ?? modifiedWfData;
  $: isModified = JSON.stringify(originalWfData) !== JSON.stringify(modifiedWfData);

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

    menu = undefined;
  }

  function onPaneClick() {
    nodeContext = null;
    menu = undefined;
  }

  // Idk why this works with `setTimeout` but not with `onMount` (not even with `await tick()` in the `onMount`),
  // or when adding the frames in the first place, but apparently it works.
  const updateAllFrames = () => {
    $nodes
      .filter((n) => n.type === 'frame')
      .forEach((n) => svelteFlow.updateNode(...updateFrame($nodes, n)));
  };
  setTimeout(updateAllFrames, 1000);

  function onDragOver(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }

    menu = undefined;
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

  const applyGraphCheck = debounce(async () => {
    const checkResult = await data.checkGraph(() => constructWorkflowData(wfData, $nodes, $edges));
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
  }, 500);

  function cancelEdit() {
    if (!isModified) {
      $mode = 'view';
      return;
    }
    if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
      $mode = 'view';
      invalidateAll();
    }
  }

  function getWorkflowActions(saveData: WorkflowData): ActionBarEntryProps[] {
    return [
      {
        icon: 'mdi:cancel',
        label: 'Cancel',
        class: 'text-red',
        action: cancelEdit
      },
      {
        icon: 'material-symbols:save-outline-rounded',
        label: 'Save',
        class: 'text-green',
        action: () => data.saveWorkflow(workflow.name ?? '', workflow.description ?? '', saveData),
        disabled: !isModified
      },
      {
        icon: workflow.debug_enabled ? 'mdi:bug-check' : 'mdi:bug',
        label: 'Debug',
        class: workflow.debug_enabled ? 'text-green' : 'text-text',
        action: () => data.toggleDebug(!(workflow.debug_enabled ?? false))
      }
    ];
  }

  let menu: ComponentProps<ContextMenu> | undefined;

  const { domNode, width, height, viewport } = useStore();

  viewport.subscribe(() => {
    menu = undefined;
  });

  function calcContextMenuPosition(event: MouseEvent | TouchEvent, element: HTMLDivElement) {
    const { clientX, clientY } = 'touches' in event ? event.touches[0] : event;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.x;
    const y = clientY - rect.y;

    return {
      top: y < $height - 200 ? y : undefined,
      left: x < $width - 200 ? x : undefined,
      right: x >= $width - 200 ? $width - x : undefined,
      bottom: y >= $height - 200 ? $height - y : undefined
    };
  }

  function onNodeContextMenu({ detail: { event, node } }: Flow['$$events_def']['nodecontextmenu']) {
    event.preventDefault();

    if ($mode !== 'edit' || node.type === 'frame' || !$domNode) return;

    menu = {
      id: node.id,
      type: 'node',
      ...calcContextMenuPosition(event, $domNode)
    };
  }

  function onEdgeContextMenu({ detail: { event, edge } }: Flow['$$events_def']['edgecontextmenu']) {
    event.preventDefault();

    if ($mode !== 'edit' || !$domNode) return;

    menu = {
      id: edge.id,
      type: 'edge',
      ...calcContextMenuPosition(event, $domNode)
    };
  }

  function onDrag() {
    menu = undefined;
  }

  // reactively check graph when edges change
  $: {
    $edges;
    applyGraphCheck();
  }
  const nodeTypes: NodeTypes = {
    trigger: ModuleNode,
    action: ModuleNode,
    logic: ModuleNode,
    frame: FrameNode
  };

  const {
    elements: { content: helpContent, trigger: helpTrigger }
  } = createTooltip({
    positioning: { placement: 'left' },
    portal: '#layout',
    openDelay: 0
  });
</script>

<!--
  @component
  
  All the information about a specific workflow,
  including an interactive node-based diagram for visualization.
-->
<svelte:window use:actionBar={getWorkflowActions(modifiedWfData)} use:lockEditMode={isModified} />
<div class="flex flex-row h-full">
  <div class="flex flex-col max-w-md gap-1">
    {#if $mode === 'view'}
      <div class="flex-row basis-full">
        <DynCard header={data.infoHeader} data={workflow} />
      </div>
      {#if nodeContext}
        <div class="flex-row">
          <ModuleInfo data={nodeContext} />
        </div>
      {/if}
    {:else}
      <div in:fly={{ x: -200 }} class="overflow-auto">
        <Card class="flex flex-col">
          {#await data.moduleData}
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
      {nodeTypes}
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
      on:nodecontextmenu={onNodeContextMenu}
      on:edgecontextmenu={onEdgeContextMenu}
      on:drag={onDrag}
    >
      <div slot="controls" use:melt={$helpTrigger}>
        <ControlButton><Icon icon="mdi:help"></Icon></ControlButton>
      </div>
      {#if menu}
        <ContextMenu {...menu} on:close={() => (menu = undefined)}></ContextMenu>
      {/if}
    </Flow>
  </div>
</div>

<div use:melt={$helpContent} class="z-10 shaodw shadow-black">
  <Card>
    <p>Left-Click and Drag on Background: Drag View</p>
    <p>Left-Click and Drag on Node: Drag Node (Edit Mode only)</p>
    <p>Left-Click and Drag on Handle: Create Connection (Edit Mode only)</p>
    <p>Right-Click on Node: Context Menu (Edit Mode only)</p>
  </Card>
</div>
