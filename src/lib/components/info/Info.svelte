<script lang="ts">
  /**
   * Additional classes to be applied.
   */

  interface Props {
    /**
     * The text to be displayed.
     */
    text?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { text = '', class: clazz = '', children }: Props = $props();
</script>

<!--
  @component
  Displays a text with a default background color of `surface1`. Also sets the default padding and border radius. You can override this by passing your own classes.

 -->
<div class="p-2 rounded-md bg-ctp-surface1 text-ctp-text w-fit {clazz} text-center">
  {#if children}{@render children()}{:else}
    {text}
  {/if}
</div>
