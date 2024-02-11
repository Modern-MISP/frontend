<script lang="ts">
  import type { components } from '$lib/api/misp';
  import { Position, Handle, type NodeProps } from '@xyflow/svelte';
  import Icon from '@iconify/svelte';

  type $$Props = NodeProps<
    Pick<
      components['schemas']['Object'],
      'id' | 'uuid' | 'event_id' | 'distribution' | 'name' | 'description' | 'comment'
    >
  >;

  export let data: $$Props['data'];

  const { id, name, comment } = data;
</script>

<!--
  @component
  
  A node representing a generic event graph object node.
-->

<div
  id={'object-' + id}
  class="px-4 py-2 shadow-md rounded-md bg-surface0"
  title={name + ' : ' + comment}
>
  <div class="flex">
    <div class="rounded-full w-12 h-12 flex justify-center items-center bg-surface1">
      <Icon icon="mdi:web" />
    </div>
    <div class="ml-2">
      <div class="font-bold truncate max-w-28">{name}</div>
      <div class="text-surface2 font-bold truncate max-w-28">{comment}</div>
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
