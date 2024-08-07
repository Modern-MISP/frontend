import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import type { PageLoad } from './$types';
import { error, type NumericRange } from '@sveltejs/kit';
import { api } from '$lib/api';
import { get } from 'svelte/store';
import Input from '$lib/components/input/Input.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import { compatibility } from '$lib/stores';

export const load: PageLoad = async ({ fetch }) => {
  const { data, error: mispError, response } = await get(api).GET('/users/view/me', { fetch });
  // eslint-disable-next-line no-warning-comments
  //TODO: types of status and message are not set, therefor .status an .message default to never
  if (mispError) error(response["status"] as NumericRange<400, 599>, mispError["message"]);

  const col = createTableHeadGenerator();

  const header = [
    !compatibility
      ? col({
          label: 'Name',
          value: () => ({
            display: Input,
            props: {
              value: data.User?.name,
              name: 'name'
            }
          })
        })
      : undefined,
    col({
      label: 'Role',
      value: () => ({
        display: Pill,
        props: {
          icon: 'mdi:circle',
          text: data.Role?.name
        }
      })
    }),
    col({
      label: 'Organisation',
      value: () => ({
        display: Pill,
        props: {
          icon: 'material-symbols:work-outline',
          text: data.Organisation?.name
        }
      })
    }),
    col({
      label: 'Created',
      value: () => ({
        display: DatePill,
        props: {
          date: new Date(Number(data.User?.date_created) * 1000)
        }
      })
    }),
    col({
      label: 'Last Login',
      value: () => ({
        display: DatePill,
        props: {
          date: new Date(Number(data.User?.date_created) * 1000)
        }
      })
    })
  ].filter((x) => typeof x !== 'undefined');

  const title = 'User Information';
  const description =
    'Detailed information about your user account. Only the name can be changed by you. For other changes, please contact your administrator.';

  return {
    header,
    data,
    title,
    description,
    userid: data.User?.id
  };
};
