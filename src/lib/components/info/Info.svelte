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
<div class="p-2 rounded-md bg-ctp-surface1 text-ctp-text w-fit {clazz} text-center">
  <slot>
    {text}
  </slot>
</div>
