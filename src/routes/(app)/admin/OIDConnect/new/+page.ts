import Input from '$lib/components/input/Input.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

export const load = async () => {
  // Static data
  const data = {
    id: '1',
    name: 'Google',
    path: 'https://accounts.google.com/.well-known/openid-configuration',
    token: 'eyJh••••••••••••••yZjI'
  };
  type Provider = {
    name?: string;
    path?: string;
    token?: string;
  };

  const col = createTableHeadGenerator<Provider>();

  const header = [
    col(
      {
        label: 'Name',
        value: (x) => ({
          display: HrefPill,
          props: {
            icon: 'mdi:watermark',
            text: x.name ?? 'unknown',
            href: x.name ? 'nameto:' + x.name : ''
          }
        })
      },
      {
        value: () => ({
          display: Input,
          props: {
            placeholder: 'Name',
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
            href: x.path ? 'nameto:' + x.token : ''
          }
        })
      },
      {
        value: () => ({
          display: Input,
          props: {
            placeholder: 'Path',
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
          display: HrefPill,
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

  return {
    tableData: data,
    header
  };
};
