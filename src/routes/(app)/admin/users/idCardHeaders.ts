import type { components, paths } from '$lib/api/misp';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Input from '$lib/components/input/Input.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
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
  email: col(
    {
      label: 'Email',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:email-outline',
          text: x.User?.email ?? 'unknown',
          href: x.User?.email ? 'mailto:' + x.User?.email : ''
        }
      })
    },
    {
      value: (x) => ({
        display: Input,
        props: { value: x.User?.email ?? '', name: 'email' }
      })
    }
  ),
  id: col({
    label: 'ID',
    value: (x) => x.User?.id ?? 'unknown'
  }),
  role: col(
    {
      label: 'Role',
      value: (x) => x.Role?.name ?? 'unknown'
    },
    {
      // TODO: Role selection (or role system in general)
      value: () => ({
        display: Input,
        props: {
          disabled: true,
          placeholder: 'Not supported'
        }
      })
    }
  ),
  nids_sid: col(
    {
      label: 'NIDS SID',
      value: (x) => x.User?.nids_sid ?? 'unknown'
    },
    {
      value: (x) => ({
        display: Input,
        props: { value: x.User?.nids_sid ?? '', name: 'nids_sid' }
      })
    }
  ),
  last_pw_change: col({
    icon: 'mdi:clock-outline',
    label: 'Last password change',
    // class: 'whitespace-nowrap',
    value: (x) => ({
      display: DatePill,
      props: { date: x.User?.last_pw_change ? new Date(+x.User?.last_pw_change * 1000) : null }
    })
  }),
  last_login: col({
    icon: 'mdi:clock-outline',
    label: 'Last login',
    value: (x) => ({
      display: DatePill,
      props: { date: x.User?.last_login ? new Date(+x.User?.last_login * 1000) : null }
    })
  }),
  created: col({
    icon: 'mdi:clock-outline',
    label: 'Created',
    value: (x) => ({
      display: DatePill,
      props: { date: x.User?.date_created ? new Date(+x.User?.date_created * 1000) : null }
    })
  }),
  disabled: col(
    {
      label: 'Is disabled',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.disabled } })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'disabled', checked: x.User?.disabled ?? false }
      })
    }
  ),
  authkey: col(
    {
      label: 'TOTP set',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.authkey ?? false } })
    },
    {
      value: () => ({
        display: Input,
        props: { name: 'authkey', placeholder: 'set new auth key' }
      })
    }
  ),
  contactaltert: col(
    {
      key: 'contactalert',
      label: 'Contact enables',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.contactalert ?? false } })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'contactalert', checked: x.User?.contactalert ?? false }
      })
    }
  ),
  termsaccepted: col(
    {
      key: 'termsaccepted',
      label: 'Terms accepted',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.termsaccepted ?? false } })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'termsaccepted', checked: x.User?.termsaccepted ?? false }
      })
    }
  ),
  gpgkey: col(
    {
      key: 'gpgkey',
      label: 'PGP key',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.gpgkey ?? false } })
    },

    {
      value: () => ({
        display: Input,
        props: { name: 'pgpKey', placeholder: 'set new PGP key' }
      })
    }
  ),
  change_pw: col({
    key: 'change_pw',
    label: 'Must change password',
    value: (x) => ({ display: Boolean, props: { isTrue: x.User?.change_pw === '1' } })
  }),
  notification_daily: col(
    {
      key: 'notification_daily',
      label: 'Daily notifications',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.notification_daily ?? false } })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'notification_daily', checked: x.User?.notification_daily ?? false }
      })
    }
  ),
  notification_weekly: col(
    {
      key: 'notification_weekly',
      label: 'Weekly notifications',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.User?.notification_weekly ?? false }
      })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'notification_weekly', checked: x.User?.notification_weekly ?? false }
      })
    }
  ),
  notification_monthly: col(
    {
      key: 'notification_monthly',
      label: 'Monthly notifications',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.User?.notification_monthly ?? false }
      })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'notification_monthly', checked: x.User?.notification_monthly ?? false }
      })
    }
  ),
  organisation: col({
    key: 'org',
    label: 'Organizations',
    value: (x) => ({
      display: Pill,
      props: {
        text: x?.Organisation?.name,
        icon: 'material-symbols:work-outline'
      }
    })
  })
};
