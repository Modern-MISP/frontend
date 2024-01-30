<script lang="ts">
  import type { NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  /** Node id */
  export let id: $$Props['id'];
  id;
  /** Node data */
  export let data: $$Props['data'];
  data;
  /** Node drag handle */
  export let dragHandle: $$Props['dragHandle'] = undefined;
  dragHandle;
  /** Node type */
  export let type: $$Props['type'] = undefined;
  type;
  /** Node selected */
  export let selected: $$Props['selected'] = undefined;
  selected;
  /** Node is connectable */
  export let isConnectable: $$Props['isConnectable'] = undefined;
  isConnectable;
  /** Node z index */
  export let zIndex: $$Props['zIndex'] = undefined;
  zIndex;
  /** Node width */
  export let width: $$Props['width'] = undefined;
  width;
  /** Node height */
  export let height: $$Props['height'] = undefined;
  height;
  /** Node dragging */
  export let dragging: $$Props['dragging'];
  dragging;
  /** Node target position */
  export let targetPosition: $$Props['targetPosition'] = undefined;
  targetPosition;
  /** Node source position */
  export let sourcePosition: $$Props['sourcePosition'] = undefined;
  sourcePosition;
  /** Node absolute x position */
  export let positionAbsoluteX: $$Props['positionAbsoluteX'];
  positionAbsoluteX;
  /** Node absolute y position */
  export let positionAbsoluteY: $$Props['positionAbsoluteY'];
  positionAbsoluteY;
</script>

<!--
  @component
  
  The base component for all custom diagram nodes.
  Other custom node types should use this as their container.
-->
<div class="px-4 py-2 rounded-md shadow-md bg-surface1">
  <slot />
</div>
