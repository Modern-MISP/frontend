<!-- 
  @component

  @slot the full table. 
  @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
  
  Create an table element with specific styling.
  
 -->
<div class="w-full h-full overflow-auto text-lg rounded-lg text-text bg-surface0">
  <table class="w-full border-collapse">
    <slot />
  </table>
</div>
