import type { SideMenuRoute } from '$lib/components/menus/sidemenu/SideMenu.model';

export const routes: SideMenuRoute[] = [
  {
    name: 'Events',
    icon: 'mdi-calendar',
    href: '/events'
  },
  {
    name: 'Attributes',
    icon: 'mdi:flag',
    href: '/attributes'
  },
  {
    name: 'Tags',
    icon: 'mdi:tag',
    href: '/tags'
  },
  {
    name: 'Galaxies',
    icon: 'streamline:galaxy-2-solid',
    href: '/galaxies',
    children: [
      {
        name: 'Clusters',
        icon: 'carbon:assembly-cluster',
        href: '/galaxies/clusters',
        hidden: true
      }
    ]
  },
  {
    name: 'Workflows',
    icon: 'material-symbols:network-node',
    href: '/workflows',
    children: [
      {
        name: 'Triggers',
        icon: 'material-symbols:line-start-diamond',
        href: '/workflows/triggers'
      },
      {
        name: 'Modules',
        icon: 'material-symbols:package-2-outline',
        href: '/workflows/modules'
      }
    ]
  },
  {
    name: 'Admin',
    icon: 'mdi-shield-account',
    href: '/admin',
    children: [
      {
        name: 'Users',
        icon: 'mdi:account',
        href: '/admin/users'
      },
      {
        name: 'Keys',
        icon: 'mdi:key',
        href: '/admin/keys'
      },

      {
        name: 'Remote Server',
        icon: 'mdi:server',
        href: '/admin/servers'
      }
    ]
  },
  {
    name: 'Settings',
    icon: 'mdi-cog',
    href: '/settings'
  }
];
