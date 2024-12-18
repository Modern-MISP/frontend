import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

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

  return {
    user: { jobs, returningJobs, jobqueues },
    left,
    right
  };
};
