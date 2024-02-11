import { describe, it, expect } from 'vitest';
import { constructWorkflowData, generateFlowContent } from './utils';
import { wfData } from './wfData.mock';

describe('workflow', () => {
  it('should be able to reconstruct workflow data', () => {
    const { nodes, edges } = generateFlowContent(wfData, () => {});

    const resultWfData = constructWorkflowData(wfData, nodes, edges);
    expect(resultWfData).toStrictEqual(wfData);
  });
});
