import type { ComponentProps } from 'svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';

export const errorPill = (text: string): ComponentProps<Pill> => ({
  class: '!text-red',
  text,
  icon: 'mdi:alert-circle-outline'
});

export const successPill = (text: string): ComponentProps<Pill> => ({
  class: '!text-green',
  text,
  icon: 'mdi:check-circle-outline'
});
