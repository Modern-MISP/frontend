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
    <Picker
      placeholder="pick an item"
      pickableItems={[
        {
          text: 'hi'
        },
        { text: 'asdf' }
      ]}
    />
  </div>
</Hst.Story>
