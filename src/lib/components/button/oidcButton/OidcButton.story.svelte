<script lang="ts">
  import { themes } from '$lib/stores';
  import type { Hst } from '@histoire/plugin-svelte';
  import OidcButton from './OidcButton.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';

  let value = 'Hallo Welt!';

  let idValue = '0';
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
    <Hst.Text title="ButtonValue" bind:value />
  </svelte:fragment>

  <div class={theme}>
    <OidcButton name={value} id={idValue}></OidcButton>
  </div>
</Hst.Story>
