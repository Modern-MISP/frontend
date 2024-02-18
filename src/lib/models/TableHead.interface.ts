import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

export type TableHead<
  Value,
  DisplayComp extends SvelteComponent | undefined = SvelteComponent | undefined,
  DefaultValueReturn = string
> = {
  label: string;
  value: (value: Value) => DisplayComp extends SvelteComponent
    ? {
        display: ComponentType<DisplayComp>;
        props: ComponentProps<DisplayComp>;
      }
    : DefaultValueReturn;
};
