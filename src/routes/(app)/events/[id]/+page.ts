import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import { createTableHeadGenerator } from '$lib/components/table/TableBuilder';
import { ANALYSIS_LOOKUP, DISTRIBUTION_LOOKUP, THREAT_LEVEL_LOOKUP } from '$lib/consts/PillLookups';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const {
    data,
    error: mispError,
    response
  } = await GET('/events/view/{eventId}', { params: { path: { eventId: params.id } } });

  if (mispError) throw error(response.status, mispError.message);

  const col = createTableHeadGenerator<(typeof data)['Event']>();

  const infoHeader = [
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

  return {
    event: data.Event,
    infoHeader
  };
};
