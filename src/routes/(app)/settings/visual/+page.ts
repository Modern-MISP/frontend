import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Select from '$lib/components/form/Select.svelte';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import type { PageLoad } from './$types';
import { themes } from '$lib/stores';

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
      label: 'Menu is open per default',
      value: () => ({
        display: Checkbox,
        props: {
          checked: data[0].UserSetting.menu_open_default,
          name: 'is_menu_open'
        }
      })
    }),
    col({
      label: 'Theme',
      value: () => ({
        display: Select,
        props: {
          options: themes.map((theme) => ({
            value: theme.value,
            label: theme.label
          })),
          name: 'theme',
          value: themes[data[0].UserSetting.theme].value
        }
      })
    })
  ];

  return {
    header,
    data
  };
};
