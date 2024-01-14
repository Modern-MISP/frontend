<script lang="ts" generics="T extends string">
  import Icon from '@iconify/svelte';

  /**
   * The options of the select. The value is the value of the option and the label is the label of the option.
   */
  export let options: readonly { value: T; label: string }[];
  /**
   * The value that is currently selected.
   * Because of the template variable, full type safety should be enforced if using `const`s as options.
   */
  export let value: T;
  /**
   * Name of this `select` element. Used for forms.
   */
  export let name: string | undefined = undefined;
</script>

<!-- 
  @component
  
  A select component that uses the native select element.
  The options are passed as a prop and the value is bound to the `value` prop.
  The options prop should be an`as const` array of objects with a value and a label property to allow full type safety.
  
 -->
<div class="relative flex items-center rounded-md bg-crust text-text">
  <select
    class="w-full px-4 py-3 pr-8 transition-all rounded-md appearance-none bg-crust pe-3"
    {name}
    bind:value
  >
    {#each options as { value, label }}
      <option {value}>{label}</option>
    {/each}
  </select>

  <div class="absolute text-xl right-1">
    <Icon icon="mdi:chevron-down" />
  </div>
</div>
