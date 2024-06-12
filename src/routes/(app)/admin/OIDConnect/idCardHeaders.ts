import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Input from '$lib/components/input/Input.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';

type Provider = {
  name?: string;
};

const col = createTableHeadGenerator<Provider>();

export default {
  name: col(
    {
      label: 'Name',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:lock-outline',
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
          icon: 'mdi:person-outline'
        }
      })
    }
  ),
  path: col(
    {
      label: 'Name',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:lock-outline',
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
          icon: 'mdi:person-outline'
        }
      })
    }
  ),
  token: col(
    {
      label: 'Name',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:lock-outline',
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
          icon: 'mdi:person-outline'
        }
      })
    }
  )
};
