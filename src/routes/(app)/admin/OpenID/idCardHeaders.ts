import type { components, paths } from '$lib/api/misp';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Input from '$lib/components/input/Input.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Select from '$lib/components/form/Select.svelte';

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
      value: (x) => ({
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
