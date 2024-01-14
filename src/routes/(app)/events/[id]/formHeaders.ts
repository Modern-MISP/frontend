import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Select from '$lib/components/form/Select.svelte';
import Input from '$lib/components/input/Input.svelte';
import { ANALYSIS_LOOKUP, DISTRIBUTION_LOOKUP, THREAT_LEVEL_LOOKUP } from '$lib/consts/PillLookups';
import type { PageData } from './$types';
import { format } from 'date-fns';

const col = createTableHeadGenerator<PageData['event']>();

export const viewHeader = [
  col({ key: 'info', label: 'Info', value: (x) => x?.info ?? 'unknown' }),
  col({
    label: 'Threat Level',
    display: LookupPill,
    value: (x) => ({
      value: +(x?.threat_level_id ?? 1) - 1,
      options: THREAT_LEVEL_LOOKUP
    })
  }),
  col({
    label: 'Analysis',
    display: LookupPill,
    value: (x) => ({
      value: +(x?.analysis ?? 1),
      options: ANALYSIS_LOOKUP
    })
  }),
  col({
    label: 'Published',
    display: Boolean,
    value: (x) => ({
      isTrue: x?.published ?? false
    })
  }),
  col({
    label: 'Date',
    display: DatePill,
    value: (x) => ({
      date: x?.date ? new Date(x.date) : null
    })
  }),
  col({
    label: 'Creator user',
    display: HrefPill,
    value: (x) => ({
      href: 'mailto:' + x?.event_creator_email,
      text: x?.event_creator_email,
      icon: 'mdi:account-outline'
    })
  }),
  col({
    label: 'Creator Org',
    display: Pill,
    value: (x) => ({
      text: x?.Orgc?.name,
      icon: 'material-symbols:work-outline'
    })
  }),
  col({
    label: 'Owner Org',
    display: Pill,
    value: (x) => ({
      text: x?.Org?.name,
      icon: 'material-symbols:work-outline'
    })
  }),
  col({ label: 'ID', value: (x) => x?.id ?? 'unknown' }),
  col({ label: 'UUID', value: (x) => x?.uuid ?? 'unknown' }),
  col({
    label: 'Distribution',
    display: LookupPill,
    value: (x) => ({
      value: +(x?.distribution ?? 1),
      options: DISTRIBUTION_LOOKUP
    })
  }),
  col({
    label: 'Attribute Count',
    value: (x) =>
      `${(x?.Attribute?.length ?? 0) + (x?.Object?.length ?? 0)} (${
        x?.Object?.length ?? 0
      } Objects)`
  }),

  col({ label: 'Extends UUID', value: (x) => x?.extends_uuid || 'none' })
];

export const editHeader = [
  col({
    key: 'info',
    label: 'Info',
    display: Input,
    value: (x) => ({
      value: x?.info ?? '',
      name: 'info'
    })
  }),
  col({
    label: 'Threat Level',
    display: Select,
    value: (x) => ({
      value: '' + (+(x?.threat_level_id ?? 1) - 1),
      options: THREAT_LEVEL_LOOKUP.map((x, i) => ({ label: x.text ?? 'unknown', value: '' + i })),
      name: 'threat_level_id'
    })
  }),
  col({
    label: 'Analysis',
    display: Select,
    value: (x) => ({
      value: '' + (x?.analysis ?? 1),
      options: ANALYSIS_LOOKUP.map((x, i) => ({ label: x.text ?? 'unknown', value: '' + i })),
      name: 'analysis'
    })
  }),
  col({
    label: 'Published',
    display: Checkbox,
    value: (x) => ({
      checked: x?.published ?? false,
      name: 'published'
    })
  }),
  col({
    label: 'Date',
    display: Input,
    value: (x) => ({
      value: x?.date ? format(new Date(x.date), 'yyyy-MM-dd') : undefined,
      name: 'date',
      type: 'date'
    })
  }),
  col({
    label: 'Creator user',
    display: HrefPill,
    value: (x) => ({
      href: 'mailto:' + x?.event_creator_email,
      text: x?.event_creator_email,
      icon: 'mdi:account-outline'
    })
  }),
  col({
    label: 'Creator Org',
    display: Pill,
    value: (x) => ({
      text: x?.Orgc?.name,
      icon: 'material-symbols:work-outline'
    })
  }),
  col({
    label: 'Owner Org',
    display: Pill,
    value: (x) => ({
      text: x?.Org?.name,
      icon: 'material-symbols:work-outline'
    })
  }),
  col({ label: 'ID', value: (x) => x?.id ?? 'unknown' }),
  col({ label: 'UUID', value: (x) => x?.uuid ?? 'unknown' }),
  col({
    label: 'Distribution',
    display: Select,
    value: (x) => ({
      value: '' + (x?.distribution ?? 1),
      options: DISTRIBUTION_LOOKUP.map((x, i) => ({ label: x.text ?? 'unknown', value: '' + i })),
      name: 'distribution'
    })
  }),
  col({
    label: 'Attribute Count',
    value: (x) =>
      `${(x?.Attribute?.length ?? 0) + (x?.Object?.length ?? 0)} (${
        x?.Object?.length ?? 0
      } Objects)`
  }),

  col({
    label: 'Extends UUID',
    display: Input,
    value: (x) => ({
      value: x?.extends_uuid || undefined,
      name: 'extends_uuid'
    })
  })
];
