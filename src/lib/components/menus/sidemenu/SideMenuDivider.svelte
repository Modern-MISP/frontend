<script lang="ts">
  interface Props {
    class?: string;
  }

  let { class: clazz = '' }: Props = $props();
  /**
   * Additional classes to be applied.
   */
</script>

<!--
  @component
  A divider for the side menu.

 -->
<hr class="w-[80%] mx-auto border-text {clazz}" />
