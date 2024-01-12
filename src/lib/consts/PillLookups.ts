import type Pill from '$lib/components/pills/pill/Pill.svelte';
import type { ComponentProps } from 'svelte';

export const THREAT_LEVEL_LOOKUP: ComponentProps<Pill>[] = [
  {
    text: 'undefined',
    icon: 'mdi:help-circle-outline'
  },
  {
    text: 'low',
    icon: 'mdi:chevron-up',
    class: 'text-green uppercase'
  },
  {
    text: 'medium',
    icon: 'mdi:chevron-double-up',
    class: 'text-peach uppercase'
  },
  {
    text: 'high',
    icon: 'mdi:chevron-triple-up',
    class: '!text-red uppercase'
  }
];
export const ANALYSIS_LOOKUP: ComponentProps<Pill>[] = [
  {
    text: 'initial',
    icon: 'mdi:progress-question'
  },
  {
    text: 'ongoing',
    icon: 'mdi:progress-clock',
    class: 'text-peach uppercase'
  },
  {
    text: 'complete',
    icon: 'mdi:progress-check',
    class: 'text-green uppercase'
  }
];

export const DISTRIBUTION_LOOKUP: ComponentProps<Pill>[] = [
  {
    text: 'Your organization only',
    icon: 'mdi:circle'
  },
  {
    text: 'This community only',
    icon: 'mdi:circle'
  },
  {
    text: 'Connected communities',
    icon: 'mdi:circle'
  },
  {
    text: 'All communities',
    icon: 'mdi:circle'
  },
  {
    text: 'Sharing group',
    icon: 'mdi:circle'
  },
  {
    text: 'Inherit Event',
    icon: 'mdi:circle'
  }
];
