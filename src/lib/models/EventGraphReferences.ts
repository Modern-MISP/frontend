export type EventGraphReferences = {
  available_pivot_key: string[];
  existing_object_relation: Record<string, number>;
  existing_tags: Record<number, string>;
  items: {
    id: string;
    label: string;
    node_type: string;
    type: string;
    uuid: string;
    comment: string;
    event_id: string;
  }[];
  relations: {
    comment: string;
    event_id: string;
    from: string;
    id: string;
    to: string;
    type: string;
    uuid: string;
  }[];
};
