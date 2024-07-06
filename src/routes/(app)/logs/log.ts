export type Log = {
  id?: string; //TODO should be number
  title?: string;
  created?: string;
  model?: string;
  model_id?: string; //TODO should be number
  action?: string;
  user_id?: number;
  change?: string;
  email?: string;
  org?: string;
  description?: string;
  ip?: string;
};
