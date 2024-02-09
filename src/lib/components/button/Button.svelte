<script lang="ts">
  import Icon from '@iconify/svelte';

  let clazz = '';

  /**
   * Additional classes to be applied to this component.
   */
  export { clazz as class };

  /**
   * The prefix icon to be displayed inside of the input.
   */
  export let prefixIcon: string | undefined = undefined;

  /**
   * The suffix icon to be displayed inside of the input.
   */
  export let suffixIcon: string | undefined = undefined;
</script>

<!-- 
  @component
  A button with a slot for content.
 -->

<button
  on:click
  class="flex gap-4 justify-between p-4 rounded-md bg-surface1 w-full items-center text-lg font-bold {clazz}"
>
  {#if prefixIcon}
    <Icon icon={prefixIcon} />
  {/if}
  <slot />

  {#if suffixIcon}
    <Icon icon={suffixIcon} />
  {/if}
</button>
