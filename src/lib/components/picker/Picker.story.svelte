<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import Picker from './Picker.svelte';
  import { themes } from '$lib/stores';
  import { getFormValues } from '$lib/util/form.util';
  import { TAGS_MOCK } from './tags';
  import { shouldTextBeBlack } from '$lib/util/contrastColor.util';

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

    <form on:submit|preventDefault={(e) => console.log(getFormValues(e))}>
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
  </div>
</Hst.Story>
