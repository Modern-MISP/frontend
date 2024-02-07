export type Trigger = {
  id?: string;
  name?: string;
  scope?: string;
  trigger_overhead?: number;
  trigger_overhead_message?: string;
  description?: string;
  Workflow?: {
    id?: string;
    uuid?: string;
    name?: string;
    description?: string;
    counter?: string;
    timestamp?: string;
    enabled?: boolean;
    debug_enabled?: boolean;
    data?: Record<string | number, ModuleNode> & {
      _frames:
        | []
        | Record<
            string,
            {
              id: string;
              text: string;
              class: string;
              nodes: string[];
            }
          >;
    };
    listening_triggers?: Array<Trigger>;
    trigger_id?: string;
  };
  disabled?: boolean;
  blocking?: boolean;
  misp_core_format?: boolean;
};

type Inputs =
  | {
      [name: string]: {
        connections: Array<{
          node: string;
          input: string;
        }>;
      };
    }
  | [];

type Outputs =
  | {
      [name: string]: {
        connections: Array<{
          node: string;
          output: string;
        }>;
      };
    }
  | [];

export type ModuleNodeData = {
  id: string;
  indexed_params: [];
  module_type: string;
  module_version?: string;
  multiple_output_connection: boolean;
  name: string;
  node_uid: string;
  previous_module_version: string;
  saved_filters: object;
};

export type ModuleNode = {
  id: number;
  class: string;
  data: ModuleNodeData;
  pos_x: number;
  pos_y: number;
  name: string;
  typenode: boolean;
  inputs: Inputs;
  outputs: Outputs;
};
