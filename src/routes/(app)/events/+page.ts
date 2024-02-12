import { api } from '$lib/api';
import Info from '$lib/components/info/Info.svelte';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

import type { components } from '$lib/api/misp';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import TagPicker from '$lib/components/tagForms/TagPicker.svelte';
import { ANALYSIS_LOOKUP, DISTRIBUTION_LOOKUP, THREAT_LEVEL_LOOKUP } from '$lib/consts/PillLookups';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { notifications } from '$lib/stores';
import { shouldTextBeBlack } from '$lib/util/contrastColor.util';
import { errorPill } from '$lib/util/pill.util';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

import Select from '$lib/components/form/Select.svelte';
import { genSelectProps } from '$lib/util/select.util';
import Input from '$lib/components/input/Input.svelte';

export const load: PageLoad = async ({ fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).POST('/events/index', { body: { page: 1, limit: 50 }, fetch });

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

    col({
      icon: 'mdi:clock-outline',
      key: 'dates',
      label: 'Dates',
      value: (x) => ({
        display: PillCollection,
        props: {
          base: DatePill,
          pills: [
            {
              label: 'created',
              date: x.date ? new Date(x.date) : new Date()
            },

            {
              label: 'modified',
              date: x.timestamp ? new Date(+x.timestamp * 1000) : new Date()
            },
            {
              label: 'published',
              date: x.publish_timestamp ? new Date(+x.publish_timestamp * 1000) : new Date()
            }
          ]
        }
      })
    })
  ];

  const { data: orgs } = await get(api).GET('/organisations', { fetch });
  const orgOptions = orgs?.map((x) => x.Organisation);
  const fil = createTableHeadGenerator<undefined>();
  const filter = [
    fil({
      label: 'Value',
      value: () => 'value'
    }),
    // Not specified in the api spec. But does work anyways.
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
      label: 'Attribute',
      value: () => 'attribute'
    }),

    fil({
      label: 'Event ID',
      value: () => 'eventid'
    }),
    fil({
      label: 'Event Info',
      value: () => 'eventinfo'
    }),
    fil({
      label: 'Sharing Group',
      value: () => 'sharinggroup'
    }),
    fil({
      label: 'Event Information',
      value: () => 'eventinfo'
    }),
    fil({
      label: 'Organisation',
      value: () => ({
        display: Select,
        props: {
          ...genSelectProps(orgOptions),
          name: 'org'
        }
      })
    }),

    fil({
      label: 'Analysis',
      value: () => ({
        display: Select,
        props: {
          value: '',
          options: ANALYSIS_LOOKUP.map((x, i) => ({
            label: x.text ?? 'unknown',
            value: '' + i
          })),
          name: 'analysis'
        }
      })
    }),
    fil({
      label: 'Threat Level',
      value: () => ({
        display: Select,
        props: {
          value: '',
          options: THREAT_LEVEL_LOOKUP.map((x, i) => ({
            label: x.text ?? 'unknown',
            value: '' + i
          })),
          name: 'threatlevel'
        }
      })
    }),

    fil({
      label: 'Email',
      value: () => 'email'
    }),
    fil({
      label: 'Has Proposal',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'hasproposal'
        }
      })
    }),

    fil({
      label: 'Date From',
      value: () => ({
        display: Input,
        props: {
          name: 'datefrom',
          type: 'date'
        }
      })
    }),
    fil({
      label: 'Date Until',
      value: () => ({
        display: Input,
        props: {
          name: 'dateuntil',
          type: 'date'
        }
      })
    }),

    fil({
      label: 'Tags',
      value: () => ({
        display: TagPicker,
        props: {
          name: 'tags'
        }
      })
    })
  ];
  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:event-add',
      label: 'Add Event',
      action: '/events/new'
    }
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Delete event',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: (x) => {
        // TODO: add a endpoint if found.
        notifications.add(
          errorPill('Do not know the endpoint. Delete: ' + x.map((y) => y.id).join())
        );
      }
    }
  ];

  return {
    header,
    tableData: data,
    filter,
    topMenuActions,
    editActions
  };
};
