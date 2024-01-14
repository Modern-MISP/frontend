import { GET } from '$lib/api';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { filter } from 'lodash-es';
import Info from '$lib/components/info/Info.svelte';
import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
import { THREAT_LEVEL_LOOKUP } from '$lib/consts/PillLookups';

export const load: PageLoad = async ({ params }) => {
  const { data, error: mispError, response } = await GET('/workflows/triggers'); // TODO: check for alternative endpoint/solution

  if (mispError) throw error(response.status, mispError.message);

  const trigger = filter(data, (x) => x.id === params.id).at(0) ?? {};

  const col = createTableHeadGenerator<typeof trigger>();

  const infoHeader = [
    col({
      icon: 'mdi:id-card',
      key: 'name',
      label: 'Name',
      value: (x) => ({ text: x.name ?? 'unknown' }),
      display: Info
    }),
    col({
      icon: 'mdi:telescope',
      key: 'scope',
      label: 'Scope',
      value: (x) => ({ icon: 'mdi:telescope', text: x.scope ?? 'unknown' }),
      display: Pill
    }),
    col({
      icon: 'mdi:head-alert',
      key: 'overhead',
      label: 'Overhead',
      value: (x) => ({ vlaue: x.trigger_overhead, options: THREAT_LEVEL_LOOKUP }),
      display: LookupPill
    }),
    col({
      icon: 'mdi:information',
      key: 'description',
      label: 'Description',
      value: (x) => ({ text: x.description ?? '' }),
      display: Info
    }),
    col({
      icon: 'material-symbols:network-node',
      key: 'workflow',
      label: 'Workflow',
      value: (x) => ({ icon: 'material-symbols:network-node', text: x.Workflow?.id ?? 'unknown' }),
      display: Pill
    }),
    col({
      icon: 'mdi:run',
      key: 'run-counter',
      label: 'Run Count',
      value: (x) => ({ label: '#', text: x.Workflow?.counter ?? 'unknown' }),
      display: Pill
    }),
    col({
      icon: 'mdi:checkbox-marked-outline',
      key: 'enabled',
      label: 'Enabled',
      value: (x) => ({ isTrue: !x.disabled }),
      display: Boolean
    }),
    col({
      icon: 'mdi:block-helper',
      key: 'blocking',
      label: 'Blocking',
      value: (x) => ({ isTrue: x.blocking }),
      display: Boolean
    }),
    col({
      icon: 'mdi:circle',
      key: 'misp-core-format',
      label: 'Core Format',
      value: (x) => ({ isTrue: x.misp_core_format }),
      display: Boolean
    }),
    col({
      icon: 'mdi:bug',
      key: 'debug-enabled',
      label: 'Debug',
      value: (x) => ({ isTrue: x.Workflow?.debug_enabled }),
      display: Boolean
    }),
    col({
      icon: 'mdi:update',
      key: 'last-updated',
      label: 'Last Updated',
      value: (x) => ({
        date: x.Workflow?.timestamp ? new Date(+x.Workflow.timestamp * 1000) : null
      }),
      display: DatePill
    })
  ];

  return {
    trigger,
    infoHeader
  };
};
