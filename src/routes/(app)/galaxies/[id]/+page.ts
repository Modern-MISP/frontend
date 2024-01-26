import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';
import Input from '$lib/components/input/Input.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';

import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import { createTableHeadGenerator, createTableHeadGenerator2 } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/galaxies/view/{galaxyId}', { params: { path: { galaxyId: params.id } }, fetch });

  if (mispError) error(response.status, mispError.message);

  const col = createTableHeadGenerator<
    Required<(typeof data)['GalaxyCluster']>[number],
    DynTableHeadExtent
  >();

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id }),
    col({
      icon: 'mdi:circle',
      key: 'value',
      label: 'Value',
      display: Info,
      value: (x) => ({ text: x.value })
    }),
    col({
      icon: 'mdi:information-outline',
      key: 'description',
      label: 'Description',
      display: Info,
      value: (x) => ({ text: x.description || 'none', class: 'line-clamp-3' })
    }),
    col({
      icon: 'material-symbols:work-outline',
      key: 'org',
      label: 'Organisations',
      display: PillCollection,
      value: (x) => ({
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
      })
    }),
    col({
      icon: 'ph:hash-bold',
      key: 'event_count',
      label: 'Evens',
      display: Pill,
      value: () => ({
        icon: 'ph:hash-bold',
        text: '!apiResponse'
      })
    }),
    col({
      icon: 'mdi:checkbox-marked-outline',
      key: 'default',
      label: 'Default',
      display: Boolean,
      value: (x) => ({ isTrue: x.default, class: 'm-auto' })
    }),
    col({
      icon: 'mdi:web-sync',
      key: 'published',
      label: 'Published',
      display: Boolean,
      value: (x) => ({ isTrue: x.published, class: 'm-auto' })
    }),
    col({
      icon: 'mdi:web',
      key: 'distribution',
      label: 'Distribution',
      display: LookupPill,
      value: (x) => ({ value: +x.distribution, class: '!w-56', options: DISTRIBUTION_LOOKUP })
    })
  ];

  const fac = createTableHeadGenerator2<typeof data.Galaxy>();

  const left = [
    fac(
      {
        label: 'Name',
        value: (x) => x?.name ?? 'unknown'
      },
      {
        value: (x) => ({ display: Input, props: { value: x?.name ?? 'unknown' } })
      }
    ),
    fac({
      label: 'Description',
      display: Info,
      value: (x) => ({
        text: x?.description ?? 'unknown'
      })
    }),
    fac({
      label: 'Namespace',
      value: (x) => x?.namespace ?? 'unknown'
    })
  ];

  const right = [
    fac({
      label: 'Version',
      value: (x) => x?.version ?? 'unknown'
    }),
    fac({
      label: 'ID',
      value: (x) => x?.id ?? 'unknown'
    }),
    fac({
      label: 'UUID',
      value: (x) => x?.uuid ?? 'unknown'
    }),
    fac({
      label: 'Enabled',
      display: Boolean,
      value: (x) => ({ isTrue: x?.enabled ?? false })
    }),
    fac({
      label: 'Local Only',
      display: Boolean,
      value: (x) => ({ isTrue: x?.local_only ?? false })
    })
  ];

  return {
    galaxy: data,
    header,
    left,
    right
  };
};
