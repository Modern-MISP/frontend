<script lang="ts">
  import Icon from '@iconify/svelte';
  import { createEventDispatcher } from 'svelte';
  import type { HTMLInputTypeAttribute } from 'svelte/elements';

  /**
   * Placeholder of the input.
   */
  export let placeholder: string | undefined = undefined;
  /**
   * The name of the input. Used for the label and for form submission.
   */
  export let name = 'default';

  /**
   * The current value of the input.
   */
  export let value = '';

  /**
   * The icon to be displayed inside of the input.
   */
  export let icon: string | undefined = undefined;

  /**
   * The type of the input.
   */
  export let type: HTMLInputTypeAttribute = 'text';

  /**
   * Additional classes to be applied.
   */
  export { clazz as class };

  let clazz = '';

  const dispatch = createEventDispatcher<{ value: string }>();
</script>

<!-- 
  @component
  The default input component. A prefix icon can be added inside of the `icon` slot, and/or a suffix icon in the `suffix` slot.

  In order to use this component in forms, the `name` prop should be set.

  You can also set the value prop, if you want to set an initial value. Or bind to it if you want to use this outside of a form.
  You can also set the placeholder prop, if you want to set an placeholder. 
 -->

<label class="relative flex items-center gap-2 px-2 py-2 bg-crust text-text rounded-lg {clazz}">
  <slot name="icon">
    {#if icon}
      <Icon {icon} />
    {/if}
  </slot>
  <input
    on:input={({ currentTarget }) => dispatch('value', currentTarget.value)}
    on:blur
    on:focus
    id={name}
    {placeholder}
    {name}
    {type}
    {value}
    class="w-full placeholder-transparent rounded-lg outline-none bg-inherit peer"
  />
  {#if placeholder}
    <label
      for={name}
      class="rounded-md absolute bg-inherit px-2 -top-3 left-2 text-sm transition-all
			peer-placeholder-shown:text-text peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2
			peer-focus:-top-3 peer-focus:text-sm peer-focus:text-inherit peer-focus:left-2 peer-focus-within:translate-y-0"
      class:peer-placeholder-shown:left-9={$$slots.icon || icon}
    >
      {placeholder}</label
    >
  {/if}
  <slot name="suffix" />
</label>

<style lang="postcss">
  input::-webkit-inner-spin-button,
  input::-webkit-calendar-picker-indicator {
    background-color: theme('colors.sky.DEFAULT');
    display: none;
    -webkit-appearance: none;
  }
</style>
