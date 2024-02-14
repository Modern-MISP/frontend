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
  export let name: string | undefined = undefined;

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
   * When true, the input is disabled an cannot be changed.
   */
  export let disabled: boolean = false;

  /**
   * Additional classes to be applied.
   */
  export { clazz as class };

  let clazz = '';

  const dispatch = createEventDispatcher<{ value: string; formValue: Record<string, string> }>();

  const id = crypto.randomUUID();

  let inputElement: HTMLInputElement;

  /**
   * Sets the inner input's value.
   * @param value The value to use.
   */
  export function setValue(value: string) {
    inputElement.value = value;
  }
</script>

<!-- 
  @component
  The default input component. A prefix icon can be added inside of the `icon` slot, and/or a suffix icon in the `suffix` slot.

  In order to use this component in forms, the `name` prop should be set.

  You can also set the value prop, if you want to set an initial value. Or bind to it if you want to use this outside of a form.
  You can also set the placeholder prop, if you want to set an placeholder. 
 -->

<label
  class="relative flex items-center gap-2 px-4 py-2 text-text rounded-lg bg-surface1 cursor-text {clazz}"
  class:!bg-overlay0={disabled}
  class:!cursor-not-allowed={disabled}
>
  <slot name="icon">
    {#if icon}
      <Icon {icon} />
    {/if}
  </slot>
  <input
    on:input={({ currentTarget }) => {
      if (name) dispatch('formValue', { [name]: currentTarget.value });
      dispatch('value', currentTarget.value);
    }}
    on:blur
    on:focus
    {id}
    {placeholder}
    {name}
    {type}
    {value}
    {disabled}
    class="w-full placeholder-transparent rounded-lg outline-none bg-inherit peer cursor-inherit"
    bind:this={inputElement}
  />
  {#if placeholder && (!disabled || !value)}
    <label
      for={id}
      class="rounded-md absolute bg-inherit -top-3 left-2 px-2 text-sm transition-all
			peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2
			peer-focus:-top-3 peer-focus:text-sm peer-focus:text-inherit peer-focus:left-2 peer-focus-within:translate-y-0 cursor-inherit"
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
