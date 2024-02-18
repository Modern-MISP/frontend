<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import type { ComponentProps } from 'svelte';

  /**
   * The props for the input.
   */
  export let inputProps: ComponentProps<Input>;

  /**
   * Default value for the checkbox.
   */
  export let checked = false;
</script>

<div class="flex items-center gap-2 w-fit">
  <Input {...inputProps} disabled={!checked} value={checked ? inputProps.value : undefined}></Input>
  <Checkbox bind:checked></Checkbox>
</div>
