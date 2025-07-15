<script lang="ts">
  import { run } from 'svelte/legacy';

  import type { PickerPill } from '$lib/models/Picker.interface';
  import { remove, sortBy } from 'lodash-es';
  import { createEventDispatcher } from 'svelte';
  import Pill from '../pills/pill/Pill.svelte';

  let value: string = $state('');

  interface Props {
    /** The items that have been picked. */
    pickedItems?: PickerPill[];
    /** The items that can be picked. */
    pickableItems?: PickerPill[];
    /**
     * Placeholder of the input.
     */
    placeholder?: string | undefined;
    /**
     * Popup Class Override
     */
    popUpClass?: string;
    /**
     * The name of the input. Used for form submission.
     */
    name?: string | undefined;
    /**
     * When true, the picker cannot be used.
     */
    disabled?: boolean;
    /**
     * Max Elements to show for Autocomplete
     */
    maxAutoComplete?: number;
    /**
     * Allow inputting arbitrary
     */
    arbitraryInput?: ((x: string) => PickerPill) | undefined;
    /**
     * Override the match function while typing in the input
     * @param pill The pill
     * @param value the input value
     * @returns true if the pill should match the value
     */
    matchFunction?: (pill: PickerPill, value: string) => boolean | undefined;
  }

  let {
    pickedItems = $bindable([]),
    pickableItems = $bindable([]),
    placeholder = undefined,
    popUpClass = '',
    name = undefined,
    disabled = false,
    maxAutoComplete = 50,
    arbitraryInput = undefined,
    matchFunction = (pill: PickerPill, value: string) => pill.text?.includes(value)
  }: Props = $props();

  const dispatch = createEventDispatcher<{
    formValue: Record<string, PickerPill[]>;
    update: PickerPill[];
  }>();

  /**
   * Adds the current value to pickedItems if possible.
   */
  function addValue() {
    if (!value) return;
    // Match should be  first element in the autocomplete.
    const match = autocomplete.length === 0 ? arbitraryInput(value) : autocomplete[0];
    if (!match) return;
    pickedItems = [...pickedItems, match];
    pickableItems = pickableItems.filter((x) => x !== match);
    value = '';
    dispatch('update', pickedItems);
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
      value = pickedItems.at(-1)!.text ?? '';
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

  let autocomplete = $derived(
    pickableItems.filter((x) => matchFunction(x, value)).slice(0, maxAutoComplete)
  );

  // If you do not find any value, add the arbitrary Input.
  /*  run(() => {
    if (autocomplete.length === 0 && arbitraryInput) autocomplete = [arbitraryInput(value)];
  }); */
  run(() => {
    pickableItems = sortBy(pickableItems, ['text', 'label', 'icon']);
  }); // enforce sorted order

  run(() => {
    if (name) dispatch('formValue', { [name]: pickedItems });
  });

  let input: HTMLInputElement = $state();
</script>

<!--
  @component

  An input for picking from a list of pre-defined items.
-->
<div class="box-border relative overflow-visible">
  <div
    class="flex flex-col items-start w-full gap-2 p-2 rounded-lg"
    class:bg-ctp-surface1={!disabled}
    class:bg-ctp-overlay0={disabled}
    class:cursor-not-allowed={disabled}
  >
    {#if pickedItems.length > 0}
      <div class="flex flex-wrap w-full gap-1 overflow-hidden rounded-md bg-inherit">
        {#each pickedItems as props, i}
          <Pill
            {...props}
            class="border-2 border-surface0 w-max {props.class}"
            action={!disabled
              ? {
                  class: 'hover:text-ctp-red',
                  onClick: () => {
                    [pickedItems, pickableItems] = removeFromAddToIndex(
                      pickedItems,
                      pickableItems,
                      i
                    );
                    dispatch('update', pickedItems);
                  },
                  icon: 'mdi:close-circle-outline'
                }
              : undefined}
          />
        {/each}
      </div>
    {/if}
    <input
      bind:this={input}
      class="w-full h-full m-2 outline-none bg-inherit text-ctp-text"
      type="text"
      {placeholder}
      {disabled}
      bind:value
      onkeydown={onKeyDown}
    />
    {#if value !== '' && autocomplete.length > 0}
      <div
        class="absolute left-0 max-h-80 gap-1 mt-1 flex-wrap w-full z-10 flex p-4 overflow-auto rounded-md top-full bg-ctp-surface1 {popUpClass}"
      >
        {#each autocomplete as props}
          <button
            type="button"
            onclick={() => {
              // if there is only one value, just add this one. No seed to search. Also handles arbitraryInput in a easy way
              if (autocomplete.length === 1) {
                addValue();
              } else {
                [pickableItems, pickedItems] = removeFromAddToIndex(
                  pickableItems,
                  pickedItems,
                  pickableItems.findIndex((x) => x === props)
                );
                dispatch('update', pickedItems);
              }
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
    {#if value !== '' && autocomplete.length === 0}
      <div
        class="absolute left-0 max-h-80 gap-1 mt-1 flex-wrap w-full z-10 flex p-4 overflow-auto rounded-md top-full bg-ctp-surface1 {popUpClass}"
      >
        <button
          type="button"
          onclick={() => {
            // if there is only one value, just add this one. No seed to search. Also handles arbitraryInput in a easy way
            addValue();
            // Always reset value and refocus
            value = '';
            input.focus();
          }}
        >
          <Pill
            {...arbitraryInput(value)}
            class="border-2 border-surface0 {arbitraryInput(value).class}"
          ></Pill>
        </button>
      </div>
    {/if}
  </div>
</div>

{#each pickedItems as { value }}
  <input type="hidden" {name} {value} />
{/each}
