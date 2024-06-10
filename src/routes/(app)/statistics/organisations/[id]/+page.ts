import { api } from '$lib/api';
import { get } from 'svelte/store';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Pill from '$lib/components/pills/pill/Pill.svelte';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/tags/view/{tagId}', { params: { path: { tagId: params.id } }, fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<typeof data>();

  const header = [
    col({
      icon: 'mdi:person-outline',
      key: 'nids_sid',
      label: 'Name',
      value: () => ({
        display: Pill,
        props: { icon: 'mdi:person-outline', text: 'Name of the organisation' }
      })
    }),

    col({
      icon: 'mdi:pound',
      key: 'users',
      label: 'Users',
      value: () => ({ display: Pill, props: { icon: 'mdi:pound', text: 'Number of Users' } })
    }),
    col({
      icon: 'mdi:pound',
      key: 'events',
      label: 'Events',
      value: () => ({ display: Pill, props: { icon: 'mdi:pound', text: 'Number of Events' } })
    }),

    col({
      icon: 'mdi:pound',
      key: 'attributes',
      label: 'Attributes',
      value: () => ({ display: Pill, props: { icon: 'mdi:pound', text: 'Number of Attributes' } })
    }),
    col({
      icon: 'mdi:alert-circle-outline',
      key: 'type',
      label: 'Type',
      value: () => ({
        display: Pill,
        props: { icon: 'mdi:alert-circle-outline', text: 'Organisation type' }
      })
    })
  ];

  const title = 'Organisation details';
  const description = 'Some detailed information about the selected organisation';

  return {
    user: data,
    header,
    title,
    description
  };
};
