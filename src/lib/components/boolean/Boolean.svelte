<script lang="ts">
  import Pill from '../pills/pill/Pill.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type Info from '$lib/components/info/Info.svelte';

  /**
   * Displays a boolean value as a text using the {@link Info} component.
   * Also parses strings to booleans. String must be either 'true' or 'false'.
   */
  export let isTrue: boolean | string = true;

  /**
   * Additional classes to be applied to the {@link Info} component.
   */
  export { clazz as class };

  let clazz = '';

  $: text = isTrue === 'true' || isTrue ? 'Yes' : 'No';
</script>

<!-- 
  @component
  Displays a boolean value as a text using the {@link Info} component.
  The background is green if the value is true and red if the value is false.
  
 -->

<Pill {text} class="text-white font-bold px-2 {isTrue ? '!bg-green' : '!bg-red'} {clazz}" />
