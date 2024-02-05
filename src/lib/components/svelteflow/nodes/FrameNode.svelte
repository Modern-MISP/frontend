<script lang="ts">
  import { type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  /** Node properties */
  export let data: $$Props['data'];
</script>

<!--
  @component
  
  A node representing a workflow frame.
-->
<div class="bg-surface0 w-full h-full opacity-50 border-2">
  <span class="bg-surface2 text-white">{data.label}</span>
</div>
