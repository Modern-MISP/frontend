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
  Converts the value given by the value prop to an entry from the lookup and displays the result as a pill.
 -->

<Pill {...options[value]} class={clazz} />
