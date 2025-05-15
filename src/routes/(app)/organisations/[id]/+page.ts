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
  } = await get(api).GET('/organisations/view/{organisationId}', {
    params: { path: { organisationId: params.id } },
    fetch
  });
  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const cardData = data;

  const fac = createTableHeadGenerator<NonNullable<typeof cardData>[number], DynTableHeadExtent>();
  const header = [
    fac({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => ({ display: Info, props: { text: x.id ?? 'unknown' } })
    }),
    fac({
      icon: 'mdi:information-outline',
      key: 'name',
      label: 'Name',
      value: (x) => ({ display: Info, props: { text: x.name } })
    }),
    fac({
      icon: 'mdi:information-outline',
      key: 'nationality',
      label: 'Nationality',
      value: (x) => ({ display: Info, props: { text: x.nationality } })
    }),
    fac({
      icon: 'mdi:information-outline',
      key: 'sector',
      label: 'Sector',
      value: (x) => ({ display: Info, props: { text: x.sector } })
    }),
    fac({
      icon: 'mdi:information-outline',
      key: 'type',
      label: 'Type',
      value: (x) => ({ display: Info, props: { text: x.type } })
    }),
    fac({
      icon: 'mdi:information-outline',
      key: 'uuid',
      label: 'UUID',
      value: (x) => ({ display: Info, props: { text: x.uuid } })
    }),
    fac({
      icon: 'mdi:information-outline',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.description } })
    }),
    fac({
      icon: 'mdi:information-outline',
      key: 'user_count',
      label: 'Users#',
      value: (x) => ({ display: Info, props: { text: x.user_count } })
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
