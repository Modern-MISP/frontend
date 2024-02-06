<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import Picker from './Picker.svelte';
  import { themes } from '$lib/stores';
  import { getFormValues } from '$lib/util/form.util';

  let theme = 'macchiato';

  export let Hst: Hst;
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>
  <div class={theme}>
    <h1>Display flex wrap</h1>
    <Picker
      placeholder="pick an item"
      pickableItems={[
        {
          text: 'ha'
        },
        {
          text: 'hb',
          label: 'asdf'
        },
        { text: 'asdf' },

        { text: 'asdf', icon: 'mdi:test-tube' }
      ]}
    />
    <h1>Force list display</h1>

    <form on:submit|preventDefault={(e) => console.log(getFormValues(e))}>
      <Picker
        placeholder="pick an item"
        popUpClass="flex-col"
        name="pills"
        pickableItems={[
          {
            text: 'hi'
          },
          {
            text: 'hiii',
            label: 'asdf'
          },
          { text: 'asdf', icon: 'mdi:abugida-thai' }
        ]}
      />
      <button type="submit">Senden</button>
    </form>
  </div>
</Hst.Story>
