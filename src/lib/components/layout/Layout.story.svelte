<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import Input from './Layout.svelte';
  import { themes } from '$lib/stores';
  import Layout from './Layout.svelte';

  export let Hst: Hst;
  let theme = 'macchiato';
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <Layout
      currentRoute={[
        {
          name: 'Admin',
          icon: 'mdi:shield-account',
          href: 'admin'
        },
        {
          name: 'Users',
          icon: 'mdi:account',
          href: 'settings'
        }
      ]}
    />
  </div>
</Hst.Story>
