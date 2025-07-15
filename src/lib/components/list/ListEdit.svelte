<script lang="ts">
  import Icon from '@iconify/svelte';
  import Input from '../input/Input.svelte';
  import List from './List.svelte';

  interface Props {
    /**
     * List of items to display.
     */
    items: string[];
    /**
     * Form name for the input.
     */
    name?: string | undefined;
    /**
     * Function to determine the class of an element based on its value.
     * @returns the classed that will be applied
     */
    elemClass?: (item: string) => string;
    /**
     * Title of the list.
     */
    title: string;
  }

  let { items = $bindable(), name = undefined, elemClass = () => '', title }: Props = $props();
</script>

<!--
  @component
  Displays a list of items with a title.
  You can add classes to an element by passing a function to `elemClass`.
 -->

<List {items} {elemClass} {title} bodyClass="pl-0!">
  {#snippet moreHeader()}
    <button type="button" onclick={() => (items = ['', ...items])}>
      <Icon icon="mdi:plus-circle-outline" class="text-xl text-ctp-sky"></Icon>
    </button>
  {/snippet}
  {#snippet children({ item, index })}
    <div class="flex justify-between w-full pr-3 my-2 rounded-md bg-ctp-surface1">
      <Input class="w-full" value={item} {name} on:value={({ detail }) => (items[index] = detail)}
      ></Input>
      <button onclick={() => (items = items.filter((_, i) => i !== index))} type="button">
        <Icon icon="mdi:delete-outline" class=" hover:text-ctp-red"></Icon>
      </button>
    </div>
  {/snippet}
</List>
