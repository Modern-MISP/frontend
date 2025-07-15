<script lang="ts">
  import { type EdgeProps, getBezierPath, BaseEdge, EdgeLabel } from '@xyflow/svelte';

  type $$Props = EdgeProps;

  interface Props {
    /**
     *
     */
    sourceX: $$Props['sourceX'];
    /**
     *
     */
    sourceY: $$Props['sourceY'];
    /**
     *
     */
    sourcePosition: $$Props['sourcePosition'];
    /**
     *
     */
    targetX: $$Props['targetX'];
    /**
     *
     */
    targetY: $$Props['targetY'];
    /**
     *
     */
    targetPosition: $$Props['targetPosition'];
    /**
     *
     */
    data?: $$Props['data'];
  }

  let {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    data = undefined
  }: Props = $props();

  let [edgePath, labelX, labelY] = $derived(
    getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition
    })
  );
</script>

<!--
  @component

  An edge representing a generic event graph relation.
-->

<BaseEdge path={edgePath} />
<EdgeLabel>
  <div
    style:transform="translate(-50%, -50%) translate({labelX}px,{labelY}px)"
    class="nodrag nopan absolute text-xs"
  >
    {data.label}
  </div>
</EdgeLabel>
