import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { notifications } from '$lib/stores';
import { successPill } from '$lib/util/pill.util';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  // Static data
  const data = [
    {
      Provider: {
        id: '1',
        name: 'Google',
        path: 'https://accounts.google.com/.well-known/openid-configuration',
        token: 'eyJh••••••••••••••yZjI'
      }
    },
    {
      Provider: {
        id: '2',
        name: 'Ilias',
        path: 'https://ilias.kit.edu/auth/realms/ilias/.well-known/openid-configuration',
        token: 'eyJh••••••••••••••yZjI'
      }
    },
    {
      Provider: {
        id: '3',
        name: 'Facebook',
        path: 'https://www.facebook.com/.well-known/openid-configuration',
        token: 'eyJh••••••••••••••yZjI'
      }
    }
  ];

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.Provider?.id ?? 'unknown' }),
    col({
      icon: 'mdi:watermark',
      key: 'provider',
      label: 'Provider',
      value: (x) => x.Provider?.name ?? 'unknown'
    }),
    col({
      icon: 'mdi:link-variant',
      key: 'path',
      label: 'Path',
      value: (x) => x.Provider?.path ?? 'unknown'
    }),
    col({
      icon: 'mdi:key-outline',
      key: 'token',
      label: 'Token',
      value: (x) => x.Provider?.token ?? 'unknown'
    })
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Delete Provider',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: () => {
        notifications.add(successPill('Deleted providers'));
      }
    },
    {
      label: 'Export',
      icon: 'mdi:download',
      action(x) {
        console.log(x);
      }
    }
  ];

  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:plus-outline',
      label: 'Add Provider',
      action: '/admin/OIDConnect/new'
    }
  ];

  return {
    data,
    tableData: data,
    header,
    editActions,
    topMenuActions,
    maxCount: data.length
  };
};
