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
    value: (x) => ({
      display: LookupPill,
      props: {
        value: +(x?.threat_level_id ?? 1) - 1,
        options: THREAT_LEVEL_LOOKUP
      }
    })
  }),
  col({
    label: 'Analysis',
    value: (x) => ({
      display: LookupPill,
      props: {
        value: +(x?.analysis ?? 1),
        options: ANALYSIS_LOOKUP
      }
    })
  }),
  col({
    label: 'Published',
    value: (x) => ({
      display: Boolean,
      props: {
        isTrue: x?.published ?? false
      }
    })
  }),
  col({
    label: 'Date',
    value: (x) => ({
      display: DatePill,
      props: {
        date: x?.date ? new Date(x.date) : null
      }
    })
  }),
  col({
    label: 'Creator user',
    value: (x) => ({
      display: HrefPill,
      props: {
        href: 'mailto:' + x?.event_creator_email,
        text: x?.event_creator_email,
        icon: 'mdi:account-outline'
      }
    })
  }),
  col({
    label: 'Creator Org',
    value: (x) => ({
      display: Pill,
      props: {
        text: x?.Orgc?.name,
        icon: 'material-symbols:work-outline'
      }
    })
  }),
  col({
    label: 'Owner Org',
    value: (x) => ({
      display: Pill,
      props: {
        text: x?.Org?.name,
        icon: 'material-symbols:work-outline'
      }
    })
  }),
  col({ label: 'ID', value: (x) => x?.id ?? 'unknown' }),
  col({ label: 'UUID', value: (x) => x?.uuid ?? 'unknown' }),
  col({
    label: 'Distribution',
    value: (x) => ({
      display: LookupPill,
      props: {
        value: +(x?.distribution ?? 1),
        options: DISTRIBUTION_LOOKUP
      }
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
    value: (x) => ({
      display: Input,
      props: {
        value: x?.info ?? '',
        name: 'info'
      }
    })
  }),
  col({
    label: 'Threat Level',
    value: (x) => ({
      display: Select,
      props: {
        value: '' + (+(x?.threat_level_id ?? 1) - 1),
        options: THREAT_LEVEL_LOOKUP.map((x, i) => ({ label: x.text ?? 'unknown', value: '' + i })),
        name: 'threat_level_id'
      }
    })
  }),
  col({
    label: 'Analysis',
    value: (x) => ({
      display: Select,
      props: {
        value: '' + (x?.analysis ?? 1),
        options: ANALYSIS_LOOKUP.map((x, i) => ({ label: x.text ?? 'unknown', value: '' + i })),
        name: 'analysis'
      }
    })
  }),
  col({
    label: 'Published',
    value: (x) => ({
      display: Checkbox,
      props: {
        checked: x?.published ?? false,
        name: 'published'
      }
    })
  }),
  col({
    label: 'Date',
    display: Input,
    value: (x) => ({
      display: Input,
      props: {
        value: x?.date ? format(new Date(x.date), 'yyyy-MM-dd') : undefined,
        name: 'date',
        type: 'date'
      }
    })
  }),
  col({
    label: 'Creator user',
    value: (x) => ({
      display: HrefPill,
      props: {
        href: 'mailto:' + x?.event_creator_email,
        text: x?.event_creator_email,
        icon: 'mdi:account-outline'
      }
    })
  }),
  col({
    label: 'Creator Org',
    value: (x) => ({
      display: Pill,
      props: {
        text: x?.Orgc?.name,
        icon: 'material-symbols:work-outline'
      }
    })
  }),
  col({
    label: 'Owner Org',
    value: (x) => ({
      display: Pill,
      props: {
        text: x?.Org?.name,
        icon: 'material-symbols:work-outline'
      }
    })
  }),
  col({ label: 'ID', value: (x) => x?.id ?? 'unknown' }),
  col({ label: 'UUID', value: (x) => x?.uuid ?? 'unknown' }),
  col({
    label: 'Distribution',
    value: (x) => ({
      display: Select,
      props: {
        value: '' + (x?.distribution ?? 1),
        options: DISTRIBUTION_LOOKUP.map((x, i) => ({ label: x.text ?? 'unknown', value: '' + i })),
        name: 'distribution'
      }
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
    value: (x) => ({
      display: Input,
      props: {
        value: x?.extends_uuid || undefined,
        name: 'extends_uuid'
      }
    })
  })
];
