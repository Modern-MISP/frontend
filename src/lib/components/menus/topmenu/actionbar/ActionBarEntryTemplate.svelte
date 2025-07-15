<script lang="ts">
  interface Props {
    /** When true, the action cannot be clicked. */
    disabled?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    label?: import('svelte').Snippet;
  }

  let { disabled = false, class: clazz = '', children, label }: Props = $props();
  /**
   * The class of this ActionBar entry.
   */
</script>

<label
  class="flex flex-col min-w-16 items-center gap-2 {clazz}"
  class:cursor-pointer={!disabled}
  class:cursor-not-allowed={disabled}
  class:text-subtext0={disabled}
>
  {@render children?.()}
  <span class="text-xs">{@render label?.()}</span>
</label>
