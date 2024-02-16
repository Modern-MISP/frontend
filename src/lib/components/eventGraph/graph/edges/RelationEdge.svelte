<script lang="ts">
  import { useEdges, type EdgeProps, getBezierPath, BaseEdge } from '@xyflow/svelte';

  type $$Props = EdgeProps;

  export let target: $$Props['target'];
  export let source: $$Props['source'];
  export let sourceX: $$Props['sourceX'];
  export let sourceY: $$Props['sourceY'];
  export let sourcePosition: $$Props['sourcePosition'];
  export let targetX: $$Props['targetX'];
  export let targetY: $$Props['targetY'];
  export let targetPosition: $$Props['targetPosition'];
  export let markerEnd: $$Props['markerEnd'] = undefined;

  const edges = useEdges();

  let path: string;
  $: {
    const edgePathParams = {
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition
    };
  }
</script>

<!--
  @component
  
  An edge representing a generic event graph relation.
-->
<BaseEdge {path} {markerEnd} />
