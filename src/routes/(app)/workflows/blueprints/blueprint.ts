export type Blueprint = {
  id?: number;
  uuid?: string;
  name?: string;
  description?: string;
  timestamp?: number; //datetime?
  default?: number; //bool/tinyint
  data?: string;
};
