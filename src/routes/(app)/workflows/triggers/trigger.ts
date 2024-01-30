export type Trigger = {
  id?: string;
  name?: string;
  scope?: string;
  trigger_overhead?: number;
  description?: string;
  Workflow?: {
    id?: string;
    counter?: string;
    timestamp?: string;
    debug_enabled?: boolean;
    data?: Record<
      string | number,
      // TODO: does "name" really occur twice?
      { data: { name: string }; pos_x: number; pos_y: number; name: string }
    >;
  };
  disabled?: boolean;
  blocking?: boolean;
  misp_core_format?: boolean;
};
