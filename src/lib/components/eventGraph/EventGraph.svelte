<script lang="ts">
  import Flow from '$lib/components/svelteflow/Flow.svelte';
  import type { components } from '$lib/api/misp';
  import {
    Position,
    type Edge,
    type Node,
    useSvelteFlow,
    getNodesBounds,
    useStore
  } from '@xyflow/svelte';
  import { writable, type Writable } from 'svelte/store';
  import dagre from '@dagrejs/dagre';
  import { tweened } from 'svelte/motion';
  import ObjectNode from './graph/nodes/ObjectNode.svelte';
  import AttributeNode from './graph/nodes/AttributeNode.svelte';
  import CategoryNode from './graph/nodes/CategoryNode.svelte';
  import ReferenceEdge from './graph/edges/ReferenceEdge.svelte';
  import RelationEdge from './graph/edges/RelationEdge.svelte';
  import ContextMenu from './menu/ContextMenu.svelte';
  import { removePreviousHighlightBorder, addHighlightBorder } from './helpers/highlight';
  import { getReferencedItems } from './helpers/classItems';
  import UnreferencedMenu from './menu/UnreferencedMenu.svelte';
  import type { EventGraphReferences } from '$lib/models/EventGraphReferences';
  import { api } from '$lib/api';
  import { notifySave } from '$lib/util/notifications.util';
  import { page } from '$app/stores';
  import { actionBar } from '$lib/actions';
  import { mode } from '$lib/stores';
  import referenceTypes from './referenceTypes';
  import Select from '../form/Select.svelte';
  import { fly } from 'svelte/transition';
  /**
   * The Event to be displayed on this page.
   */
  export let event: components['schemas']['ExtendedEvent'];

  /**
   * The event graph references for the event to be displayed.
   */
  export let eventGraphReferences: EventGraphReferences;

  // The currently selected reference type, will be used for new references
  let referenceType = referenceTypes[0];

  const objects = event.Object ?? [];
  const attributes = event.Attribute ?? [];

  const references = eventGraphReferences.relations ?? [];

  const { referencedObjects, referencedAttributes, unreferencedObjects, unreferencedAttributes } =
    getReferencedItems(objects, attributes, references);

  const { updateNode, fitBounds, getNodes } = useSvelteFlow();
  const { nodesDraggable } = useStore();

  $nodesDraggable = false;

  const position = { x: 0, y: 0 };

  const nodes: Writable<
    Node<
      Pick<
        components['schemas']['Object'],
        | 'id'
        | 'uuid'
        | 'event_id'
        | 'distribution'
        | 'name'
        | 'description'
        | 'comment'
        | 'first_seen'
        | 'last_seen'
        | 'deleted'
      > & { attributes?: components['schemas']['Attribute'][] } & Pick<
          components['schemas']['Attribute'],
          'object_id' | 'object_relation' | 'category' | 'type' | 'value' | 'disable_correlation'
        >
    >[]
  > = writable([]);
  const edges: Writable<Edge[]> = writable([]);

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
      // Edge: object to its attributes (= relations)
      $edges.push({
        id: `object-${referencedObject.id}-to-attribute-${attribute.id}`,
        source: `o-${referencedObject.id}`,
        target: `attribute-${attribute.id}`,
        data: {
          label: attribute.object_relation ?? undefined
        },
        type: 'relation'
      });
    }
  }

  for (const referencedAttribute of referencedAttributes) {
    $nodes.push({
      id: `${referencedAttribute.id}`,
      position,
      data: {
        id: referencedAttribute.id,
        uuid: referencedAttribute.uuid,
        event_id: referencedAttribute.event_id,
        object_id: referencedAttribute.object_id,
        object_relation: referencedAttribute.object_relation,
        category: referencedAttribute.category,
        type: referencedAttribute.type,
        distribution: referencedAttribute.distribution,
        value: referencedAttribute.value,
        comment: referencedAttribute.comment,
        first_seen: referencedAttribute.first_seen,
        last_seen: referencedAttribute.last_seen,
        deleted: referencedAttribute.deleted,
        disable_correlation: referencedAttribute.disable_correlation
      },
      type: 'attribute'
    });
  }

  // Edge: referenced objects to referenced attributes or objects (= reference)
  for (const reference of references) {
    $edges.push({
      id: `reference-${reference.id}`,
      source: `${reference.from}`,
      target: `${reference.to}`,
      data: {
        label: reference.type
      },
      type: 'reference',
      animated: true
    });
  }

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  /**
   *
   * @param followNodeIds IDs of Nodes to keep in viewport
   */
  function layoutElements(followNodeIds: string[] = []) {
    dagreGraph.setGraph({ rankdir: 'LR' });

    $nodes.forEach((node) => {
      const { width, height } = getNodesBounds([node]);
      // const [offsetX, offsetY] = [300, 50];
      dagreGraph.setNode(node.id, {
        width,
        height
      });
    });

    $edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    $nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = Position.Left;
      node.sourcePosition = Position.Right;

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const pos = tweened(node.position);
      pos.set({
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2
      });
      pos.subscribe((p) => {
        updateNode(node.id, { position: p });
        if (followNodeIds.includes(node.id)) {
          fitBounds(getNodesBounds(getNodes(followNodeIds)));
        }
      });
    });
  }

  setTimeout(() => {
    if ($nodes.length) layoutElements();
  });

  const nodeTypes = {
    object: ObjectNode,
    attribute: AttributeNode,
    category: CategoryNode
  };

  const edgeTypes = {
    reference: ReferenceEdge,
    relation: RelationEdge
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

      addHighlightBorder(node.type, node.data.id);
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
  const { onconnect } = useStore();

  $onconnect = (connection) => {
    const source = $nodes.find(({ id }) => id === connection.source);
    const target = $nodes.find(({ id }) => id === connection.target);
    if (!source || !target) return;
    notifySave(
      $api
        // @ts-expect-error Not in the OpenAPI spec
        .POST('/objectReferences/add/{objectId}', {
          params: { path: { objectId: source.data.id } },
          body: {
            ObjectReference: {
              relationship_type_select: referenceType,
              relationship_type: '',
              comment: '',
              referenced_uuid: target.data.uuid
            }
          }
        })
        .then((resp) => {
          if (resp.error) throw new Error(resp.error.message);
        })
    );
    layoutElements([source.id, target.id]);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (!event.dataTransfer) {
      return;
    }

    const type = event.dataTransfer.getData('type');
    if (type === 'object' || type === 'attribute') {
      const data = JSON.parse(event.dataTransfer.getData('node')).data;

      if ($nodes.find(({ id }) => id === `unreferenced-${data.type}-${data.id}`)) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });

      const newNode = {
        id: `unreferenced-${data.type}-${data.id}`,
        type,
        position,
        data: data,
        origin: [0.5, 0.0]
      } satisfies Node;

      $nodes.push(newNode);
      $nodes = $nodes;
    }
  };

  // Don't think there's an API for deleting references, also didn't find a way to do it in original MISP
  // function handleEdgeContextMenu({
  //   detail: { event, edge }
  // }: Flow['$$events_def']['edgecontextmenu']) {
  //   event.preventDefault();
  //   $edges = $edges.filter(({ id }) => id !== edge.id);
  // }
</script>

<!--
  @component
  
  The Event Graph component. Uses the {@link Flow} component to render the graph.
  Uses the {@link IconCard} component to render action bar buttons.

-->

<svelte:window
  use:actionBar={[
    {
      action: `/events/${$page.params.id}/attributes/new`,
      icon: 'mdi:flag-add',
      label: 'Add attribute'
    }
  ]}
  on:focus={() => {
    if ($nodes.length) layoutElements();
  }}
/>

<header class="flex justify-between w-full gap-4">
  <div class="flex flex-col gap-1">
    {#if $mode === 'edit'}
      <div in:fly={{ x: -200 }} out:fly={{ x: -200 }}>
        <span>Reference Type for new references</span>
        <Select
          bind:value={referenceType}
          options={referenceTypes.map((r) => ({
            label: r,
            value: r
          }))}
        ></Select>
      </div>
    {/if}
  </div>
  <div>
    <UnreferencedMenu objects={unreferencedObjects} attributes={unreferencedAttributes} />
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
      on:dragover={onDragOver}
      on:drop={onDrop}
      on:edgecontextmenu={() => {
        /*handleEdgeContextMenu)e */
      }}
    />
  </div>
</div>
