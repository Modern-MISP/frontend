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

  // eslint-disable-next-line no-warning-comments
  //TODO: type message not set, therefor .message default to never
  if (mispErrorJobqueues)
    error(responseJobqueues.status as NumericRange<400, 599>, mispErrorJobqueues['message']);
  if (mispErrorJobs) error(responseJobs.status as NumericRange<400, 599>, mispErrorJobs['message']);

  const left = [].filter((x) => typeof x !== 'undefined');

  const right = [];

  const queueEditActions: DynCardActionHeader<typeof jobqueues>[] = [
    {
      label: 'Add Queues',
      icon: 'mdi:plus-circle',
      action: (x) => {
        if (confirm(`Are you sure you want to add the selected queues?`)) {
          Promise.all(
            x.map((x) =>
              get(api).POST('/worker/addQueue/{id}', {
                params: { path: { id: get(page).params.id } },
                body: { queue_name: x.name }
              })
            )
          ).then(() => {
            for (const response of x) {
              const name = response.response.headers.get('x-queue-name-header');
              if (response.response.status == 200) {
                notifications.add(successPill(`Added queue: ${name}`));
              } else {
                notifications.add(errorPill(`Failed to add queue: ${name} with error:`));
              }
            }
            invalidateAll();
          });
        } else {
          notifications.add(errorPill('Interrupted to add Queue'));
        }
      }
    },
    {
      label: 'Remove Queues',
      icon: 'mdi:minus-circle',
      action: (x) => {
        if (confirm(`Are you sure you want to remove the selected queues?`)) {
          Promise.all(
            x.map((x) =>
              get(api).POST('/worker/removeQueue/{id}', {
                params: { path: { id: get(page).params.id } },
                body: { queue_name: x.name }
              })
            )
          ).then(() => {
            for (const response of x) {
              const name = response.response.headers.get('x-queue-name-header');
              if (response.response.status == 200) {
                notifications.add(successPill(`Removed queue: ${name}`));
              } else {
                notifications.add(errorPill(`Failed to removed queue ${name} with error:`));
              }
            }
            invalidateAll();
          });
        } else {
          notifications.add(errorPill('Interrupted to remove Queue'));
        }
      }
    },
    {
      label: 'Clear Queues',
      icon: 'mdi:delete',
      action: (x) => {
        if (confirm(`Are you sure? All jobs in the queues will be lost!`)) {
          Promise.all(x).then(() => {
            notifications.add(errorPill('Not implemented'));
            invalidateAll();
          });
        } else {
          notifications.add(errorPill('Clear interrupted'));
        }
      }
    }
  ];

  return {
    jobs,
    jobs_header,
    jobqueues,
    jobqueues_header,
    queueEditActions
  };
};
