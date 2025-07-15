<script lang="ts">
  interface Props {
    /**
     * The url to navigate to when clicking on the `td`.
     */
    href?: string | undefined;
    children?: import('svelte').Snippet;
  }

  let { href = undefined, children }: Props = $props();
</script>

<!--
  @component
  Creates an HTML [`td`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) element for the table with specific styling.

  @slot - The content of the td.

 -->

<a class="border-t border-text h-full table-cell" {href}>
  <div class="p-4">
    {@render children?.()}
  </div>
</a>
