<script lang="ts">
  /** When true, the action cannot be clicked. */
  export let disabled: boolean = false;

  let clazz = '';
  /**
   * The class of this ActionBar entry.
   */
  export { clazz as class };
</script>

<label
  class="flex flex-col min-w-[4rem] items-center gap-2 {clazz}"
  class:cursor-pointer={!disabled}
  class:cursor-not-allowed={disabled}
  class:text-subtext0={disabled}
>
  <slot />
  <span class="text-xs"><slot name="label" /></span>
</label>
