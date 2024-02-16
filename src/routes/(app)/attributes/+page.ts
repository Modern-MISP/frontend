import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
import type { components } from '$lib/api/misp';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import Info from '$lib/components/info/Info.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import PillCollection from '$lib/components/pills/pillCollection/PillCollection.svelte';
import { shouldTextBeBlack } from '$lib/util/color.util';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Select from '$lib/components/form/Select.svelte';
import Input from '$lib/components/input/Input.svelte';
import TagPicker from '$lib/components/tagForms/TagPicker.svelte';
import { THREAT_LEVEL_LOOKUP, EXPORT_FORMAT_LOOKUP } from '$lib/consts/PillLookups';

export const load = async ({ fetch }) => {
  const {
    response,
    data,
    error: mispError
  } = await get(api).POST('/attributes/restSearch', { fetch, body: { limit: 50, page: 1 } });

  if (mispError) throw error(response.status as NumericRange<400, 599>, mispError.message);

  const tableData = data.response?.Attribute ?? [];

  const describeTypesResponse = await get(api).GET('/attributes/describeTypes');
  if (describeTypesResponse.error)
    throw error(
      describeTypesResponse.response.status as NumericRange<400, 599>,
      describeTypesResponse.error.message
    );
  const options: components['schemas']['DescribeAttributeTypesResponse'] = (
    describeTypesResponse.data as unknown as { result: typeof describeTypesResponse.data }
  ).result;

  const col = createTableHeadGenerator<
    Omit<(typeof tableData)[number], 'Tag'> & {
      Tag?: (components['schemas']['Tag'] & {
        relationship_type?: string;
        local?: boolean;
      })[];
    },
    DynTableHeadExtent
  >();

  const header = [
    col({
      icon: 'mdi:id-card',
      key: 'id',
      label: 'ID',
      value: (x) => x.id ?? 'unknown'
    }),
    col({
      icon: 'mdi-calendar',
      key: 'event',
      label: 'Event',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi-calendar',
          text: x.event_id!,
          href: `/events/${x.event_id}`
        }
      })
    }),
    col({
      icon: 'mdi:circle',
      key: 'category',
      label: 'Category',
      value: (x) => ({
        display: Pill,
        props: {
          text: x.category
        }
      })
    }),
    col({
      icon: '',
      key: 'type',
      label: 'Type',
      value: (x) => x.type ?? ''
    }),
    col({
      icon: 'mdi:circle',
      key: 'value',
      label: 'Value',
      value: (x) => ({
        display: Info,
        props: { text: x.value, class: 'max-w-xs overflow-hidden text-ellipsis' }
      })
    }),
    col({
      icon: 'mdi:comment',
      key: 'comment',
      label: 'Comment',
      value: (x) => x.comment ?? 'text'
    }),
    col({
      key: 'object_id',
      label: 'Object ID',
      icon: 'mdi:format-list-group',
      value: (x) => x.object_id ?? ''
    }),
    col({
      icon: 'mdi:share',
      key: 'distribution',
      label: 'Distribution',
      value: (x) => ({
        display: LookupPill,
        props: {
          value: +(x.distribution ?? 0),
          options: DISTRIBUTION_LOOKUP
        }
      })
    }),
    col({
      icon: 'mdi:circle',
      key: 'object_relation',
      label: 'Object Relation',
      value: (x) => x.object_relation ?? ''
    }),
    col({
      icon: 'mdi:circle',
      key: 'disable_correlation',
      label: 'Correlate',
      value: (x) => ({ display: Boolean, props: { isTrue: !x.disable_correlation } })
    }),
    col({
      icon: 'mdi:flag',
      key: 'to_ids',
      label: 'IDS flag',
      value: (x) => ({ display: Boolean, props: { isTrue: x.to_ids } })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'date',
      label: 'Date',
      value: (x) => ({
        display: DatePill,
        props: {
          date: x.timestamp ? new Date(+x.timestamp * 1000) : new Date()
        }
      })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'first_seen',
      label: 'First Sighting',
      value: (x) => ({
        display: DatePill,
        props: {
          date: x.first_seen ? new Date(+x.first_seen || 0) : null,
          onNullText: 'no sighting'
        }
      })
    }),
    col({
      icon: 'mdi:clock-outline',
      key: 'last_seen',
      label: 'Last Sighting',
      value: (x) => ({
        display: DatePill,
        props: {
          date: x.last_seen ? new Date(+x.last_seen || 0) : null,
          onNullText: 'no sighting'
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
          pills: (x.Tag ?? []).map((y) => ({
            icon: y.local ? 'mdi:cloud-off-outline' : 'mdi:earth',
            label: y.relationship_type ? y.relationship_type : undefined,
            text: y.name,
            style: `background-color: ${y.colour}; color: ${
              shouldTextBeBlack(y.colour!) ? 'black' : 'white'
            }`
          }))
        }
      })
    })
  ];

  const describeTypes = await get(api).GET('/attributes/describeTypes');
  if (describeTypes.error)
    throw error(
      describeTypes.response.status as NumericRange<400, 599>,
      describeTypes.error.message
    );

  const fil = createTableHeadGenerator<undefined>();
  const filter = [
    fil({
      label: 'Category',
      value: () => ({
        display: Select,
        props: {
          name: 'category',
          options: options.categories?.map((c) => ({ value: c, label: c })) ?? [],
          value: ''
        }
      })
    }),
    fil({
      label: 'Type',
      value: () => ({
        display: Select,
        props: {
          name: 'type',
          options: options.types?.map((c) => ({ value: c, label: c })) ?? [],
          value: ''
        }
      })
    }),
    fil({
      label: 'Value',
      value: () => 'value'
    }),
    fil({
      label: 'IDS flag',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'to_ids'
        }
      })
    }),
    fil({
      label: 'Value1',
      value: () => 'value1'
    }),
    fil({
      label: 'Value2',
      value: () => 'value2'
    }),
    fil({
      label: 'Organization',
      value: () => 'org'
    }),
    fil({
      label: 'Tags',
      value: () => ({
        display: TagPicker,
        props: {
          name: 'tags'
        }
      })
    }),
    fil({
      label: 'Date From',
      value: () => ({
        display: Input,
        props: {
          name: 'to',
          type: 'date'
        }
      })
    }),
    fil({
      label: 'Date Until',
      value: () => ({
        display: Input,
        props: {
          name: 'until',
          type: 'date'
        }
      })
    }),
    fil({
      label: 'Time range',
      value: () => 'last'
    }),
    fil({
      label: 'Event ID',
      value: () => 'eventid'
    }),
    fil({
      label: 'Has attachment',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'withAttachments'
        }
      })
    }),
    fil({
      label: 'Sharing group IDs',
      value: () => 'sharinggroup'
    }),
    fil({
      label: 'Metadata',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'metadata'
        }
      })
    }),
    fil({
      label: 'UUID',
      value: () => 'uuid'
    }),
    fil({
      label: 'Publish timestamp',
      value: () => 'publish_timestamp'
    }),
    fil({
      label: 'Timestamp',
      value: () => 'timestamp'
    }),
    fil({
      label: 'Is published',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'published'
        }
      })
    }),
    fil({
      label: 'Enforce Warning List',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'enforceWarningList'
        }
      })
    }),
    fil({
      label: 'Sharing group reference only',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'sgReferenceOnly'
        }
      })
    }),
    fil({
      label: 'Requested attributes',
      value: () => 'requested_attributes'
    }),
    fil({
      label: 'Include context',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'includeContext'
        }
      })
    }),
    fil({
      label: 'Headerless',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'headerless'
        }
      })
    }),
    fil({
      label: 'Include warning list hits',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'includeWarninglistHits'
        }
      })
    }),
    fil({
      label: 'Attack galaxy',
      value: () => 'attackGalaxy'
    }),
    fil({
      label: 'Is deleted',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'deleted'
        }
      })
    }),
    fil({
      label: 'Exclude local tags',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'excludeLocalTags'
        }
      })
    }),
    fil({
      label: 'Include sighting db',
      value: () => ({
        display: Checkbox,
        props: {
          checked: false,
          name: 'includeSightingsb'
        }
      })
    }),
    fil({
      label: 'tag',
      value: () => 'tag'
    }),
    fil({
      label: 'Object relation',
      value: () => 'object_relation'
    }),
    fil({
      label: 'Threat level',
      value: () => ({
        display: Select,
        props: {
          value: '',
          options: THREAT_LEVEL_LOOKUP.map((x, i) => ({
            label: x.text ?? 'unknown',
            value: '' + i
          })),
          name: 'threat_level_id'
        }
      })
    }),
    fil({
      label: 'Response format',
      value: () => ({
        display: Select,
        props: {
          value: '',
          options: EXPORT_FORMAT_LOOKUP.map((x, i) => ({
            label: x.text ?? 'unknown',
            value: x.text
          })),
          name: 'returnFormat'
        }
      })
    }),
    fil({
      label: 'Search all',
      value: () => 'searchall'
    }),
    // You can override the page limit with this.

    fil({
      label: 'Page Limit',
      value: () => 'limit'
    })
  ];
  const topMenuActions: ActionBarEntryProps[] = [
    {
      icon: 'mdi:event-add',
      label: 'Add Attributes',
      action: '' //TODO: /attributes/new
    },
    {
      icon: 'mdi:pencil-outline',
      label: 'Freetext Import Tool',
      action: '' //TODO: freetext import tool
    },
    {
      icon: 'mdi:pencil-outline',
      label: 'Attribute Replacement Tool',
      action: '' //TODO: attribute replacement tool
    }
  ];

  const editActions: DynCardActionHeader<typeof data>[] = [
    {
      label: 'Delete Attribute',
      icon: 'mdi:delete-outline',
      class: 'text-red',
      action: () => '' //TODO: delete attribute
    }
  ];
  return {
    header,
    tableData,
    filter,
    topMenuActions,
    editActions
  };
};
