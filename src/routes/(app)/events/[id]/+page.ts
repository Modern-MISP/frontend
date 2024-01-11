import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import AnalysisPill from '$lib/components/pills/analysisPill/AnalysisPill.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import DistributionPill from '$lib/components/pills/distributionPill/DistributionPill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import ThreatLevelPill from '$lib/components/pills/threatLevelPill/ThreatLevelPill.svelte';
import { createTableHeadGenerator } from '$lib/components/table/TableBuilder';
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
      display: ThreatLevelPill,
      value: (x) => ({
        threatLevel: +(x?.threat_level_id ?? 1) - 1
      })
    }),
    col({
      label: 'Analysis',
      display: AnalysisPill,
      value: (x) => ({
        analysis: +(x?.analysis ?? 1)
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
      display: DistributionPill,
      value: (x) => ({
        distribution: +(x?.distribution ?? 1)
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
