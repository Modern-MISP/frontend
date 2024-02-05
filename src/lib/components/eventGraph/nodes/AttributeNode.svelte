<script lang="ts">
  import type { components } from '$lib/api/misp';
  import { Position, Handle, type NodeProps } from '@xyflow/svelte';
  import HrefPill from '../../pills/hrefPill/HrefPill.svelte';

  type $$Props = NodeProps<
    Pick<components['schemas']['Attribute'], 'type' | 'value' | 'category' | 'id' | 'comment'>
  >;

  export let data: $$Props['data'];

  const { id, category, type, value, comment } = data;

</script>

<Handle type="target" position={Position.Left} />
<HrefPill label={type} text={value} icon="mdi:flag" href={`/attributes/${id}`}></HrefPill>
