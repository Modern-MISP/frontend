<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import { themes } from '$lib/stores';
  import Info from './Info.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';

  let value = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio ipsa qui labore adipisci
      quo eos et quod nobis. Expedita aspernatur quo dolor temporibus id eaque repudiandae quia
      blanditiis similique.`;
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
    <Hst.Textarea title="info" bind:value />
  </svelte:fragment>

  <div class={theme}>
    <Info>
      {value}
    </Info>
  </div>
</Hst.Story>
