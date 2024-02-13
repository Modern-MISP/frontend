import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

import Boolean from '$lib/components/boolean/Boolean.svelte';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Info from '$lib/components/info/Info.svelte';
import Input from '$lib/components/input/Input.svelte';
import RelativeDatePill from '$lib/components/pills/datePill/RelativeDatePill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import { format } from 'date-fns';

export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/auth_keys/view/{authKeyId}', {
    params: { path: { authKeyId: params.id } },
    fetch
  });

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const col = createTableHeadGenerator<typeof data & { AuthKey?: { unique_ips?: string[] } }>();

  const left = [
    col({
      key: 'id',
      label: 'ID',
      value: (x) => x.AuthKey?.id ?? ''
    }),
    col({
      key: 'uuid',
      label: 'UUID',
      value: (x) => x.AuthKey?.uuid ?? ''
    }),
    col({
      key: 'key',
      label: 'Key',
      value: (x) => ({
        display: Info,
        props: {
          text: x.AuthKey?.authkey_start + '••••••••••••••' + x.AuthKey?.authkey_end
        }
      })
    }),
    col({
      key: 'user',
      label: 'User',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:account-outline',
          text: x.User?.email ?? undefined,
          href: `/admin/users/${x.User?.id}`
        }
      })
    }),
    col(
      {
        icon: 'mdi:information-outline',
        key: 'expiration',
        label: 'Expires',
        value: (x) => ({
          display: RelativeDatePill,
          props: {
            date:
              (x.AuthKey?.expiration &&
                +x.AuthKey.expiration !== 0 &&
                new Date(+x.AuthKey.expiration * 1000)) ||
              null
          }
        })
      },
      // FIXME: This should also alow for never expiring keys
      {
        value: (x) => ({
          display: Input,
          props: {
            value: x.AuthKey?.expiration
              ? format(new Date(+x.AuthKey?.expiration * 1000), 'yyyy-MM-dd')
              : undefined,
            name: 'date',
            type: 'Date'
          }
        })
      }
    ),
    col(
      {
        key: 'read_only',
        label: 'Read only',
        value: (x) => ({ display: Boolean, props: { isTrue: x.AuthKey?.read_only ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'read_only', checked: x.AuthKey?.read_only ?? false }
        })
      }
    ),
    col(
      {
        key: 'comment',
        label: 'Comment',
        value: (x) => ({
          display: Info,
          props: {
            text: x.AuthKey?.comment || 'No Comment',
            class: 'line-clamp-3'
          }
        })
      },
      {
        value: (x) => ({
          display: Input,
          props: { value: x.AuthKey?.comment ?? 'unknown', name: 'comment' }
        })
      }
    )
  ];

  return {
    key: data,
    left
  };
};
