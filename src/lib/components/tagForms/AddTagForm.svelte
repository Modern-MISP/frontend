<script lang="ts">
  import TagPicker from './TagPicker.svelte';

  import Button from '$lib/components/button/Button.svelte';
  import Card from '$lib/components/card/Card.svelte';
  import CardRow from '$lib/components/card/CardRow.svelte';
  import CheckBox from '$lib/components/checkbox/Checkbox.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { createEventDispatcher } from 'svelte';
  import { TAG_RELATION_TYPES } from '../../consts/relationTypes';

  const dispatch = createEventDispatcher<{
    close: void;
    add: { id: string; relation: string; local: boolean }[];
  }>();

  /**
   * The tags that can be picked.
   */
  export let selection: PickerPill[] = [];

  let relation = TAG_RELATION_TYPES[0];

  let pickedItems: PickerPill[] = [];

  $: selection = pickedItems.map((x) => ({
    ...x,
    icon: local_only ? 'mdi:cloud-off-outline' : 'mdi:earth',
    label: relation !== 'Unspecified' ? relation : undefined
  }));

  let local_only = false;
</script>

<div class="flex flex-col gap-1">
  <Card>
    <TagPicker bind:pickedItems></TagPicker>

    <CardRow>
      <span>Local only</span>
      <CheckBox name="local_only" bind:checked={local_only} />
    </CardRow>
    <CardRow>
      <span>Relationship</span>
      <Select
        bind:value={relation}
        options={TAG_RELATION_TYPES.map((x) => ({ label: x, value: x }))}
        name="restrict_org"
      />
    </CardRow>
  </Card>
  <Card class="!h-min overflow-initial">
    <div class="flex justify-center gap-4">
      <Button class="w-min whitespace-nowrap bg-surface1" suffixIcon="mdi:plus-circle-outline"
        >Create new Tag</Button
      >
      <Button
        class="w-min text-red bg-surface1"
        suffixIcon="mdi:close-circle-outline"
        on:click={() => dispatch('close')}>Cancel</Button
      >
      <Button
        class="w-min text-green bg-surface1"
        suffixIcon="material-symbols:save-outline"
        on:click={() =>
          dispatch(
            'add',
            selection.map((x) => ({ id: x.value ?? '', relation, local: local_only }))
          )}
      >
        Add</Button
      >
    </div>
  </Card>
</div>
