<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import { themes } from '$lib/stores';
  import Layout from './Layout.svelte';

  export let Hst: Hst;
  let theme = 'macchiato';

  const routes = [
    {
      name: 'Events',
      icon: 'mdi-calendar',
      href: '/event'
    },
    {
      name: 'Galaxies',
      icon: 'streamline:galaxy-2-solid',
      href: '/galaxy'
    },
    {
      name: 'Workflows',
      icon: 'material-symbols:network-node',
      href: '/workflows'
    },
    {
      name: 'Admin',
      icon: 'mdi-shield-account',
      href: '/admin',
      children: [
        {
          name: 'Users',
          icon: 'mdi:account',
          href: '/users'
        },
        {
          name: 'Keys',
          icon: 'mdi:key',
          href: '/keys'
        },

        {
          name: 'Remote Server',
          icon: 'mdi:server',
          href: '/servers'
        }
      ]
    },
    {
      name: 'Settings',
      icon: 'mdi-cog',
      href: '/settings'
    }
  ];
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <Layout
      {routes}
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
