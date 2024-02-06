<script lang="ts">
  import Icon from "@iconify/svelte";
  import Pill from "../pills/pill/Pill.svelte";

  /** The items that have been picked. */
  export let pickedItems: Set<string> = new Set();
  /** The items that can be picked. */
  export let pickableItems: Set<string>;
  /** The items that are completions for the current input. */
  let autocompleteItems = pickableItems;
  
  /**
   * Placeholder of the input.
   */
  export let placeholder: string | undefined = undefined;
  /**
   * The name of the input. Used for form submission.
   */
  export let name = 'default';
  /**
   * Callback to define the icon that is displayed in an item's pill.
   * @returns iconify string
   */
  export let icon: (item: string) => string = () => '';
  /**
   * Callback to define the label that is displayed in an item's pill.
   * @returns label string
   */
   export let label: (item: string) => string = () => '';

  let value: string = '';

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (value === '') return;
      event.preventDefault();
      pickedItems = pickedItems.add(value);
      value = '';
    } else if (event.key === 'Backspace' && value === '') {
      event.preventDefault();
      value = Array.from(pickedItems).pop() ?? '';
      deleteItem(value);
    }
  }

  function deleteItem(item: string) {
    pickedItems.delete(item);
    pickedItems = pickedItems;
  }
</script>

<!--
  @component
  
  An input for picking from a list of pre-defined items.
-->
<div class="relative box-border overflow-visible">
  <div class="flex flex-row flex-wrap gap-2 bg-crust w-fit p-2 rounded-lg items-center">
    <ul class="flex flex-wrap bg-inherit gap-1">
      {#each pickedItems as item}
        <li>
          <Pill icon={icon(item)} label={label(item)} class="border-2 border-surface0">
            {item}
            <button on:click={() => deleteItem(item)} class="hover:text-red align-middle">
              <Icon icon="iconoir:delete-circle"/>
            </button>
          </Pill>
        </li>
      {/each}
    </ul>
    <input
      class="bg-inherit text-text outline-none m-2"
      type="text"
      {name}
      {placeholder}
      bind:value
      on:keydown={onKeyDown}
    />
    <div class="absolute top-full left-0 right-0 bg-white z-[99] overflow-visible">
      {#each autocompleteItems as item}
        <div>{item}</div>
      {/each}
    </div>
  </div>
</div>