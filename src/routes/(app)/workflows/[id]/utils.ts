import { type Node, type Edge, getNodesBounds } from '@xyflow/svelte';
import { objectEntries, objectFromEntries } from 'ts-extras';
import type { ModuleNode, WorkflowData } from '../workflow';

export function generateFlowContent(wfData: WorkflowData, onNodeUpdate: (id: string) => void) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  for (const [, module] of objectEntries(wfData).filter(([key]) => key !== '_frames')) {
    nodes.push({
      id: `${module.id}`,
      type: module.data.module_type, // 'trigger', 'action' or 'logic'
      data: {
        inputs: Object.keys(module.inputs),
        outputs: Object.keys(module.outputs),
        moduleData: module.data,
        onUpdate: onNodeUpdate
      },
      position: { x: module.pos_x, y: module.pos_y }
    });
    // create input edges for this module
    for (const [inputName, input] of Object.entries(module.inputs)) {
      for (const connection of input.connections ?? []) {
        edges.push({
          id: `${connection.node}-${module.id}`,
          type: 'default',
          source: connection.node,
          sourceHandle: connection.input,
          target: `${module.id}`,
          targetHandle: inputName,
          animated: true,
          style: 'stroke-width: 4px'
        });
      }
    }
  }
  return { nodes, edges };
}

/**
 * Updates a node of type 'frame' to properly wrap its children.
 * @param nodes All nodes of the flow
 * @param frame The frame that will be updated
 * @returns The updated frame
 */
export function updateFrame(nodes: Node[], frame: Node): [string, Node] {
  const padding = 20;
  const additionalLabelPadding = 30;

  const children = nodes.filter((n) => frame.data.nodes.includes(n.id));
  const bounds = getNodesBounds(children);

  frame.position.x = bounds.x - padding;
  frame.position.y = bounds.y - padding - additionalLabelPadding;
  frame.width = bounds.width + 2 * padding;
  frame.height = bounds.height + 2 * padding + additionalLabelPadding;
  return [frame.id, frame];
}

/** Turn the current flow back into API-accepted JSON. */
export function constructWorkflowData(
  wfData: WorkflowData,
  nodes: Node[],
  edges: Edge[]
): WorkflowData {
  const constructedData = {
    ...objectFromEntries(
      nodes.map((node) => [
        node.id,
        {
          ...wfData[node.id],
          data: node.data.moduleData,
          pos_x: node.position.x,
          pos_y: node.position.y,
          inputs: [],
          outputs: []
        } as ModuleNode
      ])
    ),
    _frames: wfData._frames // changing frames is not yet supported
  } as WorkflowData;

  for (const edge of edges) {
    // TODO
    edge;
  }

  return constructedData;
}
