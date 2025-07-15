<script lang="ts">
  import { run, createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import Icon from '@iconify/svelte';
  import { createEventDispatcher } from 'svelte';
  import type { HTMLInputTypeAttribute } from 'svelte/elements';
  import { v4 as uuidv4 } from 'uuid';

  /**
   * Additional classes to be applied.
   */

  interface Props {
    /**
     * Datalist (values) of the input
     */
    datalist?: string[] | undefined;
    /**
     * Placeholder of the input.
     */
    placeholder?: string | undefined;
    /**
     * The name of the input. Used for the label and for form submission.
     */
    name?: string | undefined;
    /**
     * The current value of the input.
     */
    value?: string;
    /**
     * The icon to be displayed inside of the input.
     */
    icon?: string | undefined;
    /**
     * The type of the input.
     */
    type?: HTMLInputTypeAttribute;
    /**
     * When true, the input is disabled an cannot be changed.
     */
    disabled?: boolean;
    /**
     * When true, the input is readonly, cannot be changed. Will still be submitted in a form
     */
    readonly?: boolean;
    /**
     * Whether the input is required.
     */
    required?: boolean;
    /**
     * The title to apply to the input.
     */
    title?: string | undefined;
    class?: string;
    s_icon?: import('svelte').Snippet;
    suffix?: import('svelte').Snippet;
  }

  let {
    datalist = undefined,
    placeholder = undefined,
    name = undefined,
    value = '',
    icon = undefined,
    type = 'text',
    disabled = false,
    readonly = false,
    required = false,
    title = undefined,
    class: clazz = '',
    s_icon,
    suffix
  }: Props = $props();

  const dispatch = createEventDispatcher<{ value: string; formValue: Record<string, string> }>();

  const id = uuidv4();

  let inputElement: HTMLInputElement = $state();

  let datalist_id = $state(undefined);
  run(() => {
    if (datalist?.length > 0) {
      datalist_id = uuidv4();
    }
  });

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

{#if datalist}
  <datalist id={datalist_id}>
    {#each datalist as val}
      <option value={val}></option>
    {/each}
  </datalist>
{/if}
<label
  class="relative flex items-center gap-2 px-4 py-2 text-ctp-text rounded-lg bg-ctp-surface1 cursor-text {clazz}"
  class:!bg-ctp-overlay0={disabled}
  class:!cursor-not-allowed={disabled}
  {title}
>
  {#if s_icon}{@render s_icon()}{:else if icon}
    <Icon {icon} />
  {/if}
  <input
    oninput={({ currentTarget }) => {
      if (name) dispatch('formValue', { [name]: currentTarget.value });
      dispatch('value', currentTarget.value);
    }}
    onblur={bubble('blur')}
    onfocus={bubble('focus')}
    {id}
    {placeholder}
    {name}
    {type}
    {value}
    {disabled}
    {readonly}
    {required}
    list={datalist_id}
    class="w-full placeholder-transparent rounded-lg outline-none bg-inherit peer cursor-inherit"
    bind:this={inputElement}
  />
  {#if placeholder && (!disabled || !value)}
    <label
      for={id}
      class="rounded-md absolute bg-inherit -top-3 left-2 px-2 text-sm transition-all
			peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2
			peer-focus:-top-3 peer-focus:text-sm peer-focus:text-inherit peer-focus:left-2 peer-focus-within:translate-y-0 cursor-inherit"
      class:peer-placeholder-shown:left-9={s_icon || icon}
    >
      {placeholder}</label
    >
  {/if}
  {@render suffix?.()}
</label>

<style lang="postcss">
  input::-webkit-inner-spin-button,
  input::-webkit-calendar-picker-indicator {
    background-color: theme('colors.sky.DEFAULT');
    display: none;
    -webkit-appearance: none;
  }
</style>
