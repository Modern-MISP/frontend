export type Blueprint = {
  WorkflowBlueprint: {
    id?: string;
    uuid?: string;
    name?: string;
    description?: string;
    timestamp?: string; //datetime/number?
    default?: boolean; //tinyint?
    data?: string;
  };
};
