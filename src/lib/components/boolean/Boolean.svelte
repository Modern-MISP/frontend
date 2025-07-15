<script lang="ts">
  import Pill from '../pills/pill/Pill.svelte';

  /**
   * Additional classes to be applied to the {@link Pill} component.
   */

  interface Props {
    /**
     * Displays a boolean value as a text using the {@link Pill} component.
     * Also parses strings to booleans. String must be either 'true' or 'false'.
     */
    isTrue?: boolean | string;
    class?: string;
  }

  let { isTrue = true, class: clazz = '' }: Props = $props();

  let text = $derived(isTrue === 'true' || isTrue ? 'Yes' : 'No');
</script>

<!--
  @component
  Displays a boolean value as a text using the {@link Pill} component.
  The background is green if the value is true and red if the value is false.

 -->

<Pill
  class="text-white font-bold w-16! justify-center items-center px-2 {isTrue
    ? 'bg-ctp-green!'
    : 'bg-ctp-red!'} {clazz}"
>
  <span class="w-full text-center">
    {text}
  </span></Pill
>
