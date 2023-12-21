import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type DynTable from '$lib/components/dynTable/DynTable.svelte';
import Pill from '$lib/components/pill/Pill.svelte';
import Info from '$lib/components/info/Info.svelte';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import { shouldTextBeBlack } from '$lib/util/contrastColor.util';

export const load: PageLoad = async () => {
  const { data, error: mispError, response } = await GET('/tags');

  if (mispError) throw error(response.status, mispError.message);

  const header = [
    { icon: 'mdi:id-card', name: 'id', value: 'ID' },
    { icon: 'mdi:circle', name: 'name', value: 'Name', displayComp: Pill },
    { icon: 'mdi:circle', name: 'tagged_events', value: 'Tagged Events', displayComp: Info },
    {
      icon: 'mdi:export-variant',
      name: 'exportable',
      value: 'Exportable',
      displayComp: Boolean
    },
    {
      icon: 'mdi:eye-off-outline',
      name: 'hidden',
      value: 'Hidden',
      displayComp: Boolean
    },
    {
      icon: 'mdi:cloud-off-outline',
      name: 'local_only',
      value: 'Local only',
      class: 'whitespace-nowrap',
      displayComp: Boolean
    },
    {
      icon: 'mdi:circle',
      name: 'restrict_org',
      value: 'Restricted to Org',
      class: 'whitespace-nowrap',
      displayComp: Boolean
    },
    {
      icon: 'mdi:account-cancel-outline',
      name: 'restrict_user',
      value: 'Restricted to User',
      class: 'whitespace-nowrap',
      displayComp: Boolean
    }
  ] as const;

  console.log(data);

  const tableData: DynTable<typeof header>['$$prop_def']['data'] = data.Tag?.map((x) => ({
    exportable: { isTrue: x.exportable, class: 'm-auto' },
    id: x.id,
    hidden: { isTrue: x.hide_tag, class: 'm-auto' },
    tagged_events: { text: x.count, class: 'm-auto px-6' },
    local_only: { isTrue: x.local, class: 'm-auto' },
    restrict_user: { isTrue: x.user_id !== '0', class: 'm-auto' },
    restrict_org: { isTrue: x.org_id !== '0', class: 'm-auto' },
    name: {
      icon: x.local_only ? 'mdi:cloud-off-outline' : 'mdi:earth',
      text: x.name,
      style: `background-color: ${x.colour}; color: ${
        shouldTextBeBlack(x.colour ?? '') ? 'black' : 'white'
      }`
    }
  }));

  console.log(tableData);

  return {
    data,
    tableData,
    header
  };
};
