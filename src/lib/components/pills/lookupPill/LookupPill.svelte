<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Pill from '../pill/Pill.svelte';

  /**
   * The number that is corresponding to the entry inside of the numberLookUp array.
   */
  export let value: number = 0;
  /**
   * The array that props of a pill.
   */
  export let options: ComponentProps<Pill>[];

  let clazz = '';

  /**
   * The class of the pill.
   */
  export { clazz as class };
</script>

<!-- 
  @component
  Converts a threat level number to the equivalent text. Uses the {@link Pill} component to display the text and icon.
    - 0: undefined
    - 1: low
    - 2: medium
    - 3: high
 -->

<Pill {...options[value]} class={clazz} />
