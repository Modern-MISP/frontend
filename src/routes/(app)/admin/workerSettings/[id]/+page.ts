import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Info from '$lib/components/info/Info.svelte';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data: jobqueues,
    error: mispErrorJobqueues,
    response: responseJobqueues
  } = await get(api).GET('/worker/jobqueue/{id}', {
    params: { path: { id: params.id } },
    fetch
  });
  const {
    data: jobs,
    error: mispErrorJobs,
    response: responseJobs
  } = await get(api).GET('/worker/jobs/{id}', {
    params: { path: { id: params.id } },
    fetch
  });
  const {
    data: returningJobs,
    error: mispErrorReturningJobs,
    response: responseReturningJobs
  } = await get(api).GET('/worker/returningJobs/{id}', {
    params: { path: { id: params.id } },
    fetch
  });
  // eslint-disable-next-line no-warning-comments
  //TODO: type message not set, therefor .message default to never
  if (mispErrorJobqueues)
    error(responseJobqueues.status as NumericRange<400, 599>, mispErrorJobqueues['message']);
  if (mispErrorJobs) error(responseJobs.status as NumericRange<400, 599>, mispErrorJobs['message']);
  if (mispErrorReturningJobs)
    error(
      responseReturningJobs.status as NumericRange<400, 599>,
      mispErrorReturningJobs['message']
    );

  const job_col = createTableHeadGenerator<(typeof jobs)[number], DynTableHeadExtent>();
  const ret_job_col = createTableHeadGenerator<
    (typeof returningJobs)[number],
    DynTableHeadExtent
  >();
  const job_queues_col = createTableHeadGenerator<(typeof jobqueues)[number], DynTableHeadExtent>();

  const jobs_header = [
    job_col({
      icon: 'mdi:id-card',
      key: 'name',
      label: 'Job Name',
      value: (x) => ({ display: Info, props: { text: x?.name ?? 'unknown' } })
    }),
    job_col({
      icon: 'mdi:id-card',
      key: 'placeInQueue',
      label: 'Queue Position',
      value: (x) => ({ display: Info, props: { text: String(x?.placeInQueue) ?? 'unknown' } })
    }),
    job_col({
      icon: 'mdi:queue-first-in-last-out',
      key: 'queueName',
      label: 'Queue Name',
      value: (x) => ({ display: Info, props: { text: x?.queueName ?? 'unknown' } })
    })
  ];

  const returningJobs_header = [
    ret_job_col({
      icon: 'mdi:id-card',
      key: 'name',
      label: 'Job Name',
      value: (x) => ({ display: Info, props: { text: x?.name ?? 'unknown' } })
    }),
    ret_job_col({
      icon: 'mdi:id-card',
      key: 'info',
      label: 'Info',
      value: (x) => ({ display: Info, props: { text: String(x?.info) ?? 'unknown' } })
    }),
    ret_job_col({
      icon: 'mdi:queue-first-in-last-out',
      key: 'nextExecution',
      label: 'Next Execution',
      value: (x) => ({ display: Info, props: { text: x?.nextExecution ?? 'unknown' } })
    })
  ];

  const jobqueues_header = [
    job_queues_col({
      icon: 'mdi:id-card',
      key: 'name',
      label: 'Jobqueue Name',
      value: (x) => ({ display: Info, props: { text: x?.name ?? 'unknown' } })
    }),
    job_queues_col({
      icon: 'mdi:id-card',
      key: 'activ',
      label: 'Queue activ',
      value: (x) => ({ display: Info, props: { text: String(x?.activ) ?? 'unknown' } })
    })
  ];

  return {
    jobs,
    jobs_header,
    returningJobs,
    returningJobs_header,
    jobqueues,
    jobqueues_header
  };
};
