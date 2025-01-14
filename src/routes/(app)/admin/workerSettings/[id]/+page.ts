import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { page } from '$app/stores';
import type { PageLoad } from './$types';
import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { notifications } from '$lib/stores';
import { errorPill, successPill } from '$lib/util/pill.util';
import { invalidateAll } from '$app/navigation';
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

  const left = [].filter((x) => typeof x !== 'undefined');

  const right = [];

  const queueEditActions: DynCardActionHeader<typeof jobqueues>[] = [
    {
      label: 'Add Queues',
      icon: 'mdi:plus-circle',
      action: (x) => {
        if (confirm(`Are you sure you want to pause all Workers? No new jobs will be executed!`)) {
          Promise.all(
            x.map((x) =>
              get(api).POST('/worker/addQueue/{id}', {
                params: { path: { id: get(page).params.id } },
                body: { queue_name: x.name }
              })
            )
          ).then(() => {
            notifications.add(successPill('Queue added'));
            invalidateAll();
          });
        } else {
          notifications.add(errorPill('Failed to add Queue'));
        }
      }
    },
    {
      label: 'Remove Queues',
      icon: 'mdi:minus-circle',
      action: (x) => {
        if (confirm(`Are you sure you want to pause all Workers? No new jobs will be executed!`)) {
          get(api);
          Promise.all(
            x.map((x) =>
              get(api).POST('/worker/removeQueue/{id}', {
                params: { path: { id: get(page).params.id } },
                body: { queue_name: x.name }
              })
            )
          ).then(() => {
            notifications.add(successPill('Queue removed'));
            invalidateAll();
          });
        } else {
          notifications.add(errorPill('Failed to remove Queue'));
        }
      }
    },
    {
      label: 'Clear Queues',
      icon: 'mdi:delete',
      action: (x) => {
        if (confirm(`Are you sure? All jobs in the queues will be lost!`)) {
          Promise.all(x).then(() => {
            notifications.add(successPill('Not implemented'));
            invalidateAll();
          });
        } else {
          notifications.add(errorPill('Clear failed'));
        }
      }
    }
  ];

  return {
    jobs,
    jobs_header,
    returningJobs,
    returningJobs_header,
    jobqueues,
    jobqueues_header,
    queueEditActions
  };
};
