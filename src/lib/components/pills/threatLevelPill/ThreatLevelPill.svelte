<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Pill from '../pill/Pill.svelte';

  /**
   * The threat level number of the the event.
   * - 0: undefined
   * - 1: low
   * - 2: medium
   * - 3: high
   *
   */
  export let threatLevel: number = 0;
  const numberLookUp: ComponentProps<Pill>[] = [
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
</script>

<!-- 
  @component
  Converts a threat level number to the equivalent text. Uses the {@link Pill} component to display the text and icon.
    - 0: undefined
    - 1: low
    - 2: medium
    - 3: high
 -->

<Pill {...numberLookUp[threatLevel]} />
