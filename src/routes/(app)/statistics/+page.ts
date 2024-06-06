import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // This is a mock data. Actual Data will be fetched from API.
  fetch;

  const data = [
    {
      Events: {
        estimated_count: '0(0)'
      },
      Attributes: {
        estimated_count: '0(0)'
      },
      Attributes_per_Event: {
        count: '0'
      },
      Correlations: {
        count: '0'
      },
      Proposals_active: {
        count: '0'
      },
      Users: {
        count: '1'
      },
      Organisations: {
        count: '1'
      },
      Local_Organisations: {
        count: '1'
      },
      Event_Creator_Orgs: {
        count: '0'
      },
      Average_Users_Orgs: {
        count: '1'
      },
      Discussion_threads: {
        estimated_count: '0(0)'
      },
      Discussion_posts: {
        estimated_count: '0(0)'
      }
    }
  ];

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'Events',
      value: () => data[0].Events.estimated_count
    }),
    col({
      label: 'Attributes',
      value: () => data[0].Attributes.estimated_count
    }),
    col({
      label: 'Attributes / event',
      value: () => data[0].Attributes_per_Event.count
    }),
    col({
      label: 'Correlations found',
      value: () => data[0].Correlations.count
    }),
    col({
      label: 'Proposals active',
      value: () => data[0].Proposals_active.count
    }),
    col({
      label: 'Users',
      value: () => data[0].Users.count
    }),
    col({
      label: 'Organisations',
      value: () => data[0].Organisations.count
    }),
    col({
      label: 'Local Organisations',
      value: () => data[0].Local_Organisations.count
    }),
    col({
      label: 'Event Creator Orgs',
      value: () => data[0].Event_Creator_Orgs.count
    }),
    col({
      label: 'Average Users / Orgs',
      value: () => data[0].Average_Users_Orgs.count
    }),
    col({
      label: 'Discussion threads',
      value: () => data[0].Discussion_threads.estimated_count
    }),
    col({
      label: 'Discussion posts',
      value: () => data[0].Discussion_posts.estimated_count
    })
  ];

  return {
    header,
    data
  };
};
