<script lang="ts">
  /**
   * The tooltip to show
   */
  export let tooltip;
</script>

<div class="group">
  <slot />
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
