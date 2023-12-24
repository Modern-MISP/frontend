<script lang="ts">
  /**
   * the placeholder of the input.
   */
  export let placeholder: string;
  /**
   * the name of the input. Used for the label and for form submission
   */
  export let name = 'default';

  /**
   * the current value of the input
   */
  export let value = '';

  /**
   * Additional classes to be applied.
   */
  export { clazz as class };

  let clazz = '';
</script>

<!-- 
  @component
  The default input component. You can add a prefix icon inside of the "icon" slot and / or a suffix icon in the "suffix" slot.
  You should set the name prop, if you want to use this component inside of a form.
  You can also set the value prop, if you want to set an initial value. Or bind to it if you want to use this outside of a form.
  You can also set the placeholder prop, if you want to set an placeholder. This is recommended.
 -->

<label class="relative flex items-center gap-2 px-2 py-2 bg-crust text-text rounded-lg {clazz}">
  <slot name="icon" />
  <input
    type="text"
    id={name}
    {placeholder}
    {name}
    bind:value
    on:blur
    on:focus
    class="w-full placeholder-transparent rounded-lg outline-none bg-inherit peer"
  />
  <label
    for={name}
    class="rounded-md absolute bg-inherit px-2 -top-3 left-2 text-sm transition-all
			peer-placeholder-shown:text-text peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2
			peer-focus:-top-3 peer-focus:text-sm peer-focus:text-inherit peer-focus:left-2 peer-focus-within:translate-y-0"
    class:peer-placeholder-shown:left-9={$$slots.icon}
  >
    {placeholder}</label
  >

  <slot name="suffix" />
</label>
