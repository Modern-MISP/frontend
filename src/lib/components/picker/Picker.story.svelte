<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import Picker from './Picker.svelte';
  import { themes } from '$lib/stores';

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
    <Picker
      placeholder="pick an item"
      popUpClass="flex-col"
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
  </div>
</Hst.Story>
