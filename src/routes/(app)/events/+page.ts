import { POST } from '$lib/api';
import Info from '$lib/components/info/Info.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { DATE_FORMAT } from '$lib/components/config';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import { createTableHeadGenerator } from '$lib/components/table/TableBuilder';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { shouldTextBeBlack } from '$lib/util/contrastColor.util';
import { format } from 'date-fns';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';

export const load: PageLoad = async () => {
  const {
    data,
    error: mispError,
    response
  } = await POST('/events/index', { body: { page: 1, limit: 50 } });

  if (mispError) throw error(response.status, mispError.message);

  const col = createTableHeadGenerator<(typeof data)[number], DynTableHeadExtent>();
  console.log(data);

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id ?? 'unknown' }),
    col({
      icon: 'mdi:information',
      key: 'description',
      label: 'Description',
      display: Info,
      value: (x) => ({ text: x.info })
    }),

    col({
      icon: 'material-symbols:work-outline',
      key: 'org',
      label: 'Organisations',
      display: PillCollection,
      value: (x) => ({
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
      })
    }),

    col({
      icon: 'mdi:tag',
      key: 'tags',
      label: 'Tags',
      display: PillCollection,
      value: (x) => ({
        pills: x.EventTag.map((y) => ({
          icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
          label: y.relationship_type ? y.relationship_type : undefined,
          text: y.Tag.name,
          style: `background-color: ${y.Tag.colour}; color: ${
            shouldTextBeBlack(y.Tag.colour) ? 'black' : 'white'
          }`
        }))
      })
    }),
    col({
      icon: 'streamline:galaxy-2-solid',
      key: 'galaxy',
      label: 'Clusters',
      display: PillCollection,
      value: (x) => ({
        pills: x.GalaxyCluster
          ? x.GalaxyCluster.map((y) => ({
              icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
              label: y.relationship_type ? y.relationship_type : undefined,
              text: y.Galaxy.name
            }))
          : []
      })
    }),

    col({
      icon: 'mdi:share',
      key: 'distribution',
      label: 'Distribution',
      display: LookupPill,
      value: (x) => ({ value: +(x.distribution ?? 0), numberLookUp: DISTRIBUTION_LOOKUP })
    }),

    col({
      icon: 'ph:hash-bold',
      key: 'attribute_count',
      label: 'Attr.',
      display: Pill,
      value: (x) => ({ icon: 'ph:hash-bold', text: x.attribute_count })
    }),

    // TODO: probably use DatePills
    col({
      icon: 'mdi:clock-outline',
      key: 'dates',
      label: 'Dates',
      display: PillCollection,
      value: (x) => ({
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
      })
    })
  ];

  return {
    header,
    tableData: data
  };
};
