<script lang="ts">
  import { api } from '$lib/api/index.js';
  import { useEdges, useNodes } from '@xyflow/svelte';
  import IconCard from '../cards/IconCard.svelte';
  import IconCardRow from '../cards/IconCardRow.svelte';
  import { mode } from '$lib/stores';
  import { fly } from 'svelte/transition';

  export let id: string;
  export let type: string;

  const nodes = useNodes();
  const edges = useEdges();

  function hideNode() {
    $nodes = $nodes.filter((node) => node.id !== id);
    $edges = $edges.filter((edge) => edge.source !== id && edge.target !== id);
  }

  function manipulateNode(expand: boolean) {
    const node = $nodes.find((node) => node.id === id);
    // Only objects are collapsible
    if (node && node.type === 'object') {
      // Get all edges associated with the selected node
      const nodeEdges = $edges.filter((edge) => edge.source === node.id);

      // Iterate to find associated attribute nodes
      nodeEdges.forEach((edge) => {
        const associatedNode = $nodes.find((n) => n.id === edge.target);
        if (associatedNode && associatedNode.type === 'attribute' && edge.type === 'relation') {
          // Update visibility based on expand parameter
          const hiddenValue = expand ? false : true;

          // Hide or show the attribute node
          $nodes = $nodes.map((n) => {
            if (n.id === associatedNode.id) {
              return {
                ...n,
                hidden: hiddenValue
              };
            }
            return n;
          });

          // Hide or show the edge connecting object node and attribute node
          $edges = $edges.map((e) => {
            if (e.source === node.id && e.target === associatedNode.id) {
              return {
                ...e,
                hidden: hiddenValue
              };
            }
            return e;
          });
        }
      });
    }
  }

  function expandNode() {
    manipulateNode(true);
  }

  function collapseNode() {
    manipulateNode(false);
  }

  function deleteNode() {
    const node = $nodes.find((node) => node.id === id);
    hideNode();
    if (node && node.type === 'attribute') {
      $api
        .DELETE('/attributes/delete/{attributeId}', {
          params: { path: { attributeId: node.data.id } }
        })
        .then((resp) => {
          if (resp.error) throw new Error(resp.error.message);
        });
    } else if (node && node.type === 'object') {
      $api
        .DELETE('/objects/delete/{objectId}/{hardDelete}', {
          params: { path: { objectId: node.data.id, hardDelete: '1' } }
        })
        .then((resp) => {
          if (resp.error) throw new Error(resp.error.message);
        });
    }
  }

  function editNode() {
    const node = $nodes.find((node) => node.id === id);
    if (node && node.type === 'attribute') {
      history.pushState(null, '', `/attributes/${node.data.id}`);
    }
  }
</script>

<!-- 
  @component
  A ContextMenu component. A custom context menu is displayed when right-clicking a node.

 -->

<div in:fly={{ x: -200 }} out:fly={{ x: -200 }} class="flex items-center gap-2 absolute z-50">
  {#if type === 'object'}
    <IconCardRow class="border-2 border-sky">
      <IconCard icon="bx:expand" text="Expand" on:click={expandNode} />
      <IconCard icon="bx:collapse" text="Collapse" class="!text-red" on:click={collapseNode} />
    </IconCardRow>
  {/if}

  {#if $mode === 'edit'}
    <IconCardRow class="border-2 border-sky">
      {#if type === 'attribute'}
        <IconCard icon="mdi:edit" text="Edit" on:click={editNode} />
      {/if}
      <IconCard icon="mdi:delete" text="Delete" class="!text-red" on:click={deleteNode} />
    </IconCardRow>
  {/if}
</div>
