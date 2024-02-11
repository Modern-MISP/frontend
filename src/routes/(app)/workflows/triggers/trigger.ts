import type { Workflow } from '../workflow';

export type Trigger = {
  id?: string;
  name?: string;
  scope?: string;
  trigger_overhead?: number;
  trigger_overhead_message?: string;
  description?: string;
  Workflow?: Workflow;
  disabled?: boolean;
  blocking?: boolean;
  misp_core_format?: boolean;
};
