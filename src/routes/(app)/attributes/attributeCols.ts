import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import Info from '$lib/components/info/Info.svelte';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import type { components } from '$lib/api/misp';
import type { TableHead } from '$lib/models/TableHead.interface';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
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
  object_relation: {
    key: 'object_relation',
    label: 'Object Relation',
    icon: 'mdi:circle',
    value: (x) => x.object_relation ?? ''
  },
  type: {
    icon: '',
    key: 'type',
    label: 'Type',
    value: (x) => x.type ?? ''
  },
  deleted: {
    label: 'Deleted',
    key: 'deleted',
    icon: 'mdi:delete',
    value: (x) => ({
      display: Boolean,
      props: {
        isTrue: x.deleted
      }
    })
  }
} satisfies Record<string, TableHead<components['schemas']['Attribute']> & DynTableHeadExtent>;

export const editAttributeCols = (
  options: components['schemas']['DescribeAttributeTypesResponse']
) =>
  ({
    distribution: {
      value: () => ({
        display: Select,
        props: {
          options: DISTRIBUTION_LOOKUP.map((d, i) => ({
            value: i.toString(),
            label: d.text!
          }))
        }
      })
    },
    category: {
      value: () => ({
        display: Select,
        props: {
          options: options.categories?.map((c) => ({ value: c, label: c })) ?? []
        }
      })
    },
    comment: {
      value: () => ({
        display: Input,
        props: {
          name: 'comment'
        }
      })
    },
    value: {
      value: () => ({
        display: Input,
        props: {
          name: 'value'
        }
      })
    }
  }) satisfies Record<
    string,
    Partial<TableHead<components['schemas']['Attribute']> & DynTableHeadExtent>
  >;
