import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { shouldTextBeBlack } from '$lib/util/contrastColor.util';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await GET('/tags', { fetch });

  if (mispError) error(response.status, mispError.message);

  const col = createTableHeadGenerator<
    NonNullable<(typeof data)['Tag']>[number],
    DynTableHeadExtent
  >();

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id ?? 'unknown' }),
    col({
      icon: 'mdi:circle',
      key: 'name',
      label: 'Name',
      display: Pill,
      value: (x) => ({
        icon: x.local_only ? 'mdi:cloud-off-outline' : 'mdi:earth',
        text: x.name,
        style: `background-color: ${x.colour}; color: ${
          shouldTextBeBlack(x.colour ?? '') ? 'black' : 'white'
        }`
      })
    }),
    col({
      icon: 'mdi:circle',
      key: 'tagged_events',
      label: 'Tagged Events',
      display: Info,
      value: (x) => ({ text: x.count, class: 'm-auto' })
    }),
    col({
      icon: 'mdi:export-variant',
      key: 'exportable',
      label: 'Exportable',
      display: Boolean,
      value: (x) => ({ isTrue: x.exportable === 'true', class: 'm-auto' })
    }),
    col({
      icon: 'mdi:eye-off-outline',
      key: 'hidden',
      label: 'Hidden',
      display: Boolean,
      value: (x) => ({ isTrue: x.hidden === 'true', class: 'm-auto' })
    }),
    col({
      icon: 'mdi:cloud-off-outline',
      key: 'local_only',
      label: 'Local only',
      // class: 'whitespace-nowrap',
      display: Boolean,
      value: (x) => ({ isTrue: x.local === 'true', class: 'm-auto' })
    }),
    col({
      icon: 'mdi:circle',
      key: 'restrict_org',
      label: 'Restricted to Org',
      // class: 'whitespace-nowrap',
      display: Boolean,
      value: (x) => ({ isTrue: x.org_id !== '0', class: 'm-auto' })
    }),
    col({
      icon: 'mdi:account-cancel-outline',
      key: 'restrict_user',
      label: 'Restricted to User',
      // class: 'whitespace-nowrap',
      display: Boolean,
      value: (x) => ({ isTrue: x.user_id !== '0', class: 'm-auto' })
    })
  ];

  return {
    data,
    tableData: data.Tag ?? [],
    header
  };
};
