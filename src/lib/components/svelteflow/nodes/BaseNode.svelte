<script lang="ts">
  import type { NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  /** Node properties */
  // eslint-disable-next-line svelte/valid-compile
  export let data: $$Props['data'];
</script>

<!--
  @component
  
  The base component for all custom diagram nodes.
  Other custom node types should use this as their container.
-->
<div class="px-4 py-2 rounded-md shadow-md bg-surface1">
  <slot />
</div>
