import { api } from '$lib/api';
import { get } from 'svelte/store';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/sharing_groups/view/{sharingGroupId}', {
    params: { path: { sharingGroupId: params.id } },
    fetch
  });
  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const cardData = data.SharingGroup;

  const fac = createTableHeadGenerator<NonNullable<typeof cardData>[number], DynTableHeadExtent>();

  const header = [
    fac({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id! }),
    fac({
      icon: 'mdi:share',
      key: 'uuid',
      label: 'UUID',
      value: (x) => ({
        display: Info,
        props: { text: x.uuid }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'name',
      label: 'Name',
      value: (x) => ({
        display: Info,
        props: { text: x.name }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'releasability',
      label: 'Releasability',
      value: (x) => ({
        display: Info,
        props: { text: x.releasability }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'description',
      label: 'description',
      value: (x) => ({
        display: Info,
        props: { text: x.description }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'local',
      label: 'Local',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.local }
      })
    })
  ];

  return {
    data: cardData,
    header
  };
};
