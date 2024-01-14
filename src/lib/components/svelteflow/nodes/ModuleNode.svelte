<script lang="ts">
  import BaseNode from '$lib/components/svelteflow/nodes/BaseNode.svelte';
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  /** Node properties */
  export let data: $$Props['data'];
</script>

<!--
  @component
  
  A node representing a workflow module.
-->
<BaseNode {...data}>
  <div class="flex">
    {data.label}
  </div>
  <Handle
    type="target"
    position={Position.Left}
    class="w-16 !bg-teal-500 rounded-none border-none"
  />
</BaseNode>