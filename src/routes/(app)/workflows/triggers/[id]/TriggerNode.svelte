<script lang="ts">
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  
    type $$Props = NodeProps;
    export let data: $$Props['data'];
  </script>
  
  <div class="px-4 py-2 shadow-md rounded-md bg-surface1">
    <div class="flex">
      {data.label}
    </div>
    <Handle
      type="target"
      position={Position.Top}
      class="w-16 !bg-teal-500 rounded-none border-none"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      class="w-16 !bg-teal-500 rounded-none border-none"
    />
  </div>