import type { SideMenuRoute } from '$lib/components/menus/sidemenu/SideMenu.model';

export const routes: SideMenuRoute[] = [
  {
    name: 'Events',
    icon: 'mdi-calendar',
    href: '/event'
  },
  {
    name: 'Tags',
    icon: 'mdi:tag',
    href: '/tags'
  },
  {
    name: 'Galaxies',
    icon: 'streamline:galaxy-2-solid',
    href: '/galaxy'
  },
  {
    name: 'Workflows',
    icon: 'material-symbols:network-node',
    href: '/workflow',
    children: [
      {
        name: 'Trigger',
        icon: 'material-symbols:line-start-diamond',
        href: '/workflow/trigger'
      },
      {
        name: 'Modules',
        icon: 'material-symbols:package-2-outline',
        href: '/workflow/modules'
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
