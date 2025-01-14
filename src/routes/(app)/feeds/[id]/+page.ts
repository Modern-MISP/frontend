import { api } from '$lib/api';
import { get } from 'svelte/store';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/feeds/view/{feedId}', {
    params: { path: { feedId: params.id } },
    fetch
  });
  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const cardData = data.Feed;

  const fac = createTableHeadGenerator<NonNullable<typeof cardData>[number], DynTableHeadExtent>();

  const header = [
    fac({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id! }),
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
      key: 'provider',
      label: 'Provider',
      value: (x) => ({
        display: Info,
        props: { text: x.provider }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'url',
      label: 'URL',
      value: (x) => ({
        display: Info,
        props: { text: x.url }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'rules',
      label: 'Rules',
      value: (x) => ({
        display: Info,
        props: { text: x.rules }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'enabled',
      label: 'Enabled',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.enabled }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'distribution',
      label: 'Distribution',
      value: (x) => ({
        display: LookupPill,
        props: { value: +x.distribution!, class: '!w-56', options: DISTRIBUTION_LOOKUP }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'default',
      label: 'Default',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.default }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'source_format',
      label: 'Source Format',
      value: (x) => ({
        display: Info,
        props: { text: x.source_format }
      })
    }),
    fac({
      icon: 'mdi:share',
      key: 'fixed_event',
      label: 'Fixed Event',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.fixed_event }
      })
    })
  ];

  return {
    data: cardData,
    header
  };
};
