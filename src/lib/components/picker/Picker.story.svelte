<script lang="ts">
  import { themes } from '$lib/stores';
  import { shouldTextBeBlack } from '$lib/util/color.util';
  import type { Hst } from '@histoire/plugin-svelte';
  import Picker from './Picker.svelte';
  import { TAGS_MOCK } from './tags.mock';

  let theme = 'macchiato';

  export let Hst: Hst;
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>
  <div class="h-screen {theme}">
    <h1>Display flex wrap</h1>
    <Picker
      placeholder="pick an item"
      pickableItems={TAGS_MOCK.map((x) => ({
        icon: x.local_only ? 'mdi:cloud-off-outline' : 'mdi:earth',
        text: x.name,
        style: `background-color: ${x.colour}; color: ${
          shouldTextBeBlack(x.colour ?? '') ? 'black' : 'white'
        }`,
        value: x.id
      }))}
    />
    <h1>Force list display</h1>

    <form>
      <Picker
        placeholder="pick an item"
        popUpClass="flex-col flex-nowrap"
        name="pills"
        pickableItems={TAGS_MOCK.map((x) => ({
          icon: x.local_only ? 'mdi:cloud-off-outline' : 'mdi:earth',
          text: x.name,
          style: `background-color: ${x.colour}; color: ${
            shouldTextBeBlack(x.colour ?? '') ? 'black' : 'white'
          }`,
          value: x.id
        }))}
      />
      <button type="submit">Senden</button>
    </form>

    <Picker
      placeholder="pick an item"
      pickableItems={TAGS_MOCK.map((x) => ({
        icon: x.local_only ? 'mdi:cloud-off-outline' : 'mdi:earth',
        text: x.name,
        style: `background-color: ${x.colour}; color: ${
          shouldTextBeBlack(x.colour ?? '') ? 'black' : 'white'
        }`,
        value: x.id
      }))}
      arbitraryInput={(x) => ({
        text: x
      })}
    />
  </div>
</Hst.Story>
