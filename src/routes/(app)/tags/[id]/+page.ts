import { api } from '$lib/api';
import { get } from 'svelte/store';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { shouldTextBeBlack } from '$lib/util/color.util';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/tags/view/{tagId}', { params: { path: { tagId: params.id } }, fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<
    typeof data & {
      local_only?: boolean;
      count?: string;
      hidden?: string;
      local?: string;
    }
  >();

  const header = [
    col({
      key: 'id',
      label: 'ID',
      value: (x) => x.id ?? 'unknown'
    }),
    col({
      key: 'name',
      label: 'Name',
      value: (x) => ({
        display: Pill,
        props: {
          icon: x.local_only ? 'mdi:cloud-off-outline' : 'mdi:earth',
          text: x.name,
          style: `background-color: ${x.colour}; color: ${
            shouldTextBeBlack(x.colour ?? '') ? 'black' : 'white'
          }`
        }
      })
    }),
    col({
      key: 'tagged_events',
      label: 'Tagged Events',
      value: (x) => ({ display: Info, props: { text: x.count } })
    }),
    col({
      key: 'exportable',
      label: 'Exportable',
      value: (x) => ({ display: Boolean, props: { isTrue: x.exportable ?? false } })
    }),
    col({
      key: 'hidden',
      label: 'Hidden',
      value: (x) => ({ display: Boolean, props: { isTrue: x.hide_tag ?? false } })
    }),
    col({
      icon: 'mdi:cloud-off-outline',
      key: 'local_only',
      label: 'Local only',
      // class: 'whitespace-nowrap',
      value: (x) => ({ display: Boolean, props: { isTrue: x.local_only ?? false } })
    }),
    col({
      key: 'restrict_org',
      label: 'Restricted to Org',
      // class: 'whitespace-nowrap',
      value: (x) => ({ display: Boolean, props: { isTrue: x.org_id !== '0' } })
    }),
    col({
      icon: 'mdi:account-cancel-outline',
      key: 'restrict_user',
      label: 'Restricted to User',
      // class: 'whitespace-nowrap',
      value: (x) => ({ display: Boolean, props: { isTrue: x.user_id !== '0' } })
    })

    //TODO: more categories necessary?
  ];

  return {
    user: data,
    header
  };
};
