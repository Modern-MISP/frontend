import type { components, paths } from '$lib/api/misp';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Input from '$lib/components/input/Input.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';

const col = createTableHeadGenerator<
  paths['/admin/users/view/{userId}']['get']['responses']['200']['content']['application/json'] & {
    User?: {
      notification_daily?: boolean;
      notification_weekly?: boolean;
      notification_monthly?: boolean;
      last_pw_change?: number;
    };
    Organisation?: components['schemas']['Organisation'];
  }
>();

export default {
  name: col(
    {
      label: 'Name',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:lock-outline',
          text: x.User?.name ?? 'unknown',
          href: x.User?.name ? 'nameto:' + x.User?.name : ''
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
