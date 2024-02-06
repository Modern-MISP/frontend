<script lang="ts">
  import Icon from '@iconify/svelte';
  import Pill from '../pills/pill/Pill.svelte';
  import type { ComponentProps } from 'svelte';

  /** The items that have been picked. */
  export let pickedItems: ComponentProps<Pill>[] = [];
  /** The items that can be picked. */
  export let pickableItems: ComponentProps<Pill>[] = [];
  /** The items that are completions for the current input. */
  // let autocompleteItems = pickableItems;

  /**
   * Placeholder of the input.
   */
  export let placeholder: string | undefined = undefined;
  /**
   * The name of the input. Used for form submission.
   */
  export let name = 'default';

  let value: string = '';

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!value) return;
      const match = pickableItems.find((x) => x.text?.includes(value));
      if (!match) return;
      pickedItems = [...pickedItems, match];
    } else if (event.key === 'Backspace' && value === '') {
      event.preventDefault();
      pickedItems = pickedItems.slice(0, -1);
    }
  }
</script>

<!--
  @component
  
  An input for picking from a list of pre-defined items.
-->
<div class="box-border relative overflow-visible">
  <div class="flex flex-row flex-wrap items-center gap-2 p-2 rounded-lg bg-crust w-fit">
    <ul class="flex flex-wrap gap-1 bg-inherit">
      {#each pickedItems as props, i}
        <li>
          <Pill {...props} class="border-2 border-surface0 {props.class}">
            {props.text}
            <button
              on:click={() => (pickedItems = pickedItems.filter((_, index) => index !== i))}
              class="align-middle hover:text-red"
            >
              <Icon icon="mdi:close-circle-outline" />
            </button>
          </Pill>
        </li>
      {/each}
    </ul>
    <input
      class="m-2 outline-none bg-inherit text-text"
      type="text"
      {name}
      {placeholder}
      bind:value
      on:keydown={onKeyDown}
    />
    <!-- <div class="absolute top-full left-0 right-0 bg-white z-[99] overflow-visible">
      {#each autocompleteItems as item}
        <div>{item}</div>
      {/each}
    </div> -->
  </div>
</div>
