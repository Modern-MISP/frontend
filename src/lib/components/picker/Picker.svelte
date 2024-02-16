<script lang="ts">
  import type { PickerPill } from '$lib/models/Picker.interface';
  import Icon from '@iconify/svelte';
  import { remove, sortBy } from 'lodash-es';
  import { createEventDispatcher } from 'svelte';
  import Pill from '../pills/pill/Pill.svelte';

  /** The items that have been picked. */
  export let pickedItems: PickerPill[] = [];
  /** The items that can be picked. */
  export let pickableItems: PickerPill[] = [];

  /**
   * Placeholder of the input.
   */
  export let placeholder: string | undefined = undefined;
  /**
   * Popup Class Override
   */
  export let popUpClass: string = '';
  /**
   * The name of the input. Used for form submission.
   */
  export let name: string | undefined = undefined;
  /**
   * When true, the picker cannot be used.
   */
  export let disabled: boolean = false;

  /**
   * Max Elements to show for Autocomplete
   */
  export let maxAutoComplete = 50;

  /**
   * Allow inputting arbitrary
   */
  export let arbitraryInput: ((x: string) => PickerPill) | undefined = undefined;

  let value: string = '';

  /**
   * Override the match function while typing in the input
   * @param pill The pill
   * @param value the input value
   * @returns true if the pill should match the value
   */
  export let matchFunction: (pill: PickerPill, value: string) => boolean | undefined = (
    pill: PickerPill,
    value: string
  ) => pill.text?.includes(value);

  /**
   * Adds the current value to pickedItems if possible.
   */
  function addValue() {
    if (!value) return;
    // Match should be  first element in the autocomplete.
    const match = autocomplete[0];
    if (!match) return;
    pickedItems = [...pickedItems, match];
    pickableItems = pickableItems.filter((x) => x !== match);
    value = '';
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addValue();
      return;
    }
    if (event.key === 'Backspace' && value === '') {
      event.preventDefault();
      if (pickedItems.length === 0) return;
      value = pickedItems.slice(-1)[0].text ?? '';
      [pickedItems, pickableItems] = removeFromAddToIndex(
        pickedItems,
        pickableItems,
        pickedItems.length - 1
      );
      return;
    }
  }

  function removeFromAddToIndex<T>(source: T[], target: T[], index: number) {
    target.push(remove(source, (_, i) => i === index)[0]);
    return [source, target];
  }

  $: autocomplete = pickableItems.filter((x) => matchFunction(x, value)).slice(0, maxAutoComplete);

  // If you do not find any value, add the arbitrary Input.
  $: if (autocomplete.length === 0 && arbitraryInput) autocomplete = [arbitraryInput(value)];
  $: pickableItems = sortBy(pickableItems, ['text', 'label', 'icon']); // enforce sorted order

  const dispatch = createEventDispatcher<{ formValue: Record<string, PickerPill[]> }>();
  $: if (name) dispatch('formValue', { [name]: pickedItems });

  let input: HTMLInputElement;
</script>

<!--
  @component
  
  An input for picking from a list of pre-defined items.
-->
<div class="box-border relative overflow-visible">
  <div
    class="flex flex-col items-start w-full gap-2 p-2 rounded-lg"
    class:bg-surface1={!disabled}
    class:bg-overlay0={disabled}
    class:cursor-not-allowed={disabled}
  >
    {#if pickedItems.length > 0}
      <div class="flex flex-wrap w-full gap-1 overflow-hidden rounded-md bg-inherit">
        {#each pickedItems as props, i}
          <Pill {...props} class="border-2 border-surface0 w-max {props.class}">
            <span class="flex overflow-hidden shrink line-clamp-1">
              {props.text?.trim()}
            </span>
            {#if !disabled}
              <button
                type="button"
                on:click={() => {
                  [pickedItems, pickableItems] = removeFromAddToIndex(
                    pickedItems,
                    pickableItems,
                    i
                  );
                }}
                class="justify-center pl-1 align-middle hover:text-red shrink-0"
              >
                <Icon icon="mdi:close-circle-outline" />
              </button>
            {/if}
          </Pill>
        {/each}
      </div>
    {/if}
    <input
      bind:this={input}
      class="w-full h-full m-2 outline-none bg-inherit text-text"
      type="text"
      {placeholder}
      {disabled}
      bind:value
      on:keydown={onKeyDown}
    />
    {#if value !== '' && autocomplete.length > 0}
      <div
        class="absolute left-0 max-h-80 gap-1 mt-1 flex-wrap w-full z-10 flex p-4 overflow-auto rounded-md top-full bg-surface1 {popUpClass}"
      >
        {#each autocomplete as props}
          <button
            on:click={() => {
              // if there is only one value, just add this one. No seed to search. Also handles arbitraryInput in a easy way
              if (autocomplete.length === 1) {
                addValue();
              } else
                [pickableItems, pickedItems] = removeFromAddToIndex(
                  pickableItems,
                  pickedItems,
                  pickableItems.findIndex((x) => x === props)
                );
              // Always reset value and refocus
              value = '';
              input.focus();
            }}
          >
            <Pill {...props} class="border-2 border-surface0 {props.class}"></Pill>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>

{#each pickedItems as { value }}
  <input type="hidden" {name} {value} />
{/each}
