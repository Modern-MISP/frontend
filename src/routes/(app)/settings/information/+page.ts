import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { PageLoad } from './$types';
import Input from '$lib/components/input/Input.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';

export const load: PageLoad = async ({ fetch }) => {
  // This is a mock data. Actual Data will be fetched from API.
  fetch;

  const data = [
    {
      User: {
        email: 'admin@admin.test',
        date_created: '2023-09-01',
        last_login: '2024-05-03'
      },
      Role: {
        name: 'admin'
      },
      Organisation: {
        name: 'Musterorganisation'
      },
      UserSetting: {
        name: 'Max Mustermann',
        menu_open_default: true,
        theme: 0
      }
    }
  ];

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'Name',
      value: () => ({
        display: Input,
        props: {
          value: data[0].UserSetting.name
        }
      })
    }),
    col({
      label: 'Role',
      value: () => ({
        display: Pill,
        props: {
          icon: 'mdi:circle',
          text: data[0].Role.name
        }
      })
    }),
    col({
      label: 'Organisation',
      value: () => ({
        display: Pill,
        props: {
          icon: 'material-symbols:work-outline',
          text: data[0].Organisation.name
        }
      })
    }),
    col({
      label: 'Created',
      value: () => ({
        display: DatePill,
        props: {
          date: data[0].User.date_created ? new Date(data[0].User.date_created) : new Date()
        }
      })
    }),
    col({
      label: 'Last Login',
      value: () => ({
        display: DatePill,
        props: {
          date: data[0].User.last_login ? new Date(data[0].User.last_login) : new Date()
        }
      })
    })
  ];

  const title = 'User Information';
  const description =
    'Detailed information about your user account. Only the name can be changed by you. For other changes, please contact your administrator.';

  return {
    header,
    data,
    title,
    description
  };
};
