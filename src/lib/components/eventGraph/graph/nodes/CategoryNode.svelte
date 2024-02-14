<script lang="ts">
  import { Position, Handle, type NodeProps } from '@xyflow/svelte';
  import BaseNode from '$lib/components/svelteflow/BaseNode.svelte';

  type $$Props = NodeProps;

  /** Node id */
  export let id: $$Props['id'];
  /** Node data */
  export let data: $$Props['data'];
  /** Node drag handle */
  export let dragHandle: $$Props['dragHandle'];
  /** Node type */
  export let type: $$Props['type'] = 'category';
  /** Node selected */
  export let selected: $$Props['selected'] = undefined;
  /** Node is connectable */
  export let isConnectable: $$Props['isConnectable'] = undefined;
  /** Node z index */
  export let zIndex: $$Props['zIndex'] = undefined;
  /** Node width */
  export let width: $$Props['width'] = undefined;
  /** Node height */
  export let height: $$Props['height'] = undefined;
  /** Node dragging */
  export let dragging: $$Props['dragging'];
  /** Node target position */
  export let targetPosition: $$Props['targetPosition'] = undefined;
  /** Node source position */
  export let sourcePosition: $$Props['sourcePosition'] = undefined;
  /** Node absolute x position */
  export let positionAbsoluteX: $$Props['positionAbsoluteX'];
  /** Node absolute y position */
  export let positionAbsoluteY: $$Props['positionAbsoluteY'];
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
