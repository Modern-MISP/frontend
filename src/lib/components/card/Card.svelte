<script lang="ts">
  let clazz = '';
  /**
   * Additional classes to be applied to this component.
   */
  export { clazz as class };

  /**
   * Title of this component.
   */
  export let title = '';
</script>

<!-- 
  @component
  A card with a slot for content.
  Sets the default padding and border radius. You can override this by passing your own classes.
  
 -->
<div
  class="flex gap-4 flex-col text-text w-full h-full p-4 rounded-lg bg-surface0 resize-x overflow-auto {clazz}"
  {title}
>
  <slot />
</div>
