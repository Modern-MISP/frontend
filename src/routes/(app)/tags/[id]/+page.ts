import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { shouldTextBeBlack } from '$lib/util/contrastColor.util';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/tags/view/{tagId}', { params: { path: { tagId: params.id } }, fetch });

  if (mispError) error(response.status, mispError.message);

  const col = createTableHeadGenerator<typeof data>();

  const header = [

    col({ 
        key: 'id', 
        label: 'ID', 
        value: (x) => x.id ?? 'unknown' 
    }),
    col({
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
      key: 'tagged_events',
      label: 'Tagged Events',
      display: Info,
      value: (x) => ({ text: x.count })
    }),
    col({
      key: 'exportable',
      label: 'Exportable',
      display: Boolean,
      value: (x) => ({ isTrue: x.exportable === 'true' })
    }),
    col({
      key: 'hidden',
      label: 'Hidden',
      display: Boolean,
      value: (x) => ({ isTrue: x.hidden === 'true' })
    }),
    col({
      icon: 'mdi:cloud-off-outline',
      key: 'local_only',
      label: 'Local only',
      // class: 'whitespace-nowrap',
      display: Boolean,
      value: (x) => ({ isTrue: x.local === 'true' })
    }),
    col({
      key: 'restrict_org',
      label: 'Restricted to Org',
      // class: 'whitespace-nowrap',
      display: Boolean,
      value: (x) => ({ isTrue: x.org_id !== '0' })
    }),
    col({
      icon: 'mdi:account-cancel-outline',
      key: 'restrict_user',
      label: 'Restricted to User',
      // class: 'whitespace-nowrap',
      display: Boolean,
      value: (x) => ({ isTrue: x.user_id !== '0' })
    }),

    //TODO: more categories necessary?

  ];

  return {
    user: data,
    header
  };
};