import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Select from '$lib/components/form/Select.svelte';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import type { PageLoad } from './$types';
import { themes } from '$lib/stores';
import { api } from '$lib/api';
import { get } from 'svelte/store';

export const load: PageLoad = async ({ fetch }) => {
  const {
    data,
    error: mispError
    //response
  } = await get(api).GET('/user_settings/me/visual_setting', { fetch });

  const data1 = [
    {
      UserSetting: {
        menu_open_default: true,
        theme: 0
      }
    }
  ];

  if (mispError) {
    data1[0].UserSetting.menu_open_default = true;
    data1[0].UserSetting.theme = 0;
  } else {
    data1[0].UserSetting.theme = data.UserSetting.value[0];
    data1[0].UserSetting.menu_open_default = data.UserSetting.value[1];
  }

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'Menu is open per default',
      value: () => ({
        display: Checkbox,
        props: {
          checked: data1[0].UserSetting.menu_open_default,
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
          value: themes[data1[0].UserSetting.theme].value
        }
      })
    })
  ];

  const title = 'Visual Settings';
  const description = 'Change your personal design settings here.';

  return {
    header,
    data: data1,
    title,
    description
  };
};
