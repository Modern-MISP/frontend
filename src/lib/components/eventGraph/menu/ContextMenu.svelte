<script lang="ts">
  import { useEdges, useNodes } from '@xyflow/svelte';
  import IconCard from '../cards/IconCard.svelte';
  import CardRow from '../../card/CardRow.svelte';

  export const onClick = () => {};
  export let id: string;

  const nodes = useNodes();
  const edges = useEdges();

  function duplicateNode() {
    const node = $nodes.find((node) => node.id === id);
    if (node) {
      $nodes.push({
        ...node,
        // You should use a better id than this in production
        id: `${id}-copy${Math.random()}`,
        position: {
          x: node.position.x,
          y: node.position.y + 50
        }
      });
    }
    $nodes = $nodes;
  }

  function hideNode() {
    $nodes = $nodes.filter((node) => node.id !== id);
    $edges = $edges.filter((edge) => edge.source !== id && edge.target !== id);
  }
</script>

<!-- 
  @component
  A ContextMenu component. A custom context menu is displayed when right-clicking a node.

 -->

<div class="flex items-center gap-2">
  <small>node: {id}</small>
  <CardRow class="rounded-lg bg-surface0">
    <IconCard icon="mdi:magnify" text="Details" />
  </CardRow>

  <CardRow class="rounded-lg bg-surface0">
    <IconCard icon="mdi:show" text="Show" />
    <IconCard icon="mdi:hide" text="Hide" class="!text-red" on:click={hideNode} />
  </CardRow>

  <CardRow class="rounded-lg bg-surface0">
    <IconCard icon="bx:expand" text="Expand" />
    <IconCard icon="bx:collapse" text="Collapse" class="!text-red" />
  </CardRow>

  <CardRow class="rounded-lg bg-surface0">
    <IconCard icon="mdi:edit" text="Edit" />
    <IconCard icon="bx:duplicate" text="Duplicate" on:click={duplicateNode} />
    <IconCard icon="mdi:delete" text="Delete" class="!text-red" />
  </CardRow>

</div>