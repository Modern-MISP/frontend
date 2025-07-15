<script lang="ts">
  import {
    SvelteFlow,
    Background,
    BackgroundVariant,
    Controls,
    type Node,
    type Edge,
    type DefaultEdgeOptions,
    type NodeTypes,
    type EdgeTypes
  } from '@xyflow/svelte';
  import type { Writable } from 'svelte/store';
  import { appState } from '$lib/stores.svelte.ts';

  interface Props {
    /** Nodes that are rendered on the flow */
    nodes: Writable<Node[]>;
    /** Edges that are rendered on the flow */
    edges: Writable<Edge[]>;
    /**
     * Custom node types to pass to SvelteFlow.
     */
    nodeTypes?: NodeTypes | undefined;
    /**
     * Custom edge types to pass to SvelteFlow.
     */
    edgeTypes?: EdgeTypes | undefined;
    /** Dimensions of the grid that nodes will snap onto */
    snapGrid?: [number, number];
    /**
     * Default options to set for edges.
     */
    defaultEdgeOptions?: DefaultEdgeOptions | undefined;
    controls?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  }

  let {
    nodes,
    edges,
    nodeTypes = undefined,
    edgeTypes = undefined,
    snapGrid = [25, 25],
    defaultEdgeOptions = undefined,
    controls,
    children
  }: Props = $props();
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
  {edgeTypes}
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
  class="text-ctp-text relative"
  nodesDraggable={appState.mode === 'edit'}
  nodesConnectable={appState.mode === 'edit'}
  elementsSelectable={appState.mode === 'edit'}
  proOptions={{ hideAttribution: true }}
>
  <div class="text-base!">
    <Background class="bg-ctp-base!" variant={BackgroundVariant.Dots} size={2} />
    <Controls position="top-right" showLock={false}>
      {@render controls?.()}
    </Controls>
    {@render children?.()}
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
