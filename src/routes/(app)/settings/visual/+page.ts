import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Select from '$lib/components/form/Select.svelte';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import type { PageLoad } from './$types';
import { themes } from '$lib/stores.svelte.ts';
import { api } from '$lib/api';
import { get } from 'svelte/store';
import { settings } from '$lib/stores.svelte.ts';

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
        theme: ''
      }
    }
  ];

  if (!mispError) {
    data1[0].UserSetting.theme = themes[data.UserSetting.value[0]].value;
    data1[0].UserSetting.menu_open_default = data.UserSetting.value[1];
  } else {
    data1[0].UserSetting.theme = get(settings).theme;
    data1[0].UserSetting.menu_open_default = get(settings).openOnInit;
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
          value: data1[0].UserSetting.theme
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
