import { api } from '$lib/api';
import { get } from 'svelte/store';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Info from '$lib/components/info/Info.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/taxonomies/view/{taxonomyId}', {
    params: { path: { taxonomyId: params.id } },
    fetch
  });
  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const cardData = data.Taxonomy;

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
      key: 'namespace',
      label: 'Namespace',
      value: (x) => ({ display: Info, props: { text: x.namespace } })
    }),
    fac({
      icon: 'mdi:share',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.description } })
    })
  ];

  return {
    data: cardData,
    header
  };
};
