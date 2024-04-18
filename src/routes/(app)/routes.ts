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
    href: '/attributes',
    userAccess: 'viewOnly'
  },
  {
    name: 'Tags',
    icon: 'mdi:tag',
    href: '/tags',
    userAccess: 'viewOnly'
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
      },
      {
        name: 'Import',
        icon: 'mdi:import',
        href: '/galaxies/import',
        hidden: true
      }
    ]
  },
  {
    name: 'Workflows',
    icon: 'material-symbols:network-node',
    href: '/workflows',
    userAccess: 'none',
    children: [
      {
        name: 'Triggers',
        icon: 'material-symbols:line-start-diamond',
        href: '/workflows/triggers',
        userAccess: 'none'
      },
      {
        name: 'Modules',
        icon: 'material-symbols:package-2-outline',
        href: '/workflows/modules',
        userAccess: 'none'
      }
    ]
  },
  {
    name: 'Admin',
    icon: 'mdi-shield-account',
    href: '/admin',
    userAccess: 'none',
    children: [
      {
        name: 'Users',
        icon: 'mdi:account',
        userAccess: 'none',
        href: '/admin/users'
      },
      {
        name: 'Keys',
        icon: 'mdi:key',
        userAccess: 'none',
        href: '/admin/keys'
      },

      {
        name: 'Remote Server',
        icon: 'mdi:server',
        userAccess: 'none',
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
