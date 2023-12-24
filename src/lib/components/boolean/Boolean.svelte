<script lang="ts">
  import Info from '$lib/components/info/Info.svelte';

  /**
   * Displays a boolean value as a text using the {@link Info} component.
   * Also parses strings to boolean. String most be either 'true' or 'false'.
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
  Displays a boolean value as a text using the {@link Info } component.
  The background is green if the value is true and red if the value is false.
  
 -->

<Info {text} class="text-white font-bold px-4 {isTrue ? '!bg-green' : '!bg-red'} {clazz}" />
