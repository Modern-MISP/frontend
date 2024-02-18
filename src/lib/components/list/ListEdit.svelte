<script lang="ts">
  import Icon from '@iconify/svelte';
  import Input from '../input/Input.svelte';
  import List from './List.svelte';

  /**
   * List of items to display.
   */
  export let items: string[];

  /**
   * Form name for the input.
   */
  export let name: string | undefined = undefined;

  /**
   * Function to determine the class of an element based on its value.
   * @returns the classed that will be applied
   */
  export let elemClass: (item: string) => string = () => '';

  /**
   * Title of the list.
   */
  export let title: string;
</script>

<!-- 
  @component
  Displays a list of items with a title.
  You can add classes to an element by passing a function to `elemClass`.
 -->

<List {items} {elemClass} {title} bodyClass="!pl-0" let:item let:index>
  <button type="button" slot="moreHeader" on:click={() => (items = ['', ...items])}>
    <Icon icon="mdi:plus-circle-outline" class="text-xl text-sky"></Icon>
  </button>
  <div class="flex justify-between w-full pr-3 my-2 rounded-md bg-surface1">
    <Input class="w-full" value={item} {name} on:value={({ detail }) => (items[index] = detail)}
    ></Input>
    <button on:click={() => (items = items.filter((_, i) => i !== index))} type="button">
      <Icon icon="mdi:delete-outline" class=" hover:text-red"></Icon>
    </button>
  </div>
</List>
