<script lang="ts">
  import { SvelteFlow, Background, BackgroundVariant, Controls, type Node, type Edge } from '@xyflow/svelte';
  import TriggerNode from './nodes/TriggerNode.svelte';
  import type { Writable } from 'svelte/store';
  import ModuleNode from './nodes/ModuleNode.svelte';

  /** Nodes that are rendered on the flow */
  export let nodes: Writable<Node[]>;
  
  /** Edges that are rendered on the flow */
  export let edges: Writable<Edge[]>;

  const nodeTypes = {
    trigger: TriggerNode,
    module: ModuleNode,
  }
  
  /** Dimensions of the grid that nodes will snap onto */
  export let snapGrid: [number, number] = [25, 25];
</script>


<SvelteFlow {nodes} {edges} {snapGrid} {nodeTypes} fitView on:nodeclick class="text-text">
  <div class="!text-base">
    <Background
      class="!bg-base"
      variant={BackgroundVariant.Dots}
      size={2} />
    <Controls position="top-right"></Controls>
    <slot></slot>
  </div>
</SvelteFlow>

<style lang="postcss">
  :global(:root) {
      --minimap-background-color-props: theme('colors.current');
  }
</style>
  