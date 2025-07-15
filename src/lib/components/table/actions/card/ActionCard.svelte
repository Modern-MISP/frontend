<script lang="ts">
  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: clazz = '', children }: Props = $props();

  /**
   * Class overload
   */
</script>

<div class="rounded-md bg-ctp-surface0 flex flex-wrap items-center p-4 {clazz}">
  {@render children?.()}
</div>
