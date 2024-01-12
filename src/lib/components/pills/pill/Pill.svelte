<script lang="ts">
  import Icon from '@iconify/svelte';

  /**
   * The label of the pill. Will be placed on the left side of the pill. The background of the label is bg-crust.
   */
  export let label: string | undefined = undefined;
  /**
   * The text of the pill. Will be placed in the middle of the pill.
   */
  export let text = '';
  /**
   * The icon of the pill. Will be placed on the left side of the pill. If a label is present, the icon will be placed on the left side of the label.
   */
  export let icon: string | undefined = undefined;

  let clazz = '';
  /**
   * Class that should be applied to the pill.
   */
  export { clazz as class };

  /**
   * Some style overrides. It is better practice to use the class prop. But is you have many different values. For example the colors of tags. You should use this prop. (using this style prop looks better then the class bg-[#${color}])
   */
  export let style = '';
</script>

<!-- 
  @component
  A pill component. A pill is a small rounded rectangle with a label and/or text and/or icon.

  @slot The content of the pill. If no slot is provided, the text prop will be used.
 -->

<div class="flex gap-2 rounded-lg bg-surface1 text-text w-fit overflow-hidden {clazz}" {style}>
  {#if icon || label}
    <div class="flex items-center gap-2 px-2 py-1 text-white bg-crust">
      {#if icon}
        <Icon {icon} />
      {/if}

      {#if label}
        {label}
      {/if}
    </div>
  {/if}
  <span class="px-2 py-1 line-clamp-1" class:pl-0={icon || label}>
    <slot>
      {text}
    </slot>
  </span>
</div>
