<script lang="ts">
  let clazz = '';
  /**
   * The class of this ActionBar entry.
   */
  export { clazz as class };
</script>

<label class="flex flex-col min-w-[4rem] items-center gap-2 cursor-pointer {clazz}">
  <slot />
  <span class="text-xs"><slot name="label" /></span>
</label>
