<script lang="ts">
  import Pill from '../pills/pill/Pill.svelte';

  /**
   * Displays a boolean value as a text using the {@link Pill} component.
   * Also parses strings to booleans. String must be either 'true' or 'false'.
   */
  export let isTrue: boolean | string = true;

  /**
   * Additional classes to be applied to the {@link Pill} component.
   */
  export { clazz as class };

  let clazz = '';

  $: text = isTrue === 'true' || isTrue ? 'Yes' : 'No';
</script>

<!-- 
  @component
  Displays a boolean value as a text using the {@link Pill} component.
  The background is green if the value is true and red if the value is false.
  
 -->

<Pill
  class="text-white font-bold !w-16  items-center px-2 {isTrue ? '!bg-green' : '!bg-red'} {clazz}"
>
  <span class="w-full text-center">
    {text}
  </span></Pill
>
