<script lang="ts">
  import { type EdgeProps, BaseEdge } from '@xyflow/svelte';

  type $$Props = EdgeProps;

  let path: string;
  export let markerEnd: $$Props['markerEnd'] = undefined;
</script>

<!--
  @component
  
  An edge representing a generic event graph relation.
-->
<BaseEdge {path} {markerEnd} />
