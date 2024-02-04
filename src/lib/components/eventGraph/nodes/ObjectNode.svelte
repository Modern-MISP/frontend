<script lang="ts">
  import type { components } from '$lib/api/misp';
  import { Position, Handle, type NodeProps } from '@xyflow/svelte';
  import Icon from '@iconify/svelte';

  type $$Props = NodeProps<
    Pick<components['schemas']['Object'], 'id' | 'name'>
  >;

  export let data: $$Props['data'];

  const { id, name } = data;

</script>

<!-- <Handle type="target" position={Position.Left} />
<Pill label={id} text={name} icon="mdi:web"></Pill> -->

<div class="px-4 py-2 shadow-md rounded-md bg-surface0 border-2 border-stone-400">
  <div class="flex">
    <div class="rounded-full w-12 h-12 flex justify-center items-center bg-surface1">
      <Icon icon="mdi:web" />
    </div>
    <div class="ml-2">
      <div class="text-lg font-bold">{name}</div>
      <div class="text-gray-500">{id}</div>
    </div>
  </div>
  <Handle
    type="target"
    position={Position.Left}
    class="w-16 !bg-teal-500 rounded-none border-none"
  />
  <Handle
    type="source"
    position={Position.Right}
    class="w-16 !bg-teal-500 rounded-none border-none"
  />
</div>