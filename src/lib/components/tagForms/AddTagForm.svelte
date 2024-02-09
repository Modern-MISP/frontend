<script lang="ts">
  import { GET } from '$lib/api';
  import type { components } from '$lib/api/misp';
  import Button from '$lib/components/button/Button.svelte';
  import Card from '$lib/components/card/Card.svelte';
  import CardRow from '$lib/components/card/CardRow.svelte';
  import CheckBox from '$lib/components/checkbox/Checkbox.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { notifications } from '$lib/stores';
  import { shouldTextBeBlack } from '$lib/util/contrastColor.util';
  import { errorPill } from '$lib/util/pill.util';
  import { createEventDispatcher, onMount } from 'svelte';
  import Picker from '../picker/Picker.svelte';
  import { TAG_RELATION_TYPES } from '../../consts/relationTypes';

  const dispatch = createEventDispatcher<{
    close: void;
    add: { id: string; relation: string; local: boolean }[];
  }>();

  /**
   * The tags that can be picked.
   */
  export let selection: PickerPill[] = [];

  let tags: components['schemas']['TagList'] = [];
  onMount(async () => {
    // Fetch tags
    const { data, error: mispError, response } = await GET('/tags', { fetch });
    if (mispError || !data.Tag || response.status !== 200) {
      const message =
        mispError?.message ?? `Response Stats: ${response.statusText}` ?? 'unknown error';
      notifications.add(errorPill('Failed to fetch tags: ' + message));
      return;
    }
    tags = data.Tag;
  });

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
    <Picker
      placeholder="Tags"
      popUpClass="bg-surface1"
      bind:pickedItems
      pickableItems={tags.map((tag) => ({
        text: tag.name,
        value: tag.id,
        class: '!border-none',
        style: `background-color: ${tag.colour}; color: ${
          shouldTextBeBlack(tag.colour ?? '') ? 'black' : 'white'
        }`
      }))}
    ></Picker>

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
