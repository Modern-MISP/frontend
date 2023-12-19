import { POST } from '$lib/api';
import Info from '$lib/components/info/Info.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { DATE_FORMAT } from '$lib/components/config';
import DistributionPill from '$lib/components/distributionPill/DistributionPill.svelte';
import type DynTable from '$lib/components/dynTable/DynTable.svelte';
import Pill from '$lib/components/pill/Pill.svelte';
import PillCollection from '$lib/components/pill/PillCollection.svelte';
import { shouldTextBeBlack } from '$lib/util/contrastColor.util';
import { format } from 'date-fns';

export const load: PageLoad = async () => {
  const {
    data,
    error: mispError,
    response
  } = await POST('/events/index', { body: { page: 0, limit: 50 } });

  if (mispError) throw error(response.status, mispError.message);

  const header = [
    { icon: 'mdi:id-card', name: 'id', value: 'ID' },
    {
      icon: 'mdi:information',
      name: 'description',
      value: 'Description',
      displayComp: Info,
      class: 'w-8'
    },

    {
      icon: 'material-symbols:work-outline',
      name: 'org',
      value: 'Organisations',
      displayComp: PillCollection
    },

    { icon: 'mdi:tag', name: 'tags', value: 'Tags', displayComp: PillCollection },
    {
      icon: 'streamline:galaxy-2-solid',
      name: 'galaxy',
      value: 'Clusters',
      displayComp: PillCollection
    },

    {
      icon: 'mdi:share',
      name: 'distribution',
      value: 'Distribution',
      displayComp: DistributionPill,
      class: 'w-64'
    },

    { icon: 'ph:hash-bold', name: 'attribute_count', value: 'Attr.', displayComp: Pill },
    {
      icon: 'mdi:clock-outline',
      name: 'dates',
      value: 'Dates',
      displayComp: PillCollection
    }
  ] as const;

  const tableData: DynTable<typeof header>['$$prop_def']['data'] = data.map((x) => ({
    id: x.id,
    attribute_count: { icon: 'ph:hash-bold', text: x.attribute_count },
    description: { text: x.info },
    distribution: { distribution: +(x.distribution ?? 0) },

    org: {
      class: 'flex-col',
      pills: [
        {
          icon: 'material-symbols:work-outline',
          text: x.Orgc?.name ?? 'unknown'
        },

        {
          icon: 'mdi:account-outline',
          text: x.Org?.name ?? 'unknown'
        }
      ]
    },
    tags: {
      pills: x.EventTag.map((y) => ({
        icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
        label: y.relationship_type ? y.relationship_type : undefined,
        text: y.Tag.name,
        style: `background-color: ${y.Tag.colour}; color: ${
          shouldTextBeBlack(y.Tag.colour) ? 'black' : 'white'
        }`
      }))
    },
    galaxy: {
      pills: x.GalaxyCluster
        ? x.GalaxyCluster.map((y) => ({
            icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
            label: y.relationship_type ? y.relationship_type : undefined,
            text: y.Galaxy.name
          }))
        : []
    },
    dates: {
      class: 'flex-col',
      pills: [
        {
          label: 'created',
          text: format(x.date ? new Date(x.date) : new Date(), DATE_FORMAT)
        },

        {
          label: 'modified',
          text: format(x.timestamp ? new Date(+x.timestamp) : new Date(), DATE_FORMAT)
        },
        {
          label: 'published',
          text: format(
            x.publish_timestamp ? new Date(+x.publish_timestamp) : new Date(),
            DATE_FORMAT
          )
        }
      ]
    }
  }));
  return {
    events: data,
    header,
    tableData
  };
};
