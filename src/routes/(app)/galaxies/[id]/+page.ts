import { api } from '$lib/api';
import { get } from 'svelte/store';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';

import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/galaxies/view/{galaxyId}', {
    params: { path: { galaxyId: params.id } },
    fetch
  });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const fac = createTableHeadGenerator<
    NonNullable<(typeof data)['GalaxyCluster']>[number],
    DynTableHeadExtent
  >();

  const header = [
    fac({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id! }),
    fac({
      icon: 'mdi:circle',
      key: 'value',
      label: 'Value',
      value: (x) => ({ display: Info, props: { text: x.value } })
    }),
    fac({
      icon: 'mdi:information-outline',
      key: 'description',
      label: 'Description',
      value: (x) => ({
        display: Info,
        props: { text: x.description || 'none', class: 'line-clamp-3' }
      })
    }),
    fac({
      icon: 'material-symbols:work-outline',
      key: 'org',
      label: 'Organizations',
      value: (x) => ({
        display: PillCollection,
        props: {
          class: 'flex-col',
          pills: [
            {
              icon: 'material-symbols:work-outline',
              text: x.org_id ?? 'unknown'
            },

            {
              icon: 'mdi:account-outline',
              text: x.orgc_id ?? 'unknown'
            }
          ]
        }
      })
    }),
    fac({
      icon: 'ph:hash-bold',
      key: 'event_count',
      label: 'Events',
      value: () => ({
        display: Pill,
        props: {
          icon: 'ph:hash-bold',
          text: '?'
        }
      })
    }),
    fac({
      icon: 'mdi:checkbox-marked-outline',
      key: 'default',
      label: 'Default',
      value: (x) => ({ display: Boolean, props: { isTrue: x.default, class: 'm-auto' } })
    }),
    fac({
      icon: 'mdi:web-sync',
      key: 'published',
      label: 'Published',
      value: (x) => ({ display: Boolean, props: { isTrue: x.published, class: 'm-auto' } })
    }),
    fac({
      icon: 'mdi:share',
      key: 'distribution',
      label: 'Distribution',
      value: (x) => ({
        display: LookupPill,
        props: { value: +x.distribution!, class: '!w-56', options: DISTRIBUTION_LOOKUP }
      })
    })
  ];

  const fac2 = createTableHeadGenerator<
    typeof data.Galaxy & { enabled?: boolean; local_only?: boolean }
  >();

  const left = [
    fac2({
      label: 'Name',
      value: (x) => x?.name ?? 'unknown'
    }),
    fac2({
      label: 'Description',
      value: (x) => ({
        display: Info,
        props: {
          text: x?.description ?? 'unknown'
        }
      })
    }),
    fac2({
      label: 'Namespace',
      value: (x) => x?.namespace ?? 'unknown'
    })
  ];

  const right = [
    fac2({
      label: 'Version',
      value: (x) => x?.version ?? 'unknown'
    }),
    fac2({
      label: 'ID',
      value: (x) => x?.id ?? 'unknown'
    }),
    fac2({
      label: 'UUID',
      value: (x) => x?.uuid ?? 'unknown'
    }),
    fac2({
      label: 'Enabled',
      value: (x) => ({ display: Boolean, props: { isTrue: x?.enabled ?? false } })
    }),
    fac2({
      label: 'Local Only',
      value: (x) => ({ display: Boolean, props: { isTrue: x?.local_only ?? false } })
    })
  ];

  return {
    galaxy: data,
    header,
    left,
    right
  };
};
