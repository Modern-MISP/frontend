<script lang="ts">
  import Icon from '@iconify/svelte';
  import Pill from '../pills/pill/Pill.svelte';
  import type { ComponentProps } from 'svelte';
  import { remove, sortBy } from 'lodash-es';

  type PickerPill = ComponentProps<Pill> & { value?: string };

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
  export let name = 'default';

  /**
   * Max Elements to show for Autocomplete
   */
  export let maxAutoComplete = 50;

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

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!value) return;
      const match = pickableItems.find((x) => matchFunction(x, value));
      if (!match) return;
      pickedItems = [...pickedItems, match];
      pickableItems = pickableItems.filter((x) => x !== match);
      value = '';
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

  $: pickableItems = sortBy(pickableItems, ['text', 'label', 'icon']); // enforce sorted order

  let input: HTMLInputElement;
</script>

<!--
  @component
  
  An input for picking from a list of pre-defined items.
-->
<div class="box-border relative overflow-visible">
  <div class="flex flex-row items-center w-full gap-2 p-2 rounded-lg bg-crust">
    <div class="flex flex-wrap gap-1 overflow-hidden rounded-md bg-inherit w-max">
      {#each pickedItems as props, i}
        <Pill {...props} class="border-2 border-surface0 w-max {props.class}">
          <span class="flex overflow-hidden shrink line-clamp-1">
            {props.text?.trim()}
          </span>
          <button
            on:click={() =>
              ([pickedItems, pickableItems] = removeFromAddToIndex(pickedItems, pickableItems, i))}
            class="justify-center align-middle hover:text-red shrink-0"
          >
            <Icon icon="mdi:close-circle-outline" />
          </button>
        </Pill>
      {/each}
    </div>
    <input
      bind:this={input}
      class="w-full h-full m-2 outline-none bg-inherit text-text"
      type="text"
      {placeholder}
      bind:value
      on:keydown={onKeyDown}
    />
    {#if value !== ''}
      <div
        class="absolute left-0 max-h-80 gap-1 flex-wrap w-full z-10 flex p-4 overflow-auto rounded-md top-full bg-surface0 {popUpClass}"
      >
        {#each autocomplete as props}
          <button
            on:click={() => {
              [pickableItems, pickedItems] = removeFromAddToIndex(
                pickableItems,
                pickedItems,
                pickableItems.findIndex((x) => x === props)
              );
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