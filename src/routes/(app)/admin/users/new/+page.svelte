<script lang="ts">
  import { goto } from '$app/navigation';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { notifySave } from '$lib/util/notifications.util';
  import { get } from 'svelte/store';
  import idCardHeaders, { type CustomUserType } from '../idCardHeaders';
  import { mode } from '$lib/stores';
  import { lockEditMode } from '$lib/actions';
  import { derived } from 'svelte/store';

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    notifySave(
      get(api)
        .POST('/admin/users/add', {
          body: formData
        })
        .then((resp) => {
          if (resp.error) {
            // @ts-expect-error MISP API return custom errors object
            const mispErrors: string[] = Object.values(resp.error.errors ?? {});
            throw new Error(mispErrors.length ? mispErrors[0] : resp.error.message);
          } else {
            goto(`/admin/users/${resp.data.id!}`);
          }
        })
    );
  }

  const data = {} as CustomUserType;
</script>

<svelte:window use:lockEditMode={true} />

<Form callback={editCallback}>
  <DynCard
    header={[
      derived(idCardHeaders.email, (foo) => foo),
      idCardHeaders.role,
      idCardHeaders.nids_sid,
      idCardHeaders.disabled,
      idCardHeaders.authkey,
      idCardHeaders.contactaltert,
      idCardHeaders.notification_daily,
      idCardHeaders.notification_weekly,
      idCardHeaders.notification_monthly,
      idCardHeaders.termsaccepted
    ]}
    {data}
  ></DynCard>
</Form>
