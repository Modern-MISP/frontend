<script lang="ts">
  import {
    SvelteFlow,
    Background,
    BackgroundVariant,
    Controls,
    type Node,
    type Edge,
    type DefaultEdgeOptions,
    type NodeTypes
  } from '@xyflow/svelte';
  import type { Writable } from 'svelte/store';
  import { mode } from '$lib/stores';

  /** Nodes that are rendered on the flow */
  export let nodes: Writable<Node[]>;

  /** Edges that are rendered on the flow */
  export let edges: Writable<Edge[]>;

  /**
   * Custom node types to pass to SvelteFlow.
   */
  export let nodeTypes: NodeTypes | undefined = undefined;

  /** Dimensions of the grid that nodes will snap onto */
  export let snapGrid: [number, number] = [25, 25];

  /**
   * Default options to set for edges.
   */
  export let defaultEdgeOptions: DefaultEdgeOptions | undefined = undefined;
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
  on:init
  on:nodeclick
  on:nodedrag
  on:nodedragstop
  on:nodecontextmenu
  on:edgecontextmenu
  on:paneclick
  on:dragover
  on:drop
  {defaultEdgeOptions}
  class="text-text relative"
  nodesDraggable={$mode === 'edit'}
  nodesConnectable={$mode === 'edit'}
  elementsSelectable={$mode === 'edit'}
  proOptions={{ hideAttribution: true }}
>
  <div class="!text-base">
    <Background class="!bg-base" variant={BackgroundVariant.Dots} size={2} />
    <Controls position="top-right" showLock={false}>
      <slot name="controls" />
    </Controls>
    <slot />
  </div>
</SvelteFlow>

<style lang="postcss">
  :global(:root) {
    --minimap-background-color-props: theme('colors.current');
  }
  :global(.svelte-flow__controls-button) {
    background-color: theme('colors.surface1.DEFAULT') !important;
    color: theme('colors.text.DEFAULT') !important;
    border: none !important;
  }
</style>
