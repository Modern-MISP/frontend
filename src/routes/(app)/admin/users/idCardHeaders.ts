import type { components } from '$lib/api/misp';
import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
import Boolean from '$lib/components/boolean/Boolean.svelte';
import Input from '$lib/components/input/Input.svelte';
import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
import Pill from '$lib/components/pills/pill/Pill.svelte';
import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
import Select from '$lib/components/form/Select.svelte';
import Button from '$lib/components/button/Button.svelte';

const col = createTableHeadGenerator<
  {
    User: components['schemas']['GetUsersElement'] & {User?: {password: string}},
    Roles: components['schemas']['PartialRoleUsersResponse'][],
    Organisations: components['schemas']['Organisation'][],
  }
>();

//const { data: roleData }: { data: any[] } = await get(api).GET('/roles');
//const { data: orgData }: {data: any[] } = await get(api).GET('/organisations');

export default {
  name: col(
    {
      label: 'Name',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:lock-outline',
          text: x.User?.User?.name ?? 'unknown',
          href: x.User?.User?.name ? 'nameto:' + x.User?.User?.name : ''
        }
      })
    },
    {
      value: (x) => ({
        display: Input,
        props: {
          placeholder: 'Name',
          value: x.User?.User?.name ?? '',
          name: 'name',
          icon: 'mdi:person-outline'
        }
      })
    }
  ),
  key: col(
    {
      label: 'Key',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:lock-outline',
          text: x.User?.User?.auth_key ?? 'unknown',
          href: x.User?.User?.auth_key ? 'keyto:' + x.User?.User?.auth_key : ''
        }
      })
    },
    {
      value: () => ({
        display: Input,
        props: {
          placeholder: 'Key',
          name: 'key',
          icon: 'mdi:key-outline'
        }
      })
    }
  ),
  email: col(
    {
      label: 'Email',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:email-outline',
          text: x.User?.User?.email ?? 'unknown',
          href: x.User?.User?.email ? 'mailto:' + x.User?.User?.email : ''
        }
      })
    },
    {
      value: (x) => ({
        display: Input,
        props: {
          value: x.User?.User?.email ?? '',
          name: 'email',
          placeholder: 'E-mail',
          icon: 'mdi:person-outline'
        }
      })
    }
  ),
  password: col(
    {
      label: 'Password',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:lock-outline',
          text: x.User?.User?.password ?? 'unknown',
          href: x.User?.User?.password ? 'passwordto:' + x.User?.User?.password : ''
        }
      })
    },
    {
      value: (x) => ({
        display: Input,
        props: {
          value: x.User?.User?.password ?? Math.random().toString(36).slice(-12),
          placeholder: 'Password',
          name: 'password',
          icon: 'mdi:key-outline'
        }
      })
    }
  ),
  generate: col({
    label: 'Copy password',
    value: () => ({
      display: Button,
      props: {
        name: 'copy password',
        class: 'w-min',
        prefixIcon: 'mdi:content-copy',
      }
    })
  }),

  id: col({
    label: 'ID',
    value: (x) => ({
      display: HrefPill,
      props: {
        icon: 'mdi:lock-outline',
        text: String(x.User?.User?.id) ?? 'unknown',
        href: x.User?.User?.id ? 'idto:' + x.User?.User?.id : ''
      }
    })
  }),
  role: col(
    {
      label: 'Role',
      value: (x) => x.User?.Role?.name ?? 'unknown'
    },
    {
      value: (x) => ({
        display: Select,
        props: {
          options: x.Roles?.map((r) => ({ label: r.name!, value: r.id! })),
          value: x.User?.Role?.id,
          name: 'role'
        }
      })
    }
  ),
  nids_sid: col(
    {
      label: 'NIDS SID',
      value: (x) => ({
        display: HrefPill,
        props: {
          icon: 'mdi:lock-outline',
          text: String(x.User?.User?.nids_sid) ?? 'unknown',
          href: x.User?.User?.nids_sid ? 'idto:' + x.User?.User?.nids_sid : ''
        }
      })
    },
    {
      value: (x) => ({
        display: Input,
        props: { value: String(x.User?.User?.nids_sid) ?? '', name: 'nids_sid' }
      })
    }
  ),
  last_pw_change: col({
    icon: 'mdi:clock-outline',
    label: 'Last password change',
    // class: 'whitespace-nowrap',
    value: (x) => ({
      display: DatePill,
      props: { date: x.User?.User?.last_pw_change ? new Date(+x.User?.User?.last_pw_change * 1000) : null }
    })
  }),
  last_login: col({
    icon: 'mdi:clock-outline',
    label: 'Last login',
    value: (x) => ({
      display: DatePill,
      props: {
        date:
          x.User?.User?.last_login && x.User?.User.last_login !== 0
            ? new Date(+x.User?.User?.last_login * 1000)
            : null,
        onNullText: 'Never logged in'
      }
    })
  }),
  created: col({
    icon: 'mdi:clock-outline',
    label: 'Created',
    value: (x) => ({
      display: DatePill,
      props: { date: x.User?.User?.date_created ? new Date(+x.User?.User?.date_created * 1000) : null }
    })
  }),
  disabled: col(
    {
      label: 'Is disabled',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.User?.disabled } })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'disabled', checked: x.User?.User?.disabled ?? false }
      })
    }
  ),
  authkey: col(
    {
      label: 'Auth key',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.User?.auth_key ?? false } })
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
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.User?.contactalert ?? false } })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'contactalert', checked: x.User?.User?.contactalert ?? false }
      })
    }
  ),
  termsaccepted: col(
    {
      key: 'termsaccepted',
      label: 'Terms accepted',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.User?.termsaccepted ?? false } })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'termsaccepted', checked: x.User?.User?.termsaccepted ?? false }
      })
    }
  ),
  gpgkey: col(
    {
      key: 'gpgkey',
      label: 'GPG key',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.User?.gpg_key ?? false } })
    },

    {
      value: () => ({
        display: Input,
        props: { name: 'pgpKey', placeholder: 'set new GPG key' }
      })
    }
  ),
  change_pw: col({
    key: 'change_pw',
    label: 'Must change password',
    value: (x) => ({ display: Boolean, props: { isTrue: x.User?.User?.change_pw === true } })
  }),
  notification_daily: col(
    {
      key: 'notification_daily',
      label: 'Daily notifications',
      value: (x) => ({ display: Boolean, props: { isTrue: x.User?.User?.notification_daily ?? false } })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'notification_daily', checked: x.User?.User?.notification_daily ?? false }
      })
    }
  ),
  notification_weekly: col(
    {
      key: 'notification_weekly',
      label: 'Weekly notifications',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.User?.User?.notification_weekly ?? false }
      })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'notification_weekly', checked: x.User?.User?.notification_weekly ?? false }
      })
    }
  ),
  notification_monthly: col(
    {
      key: 'notification_monthly',
      label: 'Monthly notifications',
      value: (x) => ({
        display: Boolean,
        props: { isTrue: x.User?.User?.notification_monthly ?? false }
      })
    },
    {
      value: (x) => ({
        display: Checkbox,
        props: { name: 'notification_monthly', checked: x.User?.User?.notification_monthly ?? false }
      })
    }
  ),
  organisation: col(
    {
      key: 'org',
      label: 'Organisations',
      value: (x) => ({
        display: Pill,
        props: {
          text: x.Organisations?.find((o) => Number(o.id) === x.User?.User?.org_id)?.name ?? 'unknown',
          icon: 'material-symbols:work-outline'
        }
      })
    },
    {
      value: (x) => ({
        display: Select,
        props: {
          options: x.Organisations?.map((o) => ({ label: o.name!, value: o.id!})),
          value: x.Organisations[0].id,
          name: 'org'
        }
      })
    }
  )
};
