<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;
  export let data: $$Props['data'];
</script>

<div class="px-4 py-2 rounded-md shadow-md bg-overlay0">
  <div class="flex">
    <div class="flex items-center justify-center w-12 h-12 rounded-full bg-overlay1">
      {data.emoji}
    </div>
    <div class="ml-2">
      <div class="text-lg font-bold">{data.name}</div>
      <div>{data.job}</div>
    </div>
  </div>
  <Handle type="target" position={Position.Top} class="!w-16 !bg-sky !rounded-none !border-none" />
  <Handle
    type="source"
    position={Position.Bottom}
    class="!w-16 !bg-sky !rounded-none !border-none"
  />
</div>
