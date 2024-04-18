<script lang="ts">
  import Icon from '@iconify/svelte';

  /**
   * The label of the pill. Will be placed on the left side of the pill. The background of the label is `bg-crust`.
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
   * Some style overrides. When possible, the `class` prop should be used instead.
   */
  export let style = '';

  /**
   * Define the action icon. Icon is the icon name from iconify. onClick is the on:click event. class is a class overload.
   */
  export let action: { icon: string; class?: string; onClick: () => void } | undefined = undefined;

  /**
   * Pill tooltip
   */
  export let title: string | undefined = undefined;
</script>

<!-- 
  @component
  A pill component. A pill is a small rounded rectangle with a label and/or text and/or icon.

  @slot The content of the pill. If no slot is provided, the text prop will be used.
 -->

<div
  class="flex gap-2 rounded-lg bg-surface1 text-text w-fit overflow-hidden {clazz}"
  id="pill"
  {style}
  {title}
>
  {#if icon || label}
    <div class="flex items-center gap-2 px-2 py-1 text-text shrink-0 bg-crust">
      {#if icon}
        <Icon {icon} />
      {/if}

      {#if label}
        {label}
      {/if}
    </div>
  {/if}
  <div
    class="flex self-center px-2 py-1 text-left shrink line-clamp-1 flex-nowrap"
    class:pl-0={icon || label}
  >
    <slot>
      <span class="overflow-hidden w-fit text-ellipsis">
        {text}
      </span>
    </slot>
    {#if action}
      <button
        type="button"
        on:click={action.onClick}
        class="justify-center pl-1 align-middle shrink-0 {action.class ? action.class : ''}"
      >
        <Icon icon={action.icon} />
      </button>
    {/if}
  </div>
</div>
