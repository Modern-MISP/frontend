<script lang="ts">
  import { Position, Handle, type NodeProps } from '@xyflow/svelte';
  import BaseNode from '$lib/components/svelteflow/BaseNode.svelte';

  type $$Props = NodeProps;

  interface Props {
    /** Node id */
    id: $$Props['id'];
    /** Node data */
    data: $$Props['data'];
    /** Node drag handle */
    dragHandle: $$Props['dragHandle'];
    /** Node type */
    type?: $$Props['type'];
    /** Node selected */
    selected?: $$Props['selected'];
    /** Node is connectable */
    isConnectable?: $$Props['isConnectable'];
    /** Node z index */
    zIndex?: $$Props['zIndex'];
    /** Node width */
    width?: $$Props['width'];
    /** Node height */
    height?: $$Props['height'];
    /** Node dragging */
    dragging: $$Props['dragging'];
    /** Node target position */
    targetPosition?: $$Props['targetPosition'];
    /** Node source position */
    sourcePosition?: $$Props['sourcePosition'];
    /** Node absolute x position */
    positionAbsoluteX: $$Props['positionAbsoluteX'];
    /** Node absolute y position */
    positionAbsoluteY: $$Props['positionAbsoluteY'];
  }

  let {
    id,
    data,
    dragHandle,
    type = 'category',
    selected = undefined,
    isConnectable = undefined,
    zIndex = undefined,
    width = undefined,
    height = undefined,
    dragging,
    targetPosition = undefined,
    sourcePosition = undefined,
    positionAbsoluteX,
    positionAbsoluteY
  }: Props = $props();
</script>

<!--
  @component

  A node representing a generic event graph category node.
-->

<BaseNode
  {id}
  {data}
  {dragHandle}
  {type}
  {selected}
  {isConnectable}
  {zIndex}
  {width}
  {height}
  {dragging}
  {targetPosition}
  {sourcePosition}
  {positionAbsoluteX}
  {positionAbsoluteY}
  class=""
>
  {data.label}
  <Handle type="target" position={Position.Left} />
  <Handle type="source" position={Position.Right} />
</BaseNode>
