import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import Info from '$lib/components/info/Info.svelte';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import type { components } from '$lib/api/misp';
import type { TableHead } from '$lib/models/TableHead.interface';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Select from '$lib/components/form/Select.svelte';
import Input from '$lib/components/input/Input.svelte';

export default {
  id: {
    icon: 'mdi:id-card',
    key: 'id',
    label: 'ID',
    value: (x) => x.id ?? 'unknown'
  },
  event: {
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
  },
  category: {
    icon: 'mdi:circle',
    key: 'category',
    label: 'Category',
    value: (x) => ({
      display: Pill,
      props: {
        text: x.category
      }
    })
  },
  type: {
    icon: '',
    key: 'type',
    label: 'Type',
    value: (x) => x.type ?? ''
  },
  value: {
    icon: 'mdi:circle',
    key: 'value',
    label: 'Value',
    value: (x) => ({
      display: Info,
      props: { text: x.value, class: 'max-w-xs overflow-hidden text-ellipsis' }
    })
  },
  comment: {
    icon: 'mdi:comment',
    key: 'comment',
    label: 'Comment',
    value: (x) => x.comment ?? ''
  },
  object_id: {
    key: 'object_id',
    label: 'Object ID',
    icon: 'mdi:format-list-group',
    value: (x) => x.object_id ?? ''
  },
  distribution: {
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
  },
  object_relation: {
    icon: 'mdi:circle',
    key: 'object_relation',
    label: 'Object Relation',
    value: (x) => x.object_relation ?? ''
  },
  correlation_flag: {
    icon: 'mdi:circle',
    key: 'disable_correlation',
    label: 'Correlate',
    value: (x) => ({ display: Boolean, props: { isTrue: !x.disable_correlation } })
  },
  ids_flag: {
    icon: 'mdi:flag',
    key: 'to_ids',
    label: 'IDS flag',
    value: (x) => ({ display: Boolean, props: { isTrue: x.to_ids } })
  },
  date: {
    icon: 'mdi:clock-outline',
    key: 'date',
    label: 'Date',
    value: (x) => ({
      display: DatePill,
      props: {
        date: x.timestamp ? new Date(+x.timestamp * 1000) : new Date()
      }
    })
  },
  first_sighting: {
    icon: 'mdi:clock-outline',
    key: 'first_seen',
    label: 'First Sighting',
    value: (x) => ({
      display: DatePill,
      props: {
        date: x.first_seen ? new Date(+x.first_seen || 0) : new Date() //TODO: never seen
      }
    })
  },
  last_sighting: {
    icon: 'mdi:clock-outline',
    key: 'last_seen',
    label: 'Last Sighting',
    value: (x) => ({
      display: DatePill,
      props: {
        date: x.last_seen ? new Date(+x.last_seen || 0) : new Date() //TODO: never seen
      }
    })
  }
  //TODO: add tags (tags with is_galaxy==false) and galaxies (tags with is_galaxy==true)
  //TODO: add sightings
  //TODO: add org
  //TODO: add batch import flag
} satisfies Record<string, TableHead<components['schemas']['Attribute']> & DynTableHeadExtent>;

export const editAttributeCols = (
  options: components['schemas']['DescribeAttributeTypesResponse']
) =>
  ({
    distribution: {
      value: (x) => ({
        display: Select,
        props: {
          value: (x?.distribution ?? 1).toString(),
          options: DISTRIBUTION_LOOKUP.map((d, i) => ({
            value: i.toString(),
            label: d.text!
          }))
        },
        name: 'distribution'
      })
    },
    category: {
      value: () => ({
        display: Select,
        props: {
          name: 'category',
          options: options.categories?.map((c) => ({ value: c, label: c })) ?? []
        }
      })
    },
    comment: {
      value: (x) => ({
        display: Input,
        props: {
          name: 'comment',
          value: x?.comment ?? ''
        }
      })
    },
    value: {
      value: (x) => ({
        display: Input,
        props: {
          name: 'value',
          value: x?.value ?? ''
        }
      })
    }
  }) satisfies Record<
    string,
    Partial<TableHead<components['schemas']['Attribute']> & DynTableHeadExtent>
  >;
