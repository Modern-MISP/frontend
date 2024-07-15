import { api } from '$lib/api';
import { error, type NumericRange } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import Input from '$lib/components/input/Input.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';


export const load: PageLoad = async ({ params, fetch }) => {
  const {
    data,
    error: mispError,
    response
  } = await get(api).GET('/auth/openID/getOpenIDConnectProvider/{providerId}', {
    params: { path: { providerId: params.id } },
    fetch
  });
  const col = createTableHeadGenerator<typeof data>();

  if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);

  const left = [
    col(
      {
        label: 'Name',
        value: (x) => ({
          display: Pill,
          props: {
            icon: 'mdi:watermark',
            text: x.name ?? 'unknown'
          }
        })
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            placeholder: 'Name',
            value: x.name ?? '',
            name: 'name',
            icon: 'mdi:watermark'
          }
        })
      }
    ),
    col(
      {
        label: 'Path',
        value: (x) => ({
          display: HrefPill,
          props: {
            icon: 'mdi:link-variant',
            text: x.base_url ?? 'unknown',
            href: x.base_url ?? ''
          }
        })
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            placeholder: 'Path',
            value: x.base_url ?? '',
            name: 'base_url',
            icon: 'mdi:link-variant'
          }
        })
      }
    ),
    col(
      {
        label: 'Token',
        value: (x) => ({
          display: HrefPill,
          props: {
            icon: 'mdi:key-outline',
            text: x.client_secret ?? 'unknown',
            href: x.client_secret ?? ''
          }
        })
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            placeholder: 'Token',
            value: x.client_secret ?? '',
            name: 'client_secret',
            icon: 'mdi:key-outline'
          }
        })
      }
    ),
    col(
      {
        key: 'active',
        label: 'Active',
        value: (x) => ({ display: Boolean, props: { isTrue: x.active ?? false } })
      },
      {
        value: (x) => ({
          display: Checkbox,
          props: { name: 'active', checked: x.active ?? false }
        })
      }
    ),
    col(
      {
        label: 'Organization',
        value: (x) => ({
          display: HrefPill,
          props: {
            icon: 'mdi:account-group',
            text: x.org_id ?? 'unknown',
            href: x.org_id ?? ''
          }
        })
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            placeholder: 'Organization',
            value: x.org_id ?? '',
            name: 'org_id',
            icon: 'mdi:account-group'
          }
        })
      }
    ),
    col(
      {
        label: 'Client ID',
        value: (x) => ({
          display: Pill,
          props: {
            icon: 'mdi:clipboard-account-outline',
            text: x.client_id ?? 'unknown'
          }
        })
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            placeholder: 'Client ID',
            value: x.client_id ?? '',
            name: 'client_id',
            icon: 'mdi:clipboard-account-outline'
          }
        })
      }
    )
    
    
  ];


  return {
    provider: data,
    left
  };
};
