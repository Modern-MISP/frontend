<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import Pill from '../pill/Pill.svelte';

  /**
   * The index corresponding to the entry in the `options` array.
   */
  export let value: number = 0;
  /**
   * Array with props of {@link Pill}s, indexed by `value`.
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
  Converts the value given by the `value` prop to an entry from the `options` lookup array and displays the result as a pill.
 -->

<Pill {...options[value]} class="{clazz} w-max" />
