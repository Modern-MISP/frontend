import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { PageLoad } from './$types';
import Input from '$lib/components/input/Input.svelte';

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
      label: 'Email',
      value: () => ({
        display: Input,
        props: {
          value: data[0].User.email,
          name: 'email'
        }
      })
    }),
    col({
      label: 'Password',
      value: () => ({
        display: Input,
        props: {
          placeholder: 'Enter New Password',
          name: 'password'
        }
      })
    })
  ];

  return {
    header,
    data
  };
};
