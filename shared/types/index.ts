export type LeafPartial<T> = {
  [K in keyof T]: T[K] extends object ? LeafPartial<T[K]> : T[K] | undefined;
};
