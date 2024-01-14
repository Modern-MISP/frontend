<script lang="ts">
  /**
   * The url to navigate to when clicking on the `td`.
   */
  export let href: string | undefined = undefined;
</script>

<!-- 
  @component
  Creates an HTML [`td`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) element for the table with specific styling.
  
  @slot - The content of the td.

 -->

<a class="border-t-[1px] border-text h-full table-cell" {href}>
  <div class="p-4">
    <slot />
  </div>
</a>
