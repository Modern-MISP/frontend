import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import Info from '$lib/components/info/Info.svelte';
import type { components } from '$lib/api/misp';

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
      icon: 'mdi-calendar',
      text: x.event_id!,
      href: `/events/${x.event_id}`
    }),
    display: HrefPill
  },
  distribution: {
    icon: 'mdi:share',
    key: 'distribution',
    label: 'Distribution',
    display: LookupPill,
    value: (x) => ({
      value: +(x.distribution ?? 0),
      options: DISTRIBUTION_LOOKUP
    })
  },
  category: {
    icon: 'mdi:circle',
    key: 'category',
    label: 'Category',
    display: Pill,
    value: (x) => ({
      text: x.category
    })
  },
  value: {
    icon: 'mdi:circle',
    key: 'value',
    label: 'Value',
    display: Info,
    value: (x) => ({ text: x.value })
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
    value: (x) => x.object_id!
  },
  object_relation: {
    key: 'object_relation',
    label: 'Object Relation',
    icon: 'mdi:circle',
    value: (x) => x.object_relation!
  }
} satisfies Record<
  string,
  { value: (x: components['schemas']['Attribute']) => unknown } & Record<string, unknown>
>;
