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
