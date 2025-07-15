<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import Icon from '@iconify/svelte';

  /**
   * Additional classes to be applied to this component.
   */

  interface Props {
    class?: string;
    /**
     * The prefix icon to be displayed inside of the input.
     */
    prefixIcon?: string | undefined;
    /**
     * The suffix icon to be displayed inside of the input.
     */
    suffixIcon?: string | undefined;
    /**
     * Specify the button type. Default is button
     */
    type?: 'submit' | 'reset' | 'button' | undefined | null;
    children?: import('svelte').Snippet;
  }

  let {
    class: clazz = '',
    prefixIcon = undefined,
    suffixIcon = undefined,
    type = 'button',
    children
  }: Props = $props();
</script>

<!--
  @component
  A button with a slot for content.
 -->

<button
  onclick={bubble('click')}
  class="flex gap-4 justify-between p-4 rounded-md bg-ctp-surface1 w-full items-center font-bold {clazz}"
  {type}
>
  {#if prefixIcon}
    <Icon icon={prefixIcon} />
  {/if}
  {@render children?.()}

  {#if suffixIcon}
    <Icon icon={suffixIcon} />
  {/if}
</button>
