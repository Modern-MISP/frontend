import type Select from '$lib/components/form/Select.svelte';
import type { ComponentProps } from 'svelte';

export function genSelectProps(
  items?: ({ name?: string; id?: string } | undefined)[]
): Omit<ComponentProps<Select<string>>, 'name'> {
  return {
    options:
      items?.map((x) => ({
        label: x?.name ?? 'unknown',
        value: x?.id ?? 'unknown'
      })) ?? [],
    value: items && items.length > 0 ? items[0]?.id ?? '0' : '0'
  };
}
