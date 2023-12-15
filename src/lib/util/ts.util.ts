export type FlatUnion<T> = {
  [K in keyof T]: T[K];
};
