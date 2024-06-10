import { api } from '$lib/api';
import { get } from 'svelte/store';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { shouldTextBeBlack } from '$lib/util/color.util';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import Input from '$lib/components/input/Input.svelte';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/tags/view/{tagId}', { params: { path: { tagId: params.id } }, fetch });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<typeof data>();

  const header = [
    col({
      key: 'id',
      label: 'ID',
      value: (x) => x.id ?? 'unknown'
    }),
    col(
      {
        key: 'name',
        label: 'Name',
        value: (x) => ({
          display: Pill,
          props: {
            icon: 'mdi:watermark',
            text: 'unknown',
            style: `background-color: ${x.colour}; color: ${
              shouldTextBeBlack(x.colour ?? '') ? 'black' : 'white'
            }`
          }
        })
      },
      {
        value: () => ({
          display: Input,
          props: { name: 'name', value: 'unknown' }
        })
      }
    )
  ];

  const title = 'Provider details';
  const description = '';

  return {
    user: data,
    header,
    title,
    description
  };
};
