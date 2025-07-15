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

<h1 class="text-2xl font-bold text-ctp-sky {clazz}">{@render children?.()}</h1>
