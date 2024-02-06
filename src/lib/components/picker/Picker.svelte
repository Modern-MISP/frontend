<script lang="ts">
  import Icon from '@iconify/svelte';
  import Pill from '../pills/pill/Pill.svelte';
  import type { ComponentProps } from 'svelte';
  import { remove } from 'lodash-es';

  /** The items that have been picked. */
  export let pickedItems: ComponentProps<Pill>[] = [];
  /** The items that can be picked. */
  export let pickableItems: ComponentProps<Pill>[] = [];
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

  let value: string = '';

  /**
   * Override the match function while typing in the input
   * @param pill The pill
   * @param value the input value
   * @returns true if the pill should match the value
   */
  export let matchFunction: (pill: ComponentProps<Pill>, value: string) => boolean | undefined = (
    pill: ComponentProps<Pill>,
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
    } else if (event.key === 'Backspace' && value === '') {
      event.preventDefault();
      if (pickedItems.length === 0) return;
      [pickedItems, pickableItems] = switchByIndex(
        pickedItems,
        pickableItems,
        pickedItems.length - 1
      );
    }
  }

  function switchByIndex<T>(source: T[], target: T[], index: number) {
    target.push(remove(source, (_, i) => i === index)[0]);
    return [source, target];
  }

  $: autocomplete = pickableItems.filter((x) => matchFunction(x, value));
</script>

<!--
  @component
  
  An input for picking from a list of pre-defined items.
-->
<div class="box-border relative overflow-visible">
  <div class="flex flex-row items-center w-full gap-2 p-2 rounded-lg bg-crust">
    <ul class="flex gap-1 bg-inherit">
      {#each pickedItems as props, i}
        <li>
          <Pill {...props} class="border-2 border-surface0 w-max {props.class}">
            {props.text}
            <button
              on:click={() =>
                ([pickedItems, pickableItems] = switchByIndex(pickedItems, pickableItems, i))}
              class="align-middle hover:text-red"
            >
              <Icon icon="mdi:close-circle-outline" />
            </button>
          </Pill>
        </li>
      {/each}
    </ul>
    <input
      class="w-full h-full m-2 outline-none bg-inherit text-text"
      type="text"
      {name}
      {placeholder}
      bind:value
      on:keydown={onKeyDown}
    />
    {#if value !== ''}
      <div
        class="absolute left-0 right-0 z-10 flex p-4 overflow-visible rounded-md top-full bg-surface0 {popUpClass}"
      >
        {#each autocomplete as props, i}
          <button
            on:click={() =>
              ([pickableItems, pickedItems] = switchByIndex(pickableItems, pickedItems, i))}
          >
            <Pill {...props} class="border-2 border-surface0 {props.class}"></Pill>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>
