<script lang="ts">
  let clazz = '';

  /**
   * Additional classes to be applied to this component
   */
  export { clazz as class };
</script>

<!-- 
  @component
  A button with a slot for content.

  @example 
  ```svelte
  <Button>
      <b>name</b>
      <Icon icon="mdi-light:home" class="w-8 h-8" />
  </Button>
  ```
 -->

<button
  on:click
  class="flex justify-between p-4 rounded-md bg-crust w-full items-center text-text text-lg font-bold {clazz}"
>
  <slot />
</button>
