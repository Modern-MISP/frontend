import type { PageLoad } from './$types';

import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
import type { DynCardActionHeader } from '$lib/models/DynCardActionHeader.interface';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';

export const load: PageLoad = async () => {
  const data = [
    {
      Organisation: {
        id: '1',
        name: 'Org 1',
        users: '3',
        attributes: '2',
        events: '5',
        date_created: 1612137600,
        date_modified: 1612137600,
        description: 'This is a sample organization for demonstration purposes.',
        type: 'Non-profit',
        nationality: 'German',
        sector: 'Education',
        created_by: 'Admin User',
        uuid: '550e8400-e29b-41d4-a716-446655440000',
        contacts: 'contact@org1.example.com',
        local: false,
        restricted_to_domain: 'example.com',
        landingpage: 'https://www.org1.example.com'
      }
    }
  ];

  //if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
  const tableData = data.map((x) => x.Organisation as (typeof x)['Organisation']);

  const col = createTableHeadGenerator<(typeof tableData)[number], DynTableHeadExtent>();

  const header = [
    col({
      icon: 'mdi:person-outline',
      key: 'nids_sid',
      label: 'Name',
      value: (x) => ({ display: Pill, props: { icon: 'mdi:person-outline', text: x.name } })
    }),

    col({
      icon: 'mdi:pound',
      key: 'users',
      label: 'Users',
      value: (x) => ({ display: Pill, props: { icon: 'mdi:pound', text: x.users } })
    }),
    col({
      icon: 'mdi:pound',
      key: 'events',
      label: 'Events',
      value: (x) => ({ display: Pill, props: { icon: 'mdi:pound', text: x.events } })
    }),

    col({
      icon: 'mdi:pound',
      key: 'attributes',
      label: 'Attributes',
      value: (x) => ({ display: Pill, props: { icon: 'mdi:pound', text: x.attributes } })
    }),
    col({
      icon: 'mdi:alert-circle-outline',
      key: 'type',
      label: 'Type',
      value: (x) => ({ display: Pill, props: { icon: 'mdi:alert-circle-outline', text: x.type } })
    }),
    col({
      icon: 'mdi:update',
      key: 'activity',
      label: 'Activity',
      value: (x) => ({
        display: DatePill,
        props: {
          date: x.date_modified ? new Date(+x.date_modified * 1000) : null
        }
      })
    })
  ];

  const editActions: DynCardActionHeader<typeof tableData>[] = [
    {
      label: 'Export',
      icon: 'mdi:download',
      action(x) {
        console.log(x);
      }
    }
  ];

  return {
    tableData,
    header,
    editActions
  };
};
