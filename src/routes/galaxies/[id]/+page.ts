import { GET } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from '../../galaxy/[id]/view/$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Info from '$lib/components/info/Info.svelte';

import Pill from '$lib/components/pills/pill/Pill.svelte';

import type DynTable from '$lib/components/table/dynTable/DynTable.svelte';

import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import DistributionPill from '$lib/components/pills/distributionPill/DistributionPill.svelte';

export const load: PageLoad = async ({ params }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/galaxies/view/{galaxyId}', { params: { path: { galaxyId: params.id } } });

  if (mispError) throw error(response.status, mispError.message);
  const header = [
    { icon: 'mdi:id-card', name: 'id', value: 'ID' },
    { icon: 'mdi:circle', name: 'value', value: 'Value', displayComp: Info },
    { icon: 'mdi:information', name: 'description', value: 'Description', displayComp: Info },
    {
      icon: 'material-symbols:work-outline',
      name: 'org',
      value: 'Organisations',
      displayComp: PillCollection
    },
    { icon: 'ph:hash-bold', name: 'event_count', value: 'Events', displayComp: Pill },
    // { icon: 'ph:hash-bold', name: 'relations', value: 'Relations', displayComp: PillCollection },

    {
      icon: 'mdi:checkbox-marked-outline',
      name: 'default',
      value: 'Default',
      displayComp: Boolean
    },
    {
      icon: 'mdi:web-sync',
      name: 'published',
      value: 'Published',
      displayComp: Boolean
    },

    {
      icon: 'mdi:web',
      name: 'distribution',
      value: 'Distribution',
      displayComp: DistributionPill,
      class: 'w-56'
    }
  ] as const;

  console.log(data);

  const tableData: DynTable<typeof header>['$$prop_def']['data'] = data.GalaxyCluster.map((x) => ({
    id: x.id,
    value: { text: x.value },
    description: { text: x.description || 'none' },
    org: {
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
    },
    event_count: {
      icon: 'ph:hash-bold',
      text: '!apiResponse'
    },
    // relations: { text: x.relations },
    default: { isTrue: x.default, class: 'm-auto' },
    published: { isTrue: x.published, class: 'm-auto' },
    distribution: { distribution: +x.distribution }
  }));

  return {
    galaxy: data,
    tableData,
    header
  };
};
