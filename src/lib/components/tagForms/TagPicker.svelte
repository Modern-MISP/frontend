<script lang="ts">
  import { GET } from '$lib/api';
  import type { components } from '$lib/api/misp';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { notifications } from '$lib/stores';
  import { shouldTextBeBlack } from '$lib/util/contrastColor.util';
  import { errorPill } from '$lib/util/pill.util';
  import { onMount } from 'svelte';
  import Picker from '../picker/Picker.svelte';

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

  /**
   * The tags that got picket. Should probably bind to this.
   */
  export let pickedItems: PickerPill[] = [];

  /**
   * Form name of the picker.
   */
  export let name = 'tags';
</script>

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
  {name}
></Picker>
