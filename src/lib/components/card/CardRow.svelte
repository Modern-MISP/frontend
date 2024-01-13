<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type Card from './Card.svelte';
  let clazz = '';
  /**
   * Additional classes to be applied to this component.
   */
  export { clazz as class };
</script>

<!-- 
  @component
  This component should be used to display rows inside of a {@link Card}.

  It's recommended to only use up to two children in the slot, which will be displayed at both ends of the row.
  
 -->
<div class="flex justify-between items-center text-lg {clazz}">
  <slot />
</div>
