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
  import CardHeading from '../card/CardHeading.svelte';

  const dispatch = createEventDispatcher<{
    close: void;
    add: { id: string; relation: string; local: boolean }[];
    createTag: void;
  }>();

  /**
   * The tags that can be picked.
   */
  export let selection: PickerPill<{ local_only: boolean; relation: string }>[] = [];

  let relation = TAG_RELATION_TYPES[0];

  let pickedItems: PickerPill[] = [];

  $: selection = pickedItems.map((x) => ({
    ...x,
    icon: local_only ? 'mdi:cloud-off-outline' : 'mdi:earth',
    label: relation !== 'Unspecified' ? relation : undefined,
    local_only,
    relation
  }));

  let local_only = false;
</script>

<div class="flex flex-col gap-1">
  <Card>
    <CardHeading>Add Tags</CardHeading>
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
    <div class="flex justify-center gap-4 mt-auto">
      <Button
        class="w-min whitespace-nowrap bg-surface1"
        suffixIcon="mdi:plus-circle-outline"
        on:click={() => dispatch('createTag')}>Create new Tag</Button
      >
    </div>
  </Card>
</div>
