import { POST } from '$lib/api';
import Info from '$lib/components/info/Info.svelte';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import type { components } from '$lib/api/misp';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import { DATE_FORMAT } from '$lib/components/config';
import InputCollection from '$lib/components/filter/InputCollection.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
import { shouldTextBeBlack } from '$lib/util/contrastColor.util';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { format } from 'date-fns';

export const load: PageLoad = async ({ fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await POST('/events/index', { body: { page: 1, limit: 50 }, fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<
    (typeof data)[number] & {
      GalaxyCluster?: (components['schemas']['GalaxyCluster'] & {
        local?: boolean;
        relationship_type?: string;
        Galaxy?: components['schemas']['Galaxy'];
      })[];
      EventTag?: (components['schemas']['EventTag'] & {
        relationship_type?: string;
        Tag?: components['schemas']['Tag'];
      })[];
    },
    DynTableHeadExtent
  >();
  console.log(data);

  const header = [
    col({ icon: 'mdi:id-card', key: 'id', label: 'ID', value: (x) => x.id ?? 'unknown' }),
    col({
      icon: 'mdi:information',
      key: 'description',
      label: 'Description',
      value: (x) => ({ display: Info, props: { text: x.info } })
    }),

    col({
      icon: 'material-symbols:work-outline',
      key: 'org',
      label: 'Organisations',
      value: (x) => ({
        display: PillCollection,
        props: {
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
        }
      })
    }),

    col({
      icon: 'mdi:tag',
      key: 'tags',
      label: 'Tags',
      value: (x) => ({
        display: PillCollection,
        props: {
          pills: (x.EventTag ?? []).map((y) => ({
            icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
            label: y.relationship_type ? y.relationship_type : undefined,
            text: y.Tag?.name,
            style: `background-color: ${y.Tag?.colour}; color: ${
              shouldTextBeBlack(y.Tag!.colour!) ? 'black' : 'white'
            }`
          }))
        }
      })
    }),
    col({
      icon: 'streamline:galaxy-2-solid',
      key: 'galaxy',
      label: 'Clusters',
      value: (x) => ({
        display: PillCollection,
        props: {
          pills: x.GalaxyCluster
            ? x.GalaxyCluster.map((y) => ({
                icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
                label: y.relationship_type ? y.relationship_type : undefined,
                text: y.Galaxy?.name
              }))
            : []
        }
      })
    }),

    col({
      icon: 'mdi:share',
      key: 'distribution',
      label: 'Distribution',
      value: (x) => ({
        display: LookupPill,
        props: { value: +(x.distribution ?? 0), options: DISTRIBUTION_LOOKUP }
      })
    }),

    col({
      icon: 'ph:hash-bold',
      key: 'attribute_count',
      label: 'Attr.',
      value: (x) => ({ display: Pill, props: { icon: 'ph:hash-bold', text: x.attribute_count } })
    }),

    // TODO: probably use DatePills
    col({
      icon: 'mdi:clock-outline',
      key: 'dates',
      label: 'Dates',
      value: (x) => ({
        display: PillCollection,
        props: {
          pills: [
            {
              label: 'created',
              text: format(x.date ? new Date(x.date) : new Date(), DATE_FORMAT)
            },

            {
              label: 'modified',
              text: format(x.timestamp ? new Date(+x.timestamp * 1000) : new Date(), DATE_FORMAT)
            },
            {
              label: 'published',
              text: format(
                x.publish_timestamp ? new Date(+x.publish_timestamp * 1000) : new Date(),
                DATE_FORMAT
              )
            }
          ]
        }
      })
    })
  ];

  const fil = createTableHeadGenerator<undefined>();
  const filter = [
    fil({
      label: 'Value',
      value: () => 'value'
    }),
    // In the current api published does not need to be an boolean. That's why we could use the string return from an input checkbox
    fil({
      label: 'Published',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'published'
        }
      })
    }),
    fil({
      label: 'Type',
      value: () => 'type'
    }),
    fil({
      label: 'Search all',
      value: () => 'searchall'
    }),
    // You can override the page limit with this.

    fil({
      label: 'Page Limit',
      value: () => 'limit'
    }),

    fil({
      label: 'Tags',
      value: () => ({
        display: InputCollection,
        props: {
          length: 5,
          name: 'tags',
          placeholder: 'New Tag'
        }
      })
    })
  ];

  return {
    header,
    tableData: data,
    filter
  };
};
