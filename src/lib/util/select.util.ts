import type Select from '$lib/components/form/Select.svelte';
import type { ComponentProps } from 'svelte';

export function genSelectProps(
  items?: ({ name?: string; id?: string } | undefined)[] | string[]
): Omit<ComponentProps<Select<string>>, 'name'> {
  if (items && isStringArray(items)) return genFromString(items);

  return {
    options:
      items?.map((x) => ({
        label: x?.name ?? 'unknown',
        value: x?.id ?? 'unknown'
      })) ?? [],
    value: items && items.length > 0 ? items[0]?.id ?? '0' : '0'
  };
}

function genFromString(items: string[]) {
  return { options: items.map((x) => ({ label: x, value: x })), value: items[0] };
}

function isStringArray(arr: unknown[]): arr is string[] {
  return arr.every((item) => typeof item === 'string');
}
