<script lang="ts">
  import { type NodeProps } from '@xyflow/svelte';

  id;

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

  interface Props {
    /** Node id */
    id: NodeProps['id'];
    /** Node properties */
    data: NodeProps['data'];
    /** Node drag handle */
    dragHandle: NodeProps['dragHandle'];
    /** Node type */
    type: NodeProps['type'];
    /** Node selected */
    selected: NodeProps['selected'];
    /** Node is connectable */
    isConnectable: NodeProps['isConnectable'];
    /** Node z index */
    zIndex: NodeProps['zIndex'];
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
  }

  let {
    id,
    data,
    dragHandle,
    type,
    selected,
    isConnectable,
    zIndex,
    width = undefined,
    height = undefined,
    dragging,
    targetPosition = undefined,
    sourcePosition = undefined,
    positionAbsoluteX,
    positionAbsoluteY
  }: Props = $props();
  positionAbsoluteY;
</script>

<!--
  @component

  A node representing a workflow frame.
-->
<div class="w-full h-full border-2 opacity-50 bg-ctp-surface0">
  <span class="bg-ctp-surface2 text-ctp-text">{data.label}</span>
</div>
