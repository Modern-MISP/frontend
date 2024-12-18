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

const col = createTableHeadGenerator<{
  User: components['schemas']['GetUsersElement'] & {
    User?: { password: string; nids_sid: string };
  };
  Roles: components['schemas']['PartialRoleUsersResponse'][];
  Organisations: components['schemas']['Organisation'][];
}>();


export default {
  
  
};
