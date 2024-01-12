<script lang="ts">
  import type { NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  /** Node properties */
  export let data: $$Props['data'];
</script>

<div class="px-4 py-2 shadow-md rounded-md bg-surface1">
  <slot></slot>
</div>