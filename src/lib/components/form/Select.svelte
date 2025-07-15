<svelte:options />

<script lang="ts" generics="T extends string">
  import { run } from 'svelte/legacy';

  import type { ChangeEventHandler } from 'svelte/elements';
  import { createEventDispatcher } from 'svelte';

  import Icon from '@iconify/svelte';

  interface Props {
    /**
     * The options of the select. The value is the value of the option and the label is the label of the option.
     */
    options: readonly { value: T; label: string }[];
    /**
     * The value that is currently selected.
     * Because of the template variable, full type safety should be enforced if using `const`s as options.
     */
    value?: T;
    /**
     * Name of this `select` element. Used for forms.
     */
    name?: string | undefined;
    /**
     * When true, selection is disabled.
     */
    disabled?: boolean;
    /**
     * Function that gets called when the selected value changes.
     * For most use cases, you should prefer value binding over this.
     */
    changeCallback?: ChangeEventHandler<HTMLSelectElement>;
    class?: string;
  }

  let {
    options,
    value = $bindable(options[0].value),
    name = undefined,
    disabled = false,
    changeCallback = () => {},
    class: clazz = ''
  }: Props = $props();
  /**
   * The class of the select element.
   */

  const dispatch = createEventDispatcher<{ formValue: Record<string, string> }>();
  run(() => {
    if (name) dispatch('formValue', { [name]: value });
  });

  export { options, name, disabled, changeCallback, clazz };
</script>

<!--
  @component

  A select component that uses the native select element.
  The options are passed as a prop and the value is bound to the `value` prop.
  The options prop should be an`as const` array of objects with a value and a label property to allow full type safety.

 -->
<div
  class="relative flex items-center rounded-md text-ctp-text bg-ctp-surface1 {clazz}"
  class:!bg-ctp-overlay0={disabled}
  class:cursor-not-allowed={disabled}
>
  <select
    class="w-full px-4 py-3 pr-8 transition-all rounded-md appearance-none bg-inherit pe-3"
    {name}
    {disabled}
    bind:value
    onchange={changeCallback}
  >
    {#each options as { value, label }}
      <option {value}>{label}</option>
    {/each}
  </select>

  <div class="absolute text-xl right-1">
    <Icon icon="mdi:chevron-down" />
  </div>
</div>
