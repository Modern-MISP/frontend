import { GET } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from '../../[id]/$types';

import Info from '$lib/components/info/Info.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
import Boolean from '$lib/components/boolean/Boolean.svelte';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/galaxy_clusters/view/{galaxyClusterId}', {
    params: { path: { galaxyClusterId: params.id } },
    fetch
  });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<(typeof data)['GalaxyCluster']>();
  const leftCardHeader = [
    col({
      label: 'Value',
      value: (x) => x?.value ?? 'unknown'
    }),
    col({
      label: 'Description',
      value: (x) => x?.description ?? 'unknown'
    }),
    col({
      label: 'Type',
      value: (x) => x?.type ?? 'unknown'
    }),
    col({
      label: 'Parent Galaxy',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'streamline:galaxy-2-solid',
          label: x?.galaxy_id ?? 'unknown',
          text: x?.Galaxy?.name,
          href: `/galaxies/${x?.galaxy_id}`
        }
      })
    }),
    col({
      label: 'Source',
      value: (x) => x?.source ?? 'unknown'
    }),
    col({
      label: 'Authors',
      value: (x) => ({
        display: PillCollection,
        props: {
          pills: x?.authors?.map((a) => ({ icon: 'streamline:user-circle-single', text: a })) ?? [],
          class: 'pl-4'
        }
      })
    }),
    col({
      label: 'Events',
      value: (x) => x?.tag_count?.toString() ?? 'unknown'
    }),
    col({
      label: 'Tag',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:tag',
          label: x?.tag_id ?? 'unknown',
          text: x?.tag_name ?? 'unknown',
          href: x?.tag_id ? '/tags/' + x.tag_id : '#'
        }
      })
    })
  ];
  const rightCardHeader = [
    col({
      label: 'Version',
      value: (x) => x?.version ?? 'unknown'
    }),
    col({
      label: 'ID',
      value: (x) => x?.id ?? 'unknown'
    }),
    col({
      label: 'UUID',
      value: (x) => x?.uuid ?? 'unknown'
    }),
    col({
      label: 'Collection UUID',
      value: (x) => x?.collection_uuid ?? 'unknown'
    }),
    col({
      label: 'Organizations',
      value: (x) => ({
        display: PillCollection,
        props: {
          pills: [
            {
              icon: 'mdi:home',
              label: 'Owner',
              text: x?.Org?.name
            },
            {
              icon: 'mdi:creation',
              label: 'Creator',
              text: x?.Orgc?.name
            }
          ]
        }
      })
    }),
    col({
      label: 'Distribution',
      value: (x) => ({
        display: LookupPill,
        props: {
          value: +(x?.distribution ?? 0),
          options: DISTRIBUTION_LOOKUP
        }
      })
    }),
    col({
      label: 'Default',
      value: (x) => ({
        display: Boolean,
        props: {
          isTrue: x?.default
        }
      })
    })
  ];

  const galaxyElements = data.GalaxyCluster?.GalaxyElement ?? [];
  const col2 = createTableHeadGenerator<(typeof galaxyElements)[number], DynTableHeadExtent>();
  const elementsHeader = [
    col2({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id ?? 'unknown' }),
    col2({
      icon: 'mdi:key',
      key: 'key',
      label: 'key',
      value: (x) => ({
        display: Info,
        props: {
          text: x.key
        }
      })
    }),
    col2({
      icon: 'mdi:circle',
      key: 'value',
      label: 'Value',
      value: (x) => ({
        display: Info,
        props: { text: x.value }
      })
    })
  ];

  return {
    cardData: data.GalaxyCluster,
    leftCardHeader,
    rightCardHeader,
    tableData: galaxyElements,
    tableHeader: elementsHeader
  };
};
