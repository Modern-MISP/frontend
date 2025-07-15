<script lang="ts">
  import type { NodeProps } from '@xyflow/svelte';

  id;

  data;

  dragHandle;

  type;

  selected;

  isConnectable;

  zIndex;

  width;

  height;

  dragging;

  targetPosition;

  sourcePosition;

  positionAbsoluteX;

  positionAbsoluteY;

  interface Props {
    /** Node id */
    id: NodeProps['id'];
    /** Node data */
    data: NodeProps['data'];
    /** Node drag handle */
    dragHandle: NodeProps['dragHandle'];
    /** Node type */
    type?: NodeProps['type'];
    /** Node selected */
    selected?: NodeProps['selected'];
    /** Node is connectable */
    isConnectable?: NodeProps['isConnectable'];
    /** Node z index */
    zIndex?: NodeProps['zIndex'];
    /** Node width */
    width?: NodeProps['width'];
    /** Node height */
    height?: NodeProps['height'];
    /** Node dragging */
    dragging: NodeProps['dragging'];
    /** Node target position */
    targetPosition?: NodeProps['targetPosition'];
    /** Node source position */
    sourcePosition?: NodeProps['sourcePosition'];
    /** Node absolute x position */
    positionAbsoluteX: NodeProps['positionAbsoluteX'];
    /** Node absolute y position */
    positionAbsoluteY: NodeProps['positionAbsoluteY'];
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    data,
    dragHandle,
    type = undefined,
    selected = undefined,
    isConnectable = undefined,
    zIndex = undefined,
    width = undefined,
    height = undefined,
    dragging,
    targetPosition = undefined,
    sourcePosition = undefined,
    positionAbsoluteX,
    positionAbsoluteY,
    class: clazz = '',
    children
  }: Props = $props();

  /** Additional classes applied to outer div. */
</script>

<!--
  @component

  The base component for all custom diagram nodes.
  Other custom node types should use this as their container.
-->
<div class="px-4 py-2 rounded-md shadow-md bg-ctp-surface0 {clazz}">
  {@render children?.()}
</div>
