<script lang="ts">
  import type { NodeProps } from '@xyflow/svelte';

  /** Node id */
  export let id: NodeProps['id'];
  id;
  /** Node data */
  export let data: NodeProps['data'];
  data;
  /** Node drag handle */
  export let dragHandle: NodeProps['dragHandle'] = undefined;
  dragHandle;
  /** Node type */
  export let type: NodeProps['type'] = undefined;
  type;
  /** Node selected */
  export let selected: NodeProps['selected'] = undefined;
  selected;
  /** Node is connectable */
  export let isConnectable: NodeProps['isConnectable'] = undefined;
  isConnectable;
  /** Node z index */
  export let zIndex: NodeProps['zIndex'] = undefined;
  zIndex;
  /** Node width */
  export let width: NodeProps['width'] = undefined;
  width;
  /** Node height */
  export let height: NodeProps['height'] = undefined;
  height;
  /** Node dragging */
  export let dragging: NodeProps['dragging'];
  dragging;
  /** Node target position */
  export let targetPosition: NodeProps['targetPosition'] = undefined;
  targetPosition;
  /** Node source position */
  export let sourcePosition: NodeProps['sourcePosition'] = undefined;
  sourcePosition;
  /** Node absolute x position */
  export let positionAbsoluteX: NodeProps['positionAbsoluteX'];
  positionAbsoluteX;
  /** Node absolute y position */
  export let positionAbsoluteY: NodeProps['positionAbsoluteY'];
  positionAbsoluteY;

  let clazz: string = '';

  /** Additional classes applied to outer div. */
  export { clazz as class };
</script>

<!--
  @component
  
  The base component for all custom diagram nodes.
  Other custom node types should use this as their container.
-->
<div class="px-4 py-2 rounded-md shadow-md bg-surface1 {clazz}">
  <slot />
</div>
