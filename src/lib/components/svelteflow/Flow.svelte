<script lang="ts">
  import {
    SvelteFlow,
    Background,
    BackgroundVariant,
    Controls,
    type Node,
    type Edge,
    type NodeTypes
  } from '@xyflow/svelte';
  import TriggerNode from './nodes/TriggerNode.svelte';
  import type { Writable } from 'svelte/store';
  import ModuleNode from './nodes/ModuleNode.svelte';
  import { mode } from '$lib/stores';

  /** Nodes that are rendered on the flow */
  export let nodes: Writable<Node[]>;

  /** Edges that are rendered on the flow */
  export let edges: Writable<Edge[]>;

  let additionalNodeTypes: NodeTypes | undefined = undefined;
  /**
   * Additional nodeTypes to pass to SvelteFlow.
   */
  export { additionalNodeTypes as nodeTypes };

  const nodeTypes = {
    trigger: TriggerNode,
    module: ModuleNode,
    ...(additionalNodeTypes ?? {})
  };

  /** Dimensions of the grid that nodes will snap onto */
  export let snapGrid: [number, number] = [25, 25];
</script>

<!--
  @component
  
  This component contains a node-based editor or interactive diagram provided by
  [SvelteFlow](https://svelteflow.dev/).

  It acts like a canvas.
  All elements, such as nodes, edges and controls, are rendered inside.
-->
<SvelteFlow
  {nodes}
  {edges}
  {snapGrid}
  {nodeTypes}
  fitView
  on:nodeclick
  on:nodedragstop
  class="text-text"
  nodesDraggable={$mode === 'edit'}
  nodesConnectable={$mode === 'edit'}
  elementsSelectable={$mode === 'edit'}
  proOptions={{ hideAttribution: true }}
>
  <div class="!text-base">
    <Background class="!bg-base" variant={BackgroundVariant.Dots} size={2} />
    <Controls position="top-right" showLock={false} />
    <slot />
  </div>
</SvelteFlow>

<style lang="postcss">
  :global(:root) {
    --minimap-background-color-props: theme('colors.current');
  }
</style>
