<script lang="ts">
  import { goto } from '$app/navigation';
  import { lockEditMode } from '$lib/actions.js';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import Input from '$lib/components/input/Input.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute, mode, notifications } from '$lib/stores.js';
  import { notifySave } from '$lib/util/notifications.util';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

  export let data;

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api
        .POST('/auth_keys/add/{userId}', {
          body: formData,
          params: { path: { userId: formData.user_id } }
        })
        .then((resp) => {
          if (resp.error) {
            // throw new Error(resp.error.message);
            // @ts-expect-error MISP API return custom errors object
            const mispErrors: string[] = Object.values(resp.error.errors ?? {});
            throw new Error(mispErrors.length ? mispErrors[0] : resp.error.message);
          } else {
            notifications.add({
              text: `Added Authkey: ${resp.data.AuthKey?.authkey_start}••••••••••••••${resp.data.AuthKey?.authkey_end} (sorry, the API doesn't give us the full key)`
            });
            goto(`/admin/keys/${resp.data.AuthKey?.id}`);
          }
        })
    );
  }

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'User',
      value: () => ({
        display: Select,
        props: {
          options: data.users.map((u) => ({ label: u.User!.email!, value: u.User!.id! })),
          value: data.users[0].User!.id!,
          name: 'user_id'
        }
      })
    }),
    col({
      label: 'Read only',
      value: () => ({
        display: Checkbox,
        props: { name: 'read_only', checked: false }
      })
    }),
    col({
      label: 'Comment',
      value: () => ({
        display: Input,
        props: { name: 'comment' }
      })
    })
  ];

  $: $currentRoute = [
    ...($currentRoute ?? []),
    { name: 'New Key', icon: 'mdi:key-add', href: 'new' }
  ];
</script>

<svelte:window use:lockEditMode={true} />

<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>
