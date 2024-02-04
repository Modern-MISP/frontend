<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import IconCardRow from '$lib/components/eventGraph/IconCardRow.svelte';
  import Flow from '$lib/components/svelteflow/Flow.svelte';
  import { Position, type Edge, type Node, useSvelteFlow, getNodesBounds } from '@xyflow/svelte';
  import { writable, type Writable } from 'svelte/store';
  import CardRow from '../card/CardRow.svelte';
  import IconCard from './IconCard.svelte';
  import type { components } from '$lib/api/misp';
  import dagre from '@dagrejs/dagre';
  import { spring } from 'svelte/motion';
  import AttributeNode from './AttributeNode.svelte';

  const edges: Writable<Edge[]> = writable([]);

  let tableView: 'objects' | 'attributes' = 'objects';
  tableView;

  /**
   * The Event to be displayed on this page.
   */
  export let event: components['schemas']['ExtendedEvent'];
  event;

  const { updateNode } = useSvelteFlow();

  const objects = event.Object ?? [];
  const attributes = event.Attribute ?? [];
  const tags = event.Tag ?? [];

  const position = { x: 0, y: 0 };

  const nodes: Writable<Node[]> = writable([]);
  $nodes.push({ id: 'event', position, data: { label: `Event ${event.id}` }, type: 'input' });
  $nodes.push({ id: 'referenced', position, data: { label: `Referenced` } });
  $nodes.push({ id: 'referenced-objects', position, data: { label: `Referenced Objects` } });
  $nodes.push({ id: 'referenced-attributes', position, data: { label: `Referenced Attributes` } });
  $nodes.push({ id: 'unreferenced', position, data: { label: `Unreferenced` } });
  $nodes.push({ id: 'unreferenced-objects', position, data: { label: `Unreferenced Objects` } });
  $nodes.push({ id: 'unreferenced-attributes', position, data: { label: `Unreferenced Attributes` } });

  $edges.push({
    id: `event-to-referenced`,
    source: 'event',
    target: `referenced`
  });

  $edges.push({
    id: `event-to-unreferenced`,
    source: 'event',
    target: `unreferenced`
  });

  $edges.push({
    id: `referenced-to-referenced-objects`,
    source: 'referenced',
    target: `referenced-objects`
  });

  $edges.push({
    id: `referenced-to-referenced-attributes`,
    source: 'referenced',
    target: `referenced-attributes`
  });

  $edges.push({
    id: `unreferenced-to-unreferenced-objects`,
    source: 'unreferenced',
    target: `unreferenced-objects`
  });

  $edges.push({
    id: `unreferenced-to-unreferenced-attributes`,
    source: 'unreferenced',
    target: `unreferenced-attributes`
  });
  
  for (const object of objects) {
    // Node: objects (refed/unrefed)
    $nodes.push({ id: `object-${object.id}`, position, data: { label: `Object ${object.id} ${object.name}` } });
    // Edge: event to objects (refed/unrefed)
    $edges.push({
      id: `event-to-object-${object.id}`,
      source: 'referenced-objects',
      target: `object-${object.id}`
    });

    for (const attribute of object.Attribute ?? []) {
      // Node: refed attributes
       $nodes.push({
        id: `attribute-${attribute.id}`,
        position,
        data: {
          id: attribute.id,
          type: "mdi:flag", // temporary
/*           type: attribute.type,
          comment: attribute.comment, */
          category: attribute.category,
          value: attribute.value
        },
        type: 'attribute'
      });
      // Edge: refed objects to refed attributes
      $edges.push({
        id: `object-${object.id}-to-attribute-${attribute.id}`,
        source: `object-${object.id}`,
        target: `attribute-${attribute.id}`,
        label: attribute.object_relation ?? undefined,
        type: 'bezier',
        animated: true
      });
    }
  }

  for (const attribute of attributes) {
    // Node: unrefed attributes
    $nodes.push({
      id: `attribute-${attribute.id}`,
      position,
      data: {
        id: attribute.id,
        type: "mdi:flag", // temporary
/*         type: attribute.type,
        comment: attribute.comment, */
        category: attribute.category, 
        value: attribute.value,
      },
      type: 'attribute'
    });
    // Edge: event to unrefed attributes
    $edges.push({
      id: `event-to-attribute-${attribute.id}`,
      source: `unreferenced-attributes`,
      target: `attribute-${attribute.id}`
    });
  }

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  function getLayoutedElements(nodes: Node[], edges: Edge[]) {
    dagreGraph.setGraph({ rankdir: 'LR' });

    nodes.forEach((node) => {
      const { width, height } = getNodesBounds([node]);
      dagreGraph.setNode(node.id, {
        width: width + 200,
        height: height + 50
      });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = Position.Left;
      node.sourcePosition = Position.Right;

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2
      };
    });

    return { nodes, edges };
  }

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements($nodes, $edges);

  $nodes = layoutedNodes;
  $edges = layoutedEdges;

  const nodeTypes = {
    attribute: AttributeNode
  };
</script>

<!--
  @component
  
  The event Graph component. Uses the {@link Flow} component to render the graph.
  Uses the {@link Card} component to render the action Bar and a table, where the unreferenced objects and attributes are displayed.

-->
<header class="flex justify-between w-full gap-2">
  <div class="flex gap-2">
    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="mdi:magnify" text="Details" />
    </CardRow>

    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="mdi:show" text="Show" />
      <IconCard icon="mdi:hide" text="Hide" class="!text-red" />
    </CardRow>

    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="bx:expand" text="Expand" />
      <IconCard icon="bx:collapse" text="Collapse" class="!text-red" />
    </CardRow>

    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="mdi:edit" text="Edit" />
      <IconCard icon="bx:duplicate" text="Duplicate" />
      <IconCard icon="mdi:delete" text="Delete" class="!text-red" />
    </CardRow>
  </div>
  <div class="flex gap-4 shrink-0">
    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="mdi:web" text="Unreferenced Objects" />
      <IconCard icon="mdi:flag" text="Unreferenced Attributes" />
    </CardRow>
  </div>
</header>
<div class="flex flex-row w-full h-full">
  <div class="flex-col w-full">
    <CardRow class="rounded-lg bg-surface0">
      <IconCard icon="mdi:web-plus" text="Add Object" />
      <IconCard icon="mdi:flag-add" text="Add Attribute" />
      <IconCard icon="icon-park-outline:connection" text="Add Reference" />
    </CardRow>
    <Flow
      {nodes}
      {edges}
      {nodeTypes}
      on:nodedragstop={({ detail: { node } }) => {
        if (!node) return;
        const position = spring(node.position);
        const computedPosition = layoutedNodes.find((n) => n.id === node.id)?.position;
        if (computedPosition) position.set(computedPosition);
        position.subscribe((position) => updateNode(node.id, { position }));
      }}
    />
  </div>

<!--   <Card>
    {#each [{ text: 'test', icon: 'mdi:file' }, { text: 'test 2', icon: 'mdi:server' }] as obj}
      <IconCardRow {...obj} />
    {/each}
  </Card> -->
</div>
