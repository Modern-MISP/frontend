<script lang="ts">
  import { themes } from '$lib/stores';
  import type { Hst } from '@histoire/plugin-svelte';
  import Icon from '@iconify/svelte';
  import Button from './Button.svelte';
  export let Hst: Hst;

  let theme = 'macchiato';
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <Button>
      <b>name</b>
      <Icon icon="mdi-light:home" class="w-8 h-8" />
    </Button>
  </div>
</Hst.Story>
