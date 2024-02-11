<script lang="ts">
  import type { components } from '$lib/api/misp';
  import { Position, Handle, type NodeProps } from '@xyflow/svelte';
  import HrefPill from '../../pills/hrefPill/HrefPill.svelte';

  type $$Props = NodeProps<
    Pick<
      components['schemas']['Attribute'],
      | 'id'
      | 'uuid'
      | 'event_id'
      | 'object_id'
      | 'object_relation'
      | 'category'
      | 'type'
      | 'distribution'
      | 'value'
      | 'comment'
    >
  >;

  export let data: $$Props['data'];

  const { id, type, value } = data;
</script>

<!--
  @component
  
  A node representing a generic event graph attribute node.
-->

<div id={'attribute-' + id} class="rounded-md bg-surface0" title={type + ' : ' + value}>
  <Handle type="target" position={Position.Left} />
  <HrefPill label={type} text={value} icon="mdi:flag" href={`/attributes/${id}`}></HrefPill>
</div>
