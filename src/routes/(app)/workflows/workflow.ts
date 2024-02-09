import type { Module } from './modules/module';
import type { Trigger } from './triggers/trigger';

export type Workflow = {
  id?: string;
  uuid?: string;
  name?: string;
  description?: string;
  counter?: string;
  timestamp?: string;
  enabled?: boolean;
  debug_enabled?: boolean;
  data?: WorkflowData;
  listening_triggers?: Array<Trigger>;
  trigger_id?: string;
};

export type WorkflowData = {
  [key: string | number]: ModuleNode;
  _frames: Frames['_frames'];
};

type Frames = {
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
  indexed_params: [] | Record<string, string | string[]>;
  module_type: string;
  module_version?: string;
  multiple_output_connection: boolean;
  is_misp_module?: boolean;
  name: string;
  node_uid: string;
  previous_module_version: string;
  saved_filters: object;
} & Module &
  Trigger;

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

export type CheckGraphResult = {
  is_acyclic: { is_acyclic: boolean; cycles: unknown[] };
  multiple_output_connection: {
    has_multiple_output_connection: boolean;
    edges: [] | Record<number, number[]>;
  };
  path_warnings: {
    has_path_warnings: boolean;
    edges: unknown[];
  };
};
