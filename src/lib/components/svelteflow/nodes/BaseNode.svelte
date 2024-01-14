<script lang="ts">
  import type { NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  /** Node properties */
  export let data: $$Props['data'];
</script>

<!--
  @component
  
  The base component for all custom diagram nodes.
  Other custom node types should use this as their container.
-->
<div class="px-4 py-2 shadow-md rounded-md bg-surface1">
  <slot></slot>
</div>