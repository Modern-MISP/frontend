<script lang="ts">
  import Flow from '$lib/components/svelteflow/Flow.svelte';
  import type { components } from '$lib/api/misp';
  import { mode } from '$lib/stores';
  import { Position, type Edge, type Node, useSvelteFlow, getNodesBounds } from '@xyflow/svelte';
  import { writable, type Writable } from 'svelte/store';
  import dagre from '@dagrejs/dagre';
  import { spring } from 'svelte/motion';
  import IconCard from './cards/IconCard.svelte';
  import IconCardRow from './cards/IconCardRow.svelte';
  import ObjectNode from './graph/nodes/ObjectNode.svelte';
  import AttributeNode from './graph/nodes/AttributeNode.svelte';
  import CategoryNode from './graph/nodes/CategoryNode.svelte';
  import ReferenceEdge from './graph/edges/ReferenceEdge.svelte';
  import ContextMenu from './menu/ContextMenu.svelte';
  import { removePreviousHighlightBorder, addHighlightBorder } from './helpers/highlight';
  import { fly } from 'svelte/transition';
  import UnreferencedMenu from './menu/UnreferencedMenu.svelte';
  import type { EventGraphReferences } from '$lib/models/EventGraphReferences';

  const edges: Writable<Edge[]> = writable([]);

  let tableView: 'objects' | 'attributes' = 'objects';
  tableView;

  /**
   * The Event to be displayed on this page.
   */
  export let event: components['schemas']['ExtendedEvent'];

  /**
   * The event graph references for the event to be displayed.
   */
  export let eventGraphReferences: EventGraphReferences;
  const items = eventGraphReferences.items ?? [];
  const references = eventGraphReferences.relations ?? [];
  let referencedObjects = [];
  let referencedAttributes = [];

  const { updateNode } = useSvelteFlow();

  const objects = event.Object ?? [];
  const attributes = event.Attribute ?? [];

  const position = { x: 0, y: 0 };

  const nodes: Writable<Node[]> = writable([]);
  $nodes.push({ id: 'event', position, data: { label: `Event ${event.id}` }, type: 'category' });

  const referencedItemsIds: string[] = Array.from(
    new Set(references.flatMap((reference) => [reference.from, reference.to]))
  );

  const referencedObjectsIds: string[] = referencedItemsIds.filter((id) => id.startsWith('o-'));
  const referencedAttributesIds: string[] = referencedItemsIds.filter((id) => !id.startsWith('o-'));

  for (const referencedObjectId of referencedObjectsIds) {
    let referencedObject = objects.find((item) => `o-${item.id}` === referencedObjectId);
    if (referencedObject) {
      referencedObjects.push(referencedObject);
    }
  }

  for (const referencedAttributeId of referencedAttributesIds) {
    let referencedAttribute = attributes.find((item) => item.id === referencedAttributeId);
    if (referencedAttribute) {
      referencedAttributes.push(referencedAttribute);
    }
  }

  for (const referencedObject of referencedObjects) {
    $nodes.push({
      id: `o-${referencedObject.id}`,
      position,
      data: {
        id: referencedObject.id,
        uuid: referencedObject.uuid,
        event_id: referencedObject.event_id,
        distribution: referencedObject.distribution,
        name: referencedObject.name,
        description: referencedObject.description,
        attributes: referencedObject.Attribute,
        comment: referencedObject.comment,
        first_seen: referencedObject.first_seen,
        last_seen: referencedObject.last_seen,
        deleted: referencedObject.deleted
      },
      type: 'object'
    });

    for (const attribute of referencedObject.Attribute ?? []) {
      // Node: attributes
      $nodes.push({
        id: `attribute-${attribute.id}`,
        position,
        data: {
          id: attribute.id,
          uuid: attribute.uuid,
          event_id: attribute.event_id,
          object_id: attribute.object_id,
          object_relation: attribute.object_relation,
          category: attribute.category,
          type: attribute.type,
          distribution: attribute.distribution,
          value: attribute.value,
          comment: attribute.comment,
          first_seen: attribute.first_seen,
          last_seen: attribute.last_seen,
          deleted: attribute.deleted,
          disable_correlation: attribute.disable_correlation
        },
        type: 'attribute'
      });
      // Edge: objects to attributes (= relations)
      $edges.push({
        id: `object-${referencedObject.id}-to-attribute-${attribute.id}`,
        source: `o-${referencedObject.id}`,
        target: `attribute-${attribute.id}`,
        label: attribute.object_relation ?? undefined,
        type: 'bezier'
      });
    }
  }

  for (const referencedAttributeId of referencedAttributesIds) {
    let referencedAttribute = items.find((item) => item.id === referencedAttributeId);
    $nodes.push({
      id: `${referencedAttribute?.id}`,
      position,
      data: {
        id: `${referencedAttribute?.id}`,
        type: `${referencedAttribute?.type}`,
        value: `${referencedAttribute?.label}`
      },
      type: 'attribute'
    });
  }

  for (const reference of references) {
    $edges.push({
      id: `reference-${reference.id}`,
      source: `${reference.from}`,
      target: `${reference.to}`,
      label: reference.type,
      type: 'reference',
      animated: true
    });
  }

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  function getLayoutedElements(nodes: Node[], edges: Edge[]) {
    dagreGraph.setGraph({ rankdir: 'LR' });

    nodes.forEach((node) => {
      const { width, height } = getNodesBounds([node]);
      const [offsetX, offsetY] = [300, 50];
      dagreGraph.setNode(node.id, {
        width: width + offsetX,
        height: height + offsetY
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
    object: ObjectNode,
    attribute: AttributeNode,
    category: CategoryNode
  };

  const edgeTypes = {
    reference: ReferenceEdge
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let menu: { id: string; data: any; type: string } | null;

  function handleContextMenu({ detail: { event, node } }: Flow['$$events_def']['nodecontextmenu']) {
    // Prevent native context menu from showing
    event.preventDefault();

    // Context menu only for object and attribute nodes
    if (node.type === 'object' || node.type === 'attribute') {
      menu = {
        id: node.id,
        data: node.data,
        type: node.type
      };

      removePreviousHighlightBorder();

      addHighlightBorder(node.id);
    }
  }

  function handlePaneClick() {
    // Close the context menu if it's open whenever the window is clicked.
    menu = null;
    removePreviousHighlightBorder();
  }

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  };

  const { screenToFlowPosition } = useSvelteFlow();

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (!event.dataTransfer) {
      return null;
    }

    const type = event.dataTransfer.getData('type');
    if (type === 'object' || type === 'attribute') {
      const data = JSON.parse(event.dataTransfer.getData('node')).data;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });

      const newNode = {
        id: `unref-${data.type}-${data.id}`,
        type,
        position,
        data: data,
        origin: [0.5, 0.0]
      } satisfies Node;

      $nodes.push(newNode);
      $nodes = $nodes;
    }
  };
</script>

<!--
  @component
  
  The Event Graph component. Uses the {@link Flow} component to render the graph.
  Uses the {@link IconCard} component to render action bar buttons.

-->

<header class="flex justify-between w-full gap-2">
  <div class="flex justify-start gap-4">
    {#if $mode === 'edit'}
      <div in:fly={{ x: -200 }} out:fly={{ x: -200 }}>
        <IconCardRow>
          <IconCard icon="mdi:web-plus" text="Add Object" />
          <IconCard icon="mdi:flag-add" text="Add Attribute" />
          <IconCard icon="icon-park-outline:connection" text="Add Reference" />
        </IconCardRow>
      </div>
    {/if}
  </div>

  <div class="flex flex-col justify-end gap-1">
    <UnreferencedMenu {objects} {attributes} />
  </div>
</header>
<div class="flex flex-row w-full h-full">
  <div class="flex-col w-full">
    {#if menu}
      <ContextMenu id={menu.id} data={menu.data} type={menu.type} />
    {/if}
    <Flow
      {nodes}
      {edges}
      {nodeTypes}
      {edgeTypes}
      on:nodecontextmenu={handleContextMenu}
      on:paneclick={handlePaneClick}
      on:nodedragstop={({ detail: { node } }) => {
        if (!node) return;
        const position = spring(node.position);
        const computedPosition = layoutedNodes.find((n) => n.id === node.id)?.position;
        if (computedPosition) position.set(computedPosition);
        position.subscribe((position) => updateNode(node.id, { position }));
      }}
      on:dragover={onDragOver}
      on:drop={onDrop}
    />
  </div>
</div>
