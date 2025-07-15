<script lang="ts">
  /**
   * Additional classes to be applied to this component.
   */

  interface Props {
    class?: string;
    /**
     * Title of this component.
     */
    title?: string;
    children?: import('svelte').Snippet;
  }

  let { class: clazz = '', title = '', children }: Props = $props();
</script>

<!--
  @component
  A card with a slot for content.
  Sets the default padding and border radius. You can override this by passing your own classes.

 -->
<div
  class="flex gap-4 flex-col text-ctp-text w-full h-full p-4 rounded-lg bg-ctp-surface0 overflow-auto {clazz}"
  {title}
>
  {@render children?.()}
</div>
