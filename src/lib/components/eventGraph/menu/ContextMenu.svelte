<script lang="ts">
  import { useEdges, useNodes } from '@xyflow/svelte';
  import IconCard from '../cards/IconCard.svelte';
  import IconCardRow from '../cards/IconCardRow.svelte';

  export const onClick = () => {};
  export let id: string;
  export let data: any;

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
    console.log(data)
    $nodes = $nodes.filter((node) => node.id !== id);
    $edges = $edges.filter((edge) => edge.source !== id && edge.target !== id);
  }

  function showNodeDetails() {
    console.log(data)
  }
</script>

<!-- 
  @component
  A ContextMenu component. A custom context menu is displayed when right-clicking a node.

 -->

<div class="flex items-center gap-2 absolute z-50">
  <small>node: {id}</small>
  <IconCardRow class="border-2 border-sky">
    <IconCard icon="mdi:magnify" text="Details" on:click={showNodeDetails} />
  </IconCardRow>

  <IconCardRow class="border-2 border-sky">
    <IconCard icon="mdi:show" text="Show" />
    <IconCard icon="mdi:hide" text="Hide" class="!text-red" on:click={hideNode} />
  </IconCardRow>

  <IconCardRow class="border-2 border-sky">
    <IconCard icon="bx:expand" text="Expand" />
    <IconCard icon="bx:collapse" text="Collapse" class="!text-red" />
  </IconCardRow>

  <IconCardRow class="border-2 border-sky">
    <IconCard icon="mdi:edit" text="Edit" />
    <IconCard icon="bx:duplicate" text="Duplicate" on:click={duplicateNode} />
    <IconCard icon="mdi:delete" text="Delete" class="!text-red" />
  </IconCardRow>
</div>
