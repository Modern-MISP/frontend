import type { PageLoad } from './$types';

import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Input from '$lib/components/input/Input.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';

export const load: PageLoad = async ({ params, fetch }) => {
  params;
  fetch;

  // Mock data
  const data = {
    id: '1',
    name: 'Google',
    path: 'https://accounts.google.com/.well-known/openid-configuration',
    token: 'eyJh••••••••••••••yZjI'
  };

  const col = createTableHeadGenerator<typeof data>();

  const header = [
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
            text: x.path ?? 'unknown',
            href: x.path ?? ''
          }
        })
      },
      {
        value: (x) => ({
          display: Input,
          props: {
            placeholder: 'Path',
            value: x.path ?? '',
            name: 'path',
            icon: 'mdi:link-variant'
          }
        })
      }
    ),
    col(
      {
        label: 'Token',
        value: (x) => ({
          display: Pill,
          props: {
            icon: 'mdi:key-outline',
            text: x.token ?? 'unknown',
            href: x.token ? 'nameto:' + x.token : ''
          }
        })
      },
      {
        value: () => ({
          display: Input,
          props: {
            placeholder: 'Token',
            name: 'token',
            icon: 'mdi:key-outline'
          }
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
