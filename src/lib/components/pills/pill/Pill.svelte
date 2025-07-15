<script lang="ts">
  import Icon from '@iconify/svelte';

  /**
   * Class that should be applied to the pill.
   */

  interface Props {
    /**
     * The label of the pill. Will be placed on the left side of the pill. The background of the label is `bg-ctp-crust`.
     */
    label?: string | undefined;
    /**
     * The text of the pill. Will be placed in the middle of the pill.
     */
    text?: string;
    /**
     * The icon of the pill. Will be placed on the left side of the pill. If a label is present, the icon will be placed on the left side of the label.
     */
    icon?: string | undefined;
    class?: string;
    /**
     * Some style overrides. When possible, the `class` prop should be used instead.
     */
    style?: string;
    /**
     * Define the action icon. Icon is the icon name from iconify. onClick is the on:click event. class is a class overload.
     */
    action?: { icon: string; class?: string; onClick: () => void } | undefined;
    /**
     * Pill tooltip
     */
    title?: string | undefined;
    children?: import('svelte').Snippet;
  }

  let {
    label = undefined,
    text = '',
    icon = undefined,
    class: clazz = '',
    style = '',
    action = undefined,
    title = undefined,
    children
  }: Props = $props();
</script>

<!--
  @component
  A pill component. A pill is a small rounded rectangle with a label and/or text and/or icon.

  @slot The content of the pill. If no slot is provided, the text prop will be used.
 -->

<div
  class="flex gap-2 rounded-lg bg-ctp-surface1 text-ctp-text w-fit overflow-hidden {clazz}"
  id="pill"
  {style}
  {title}
>
  {#if icon || label}
    <div class="flex items-center gap-2 px-2 py-1 text-ctp-text shrink-0 bg-ctp-crust">
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
    {#if children}{@render children()}{:else}
      <span class="overflow-hidden w-fit text-ellipsis">
        {text}
      </span>
    {/if}
    {#if action}
      <button
        type="button"
        onclick={action.onClick}
        class="justify-center pl-1 align-middle shrink-0 {action.class ? action.class : ''}"
      >
        <Icon icon={action.icon} />
      </button>
    {/if}
  </div>
</div>
