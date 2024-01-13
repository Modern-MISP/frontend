<script lang="ts">
  /**
   * The text to be displayed.
   */
  export let text: string = '';
  /**
   * Additional classes to be applied.
   */
  export { clazz as class };

  let clazz = '';
</script>

<!-- 
  @component
  Displays a text with a default background color of `surface1`. Also sets the default padding and border radius. You can override this by passing your own classes.
  
 -->
<div class="p-2 rounded-md bg-surface1 text-text w-fit {clazz}">
  <slot>
    {text}
  </slot>
</div>
