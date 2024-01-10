<script lang="ts">
  /**
   * The url to navigate to when clicking on the td.
   */
  export let href: string | undefined = undefined;
</script>

<!-- 
  @component
  @slot - The content of the td.
  @prop href - The url to navigate to when clicking on the td.

  Create an td element for the table with specific styling.
  
 -->

<a class="border-t-[1px] border-text h-full table-cell" {href}>
  <div class="p-4">
    <slot />
  </div>
</a>
