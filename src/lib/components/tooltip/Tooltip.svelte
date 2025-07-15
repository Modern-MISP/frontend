<script lang="ts">
  interface Props {
    /**
     * The tooltip to show
     */
    tooltip: any;
    children?: import('svelte').Snippet;
  }

  let { tooltip, children }: Props = $props();
</script>

<div class="group">
  {@render children?.()}
  <div
    class="group-hover:opacity-100
    group-hover:w-[10em]
    w-0
    opacity-0
    text-center
    z-20
    bg-gray-800 p-2 text-sm text-gray-100 rounded-md -translate-x-3/4 absolute"
  >
    {tooltip}
  </div>
</div>
