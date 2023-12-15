<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import Input from './Input.svelte';
  import { themes } from '$lib/stores';
  import Icon from '@iconify/svelte';

  export let Hst: Hst;
  let theme = 'macchiato';
  let placeholder = 'Hello World!';
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />

    <Hst.Text title="Placeholder" bind:value={placeholder} />
  </svelte:fragment>

  <div class={theme}>
    <br />
    <Input {placeholder}>
      <Icon icon="mdi:magnify" slot="icon" class="w-10 h-10" />
    </Input>
  </div>
</Hst.Story>
