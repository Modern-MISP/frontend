import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

export type ITableHead<
  Value,
  DisplayComp extends SvelteComponent | undefined = SvelteComponent | undefined,
  DefaultValueReturn = string
> = {
  key: string;
  label: string;
  display?: DisplayComp extends SvelteComponent ? ComponentType<DisplayComp> : undefined;
  value: (
    value: Value
  ) => DisplayComp extends SvelteComponent ? ComponentProps<DisplayComp> : DefaultValueReturn;
};
