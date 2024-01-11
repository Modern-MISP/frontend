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
  export let analysis: number = 0;
  const numberLookUp: ComponentProps<Pill>[] = [
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
</script>

<!-- 
  @component
  Converts a threat level number to the equivalent text. Uses the {@link Pill} component to display the text and icon.
    - 0: undefined
    - 1: low
    - 2: medium
    - 3: high
 -->

<Pill {...numberLookUp[analysis]} />
