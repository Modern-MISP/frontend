<script lang="ts">
  import CardRow from '$lib/components/card/CardRow.svelte';

  let clazz = '';
  /**
   * Additional classes to be applied to this component.
   */
  export { clazz as class };
</script>

<!-- 
  @component
  A row of icon cards
  Sets the default padding and border radius. You can override this by passing your own classes.
  
 -->
<CardRow class="rounded-lg bg-surface0 {clazz}">
  <slot />
</CardRow>
