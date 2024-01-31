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
    data?: Record<
      string | number,
      // TODO: does "name" really occur twice?
      { data: { name: string }; pos_x: number; pos_y: number; name: string }
    >;
    listening_triggers?: Array<Trigger>;
    trigger_id?: string;
  };
  disabled?: boolean;
  blocking?: boolean;
  misp_core_format?: boolean;
};
