<script lang="ts">
  import BaseNode from '$lib/components/svelteflow/nodes/BaseNode.svelte';
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  /** Node properties */
  export let data: $$Props['data'];

  // TODO: better handle positioning
  const dist = 10;
</script>
  
<!--
  @component
  
  A node representing a generic workflow module.
-->
<BaseNode {...data}>
  <div class="flex">
    {data.label}
  </div>
  {#each data.inputs as inputId, i}
    <Handle
      id={inputId}
      type="target"
      position={Position.Left}
      class="!bg-teal-500 rounded-none border-none"
      style="top: {i * dist + dist}px"
    />
  {/each}
  {#each data.outputs as outputId, i}
    <Handle
      id={outputId}
      type="source"
      position={Position.Right}
      class="!bg-teal-500 rounded-none border-none"
      style="top: {i * dist + dist}px"
    />
  {/each}
</BaseNode>