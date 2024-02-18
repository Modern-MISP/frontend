import type Pill from '$lib/components/pills/pill/Pill.svelte';
import type { ComponentProps } from 'svelte';

/**
 * The pill that can be picked.
 */
export type PickerPill<T = unknown> = ComponentProps<Pill> & {
  value?: string;
} & T;
