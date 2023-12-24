<script>
  let clazz = '';
  /**
   * Additional classes to be applied to this component
   */
  export { clazz as class };
</script>

<!-- 
  @component
  If you want too display rows inside of a card, use this component.
  You should probably just input two children to the slot. Because of the flexbox, the children will at the outsides of the row (justify between). 
  
 -->
<div class="flex justify-between items-center text-lg {clazz}">
  <slot />
</div>
