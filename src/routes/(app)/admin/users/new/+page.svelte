<script lang="ts">
  import { goto } from '$app/navigation';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { notifySave } from '$lib/util/notifications.util';
  import { get } from 'svelte/store';
  import idCardHeaders from '../idCardHeaders';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute, mode } from '$lib/stores';
  import { lockEditMode } from '$lib/actions';

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
            // Autogenerated (OpenAPI spec) type of resp.data is wrong
            goto(`/admin/users/${(resp.data as { User?: typeof resp.data })!.User!.id!}`);
          }
        })
    );
  }

  $: $currentRoute = [
    ...($currentRoute ?? []),
    { name: 'New User', href: 'new', icon: 'mdi:account-plus-outline' }
  ];
</script>

<svelte:window use:lockEditMode={true} />

<Form callback={editCallback}>
  <DynCard
    header={[
      idCardHeaders.email,
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
    data={{}}
  ></DynCard>
</Form>
