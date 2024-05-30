import Boolean from '$lib/components/boolean/Boolean.svelte';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Select from '$lib/components/form/Select.svelte';
import Info from '$lib/components/info/Info.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { notifications } from '$lib/stores';
import { errorPill, successPill } from '$lib/util/pill.util';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Input from '$lib/components/input/Input.svelte';

export const load: PageLoad = async () => {
  // Static data
  const data = [
    {
      Provider: {
        id: '1',
        name: 'Google'
      }
    },
    {
      Provider: {
        id: '2',
        name: 'Ilias'
      }
    },
    {
      Provider: {
        id: '3',
        name: 'Facebook'
      }
    }
  ];
  const providerData = [
    { Name: { id: '1', name: 'Google' } },
    { Name: { id: '2', name: 'Ilias' } },
    { Name: { id: '3', name: 'Facebook' } }
  ];

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.Provider?.id ?? 'unknown' }),
    col({
      icon: 'mdi:watermark',
      key: 'provider',
      label: 'Provider',
      value: (x) => x.Provider?.name ?? 'unknown'
    })
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Delete Provider',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: (x) => {
        notifications.add(
          successPill('Deleted providers ' + x.map((y) => y.Provider?.id).join(', '))
        );
      }
    }
  ];

  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:plus-outline',
      label: 'Add Provider',
      action: '/admin/OpenID/new'
    }
  ];

  const fil = createTableHeadGenerator<undefined>();

  const filter = [
    fil({
      label: 'Role',
      value: () => ({
        display: Select,
        props: {
          options:
            providerData?.map((x) => ({
              label: x.Name?.name ?? 'unknown',
              value: x.Name?.id ?? 'unknown'
            })) ?? [],
          value: providerData && providerData.length > 0 ? providerData[0].Name?.id ?? '0' : '0',
          name: 'role'
        }
      })
    })
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
