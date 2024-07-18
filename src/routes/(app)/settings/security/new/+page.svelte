<script lang="ts">
  import { goto } from '$app/navigation';
  import { lockEditMode } from '$lib/actions.js';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import { currentRoute, mode, notifications } from '$lib/stores.js';
  import { notifySave } from '$lib/util/notifications.util';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import InputWithCheckbox from '$lib/components/inputWithCheckbox/InputWithCheckbox.svelte';

  /** Page data containing the form for new auth keys */
  export let data;
  $: ({ user } = data);

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    formData.user_id = user.User?.id;
    notifySave(
      $api
        .POST('/auth_keys/add/{userId}', {
          body: formData,
          params: { path: { userId: formData.user_id } }
        })
        .then((resp) => {
          if (resp.error) {
            const mispErrors: string[] = Object.values(resp.error.errors ?? {});
            throw new Error(mispErrors.length ? mispErrors[0] : resp.error.message);
          } else {
            notifications.add({
              text: `Added Authkey: ${resp.data.AuthKey?.authkey_start}••••••••••••••${resp.data.AuthKey?.authkey_end} (sorry, the API doesn't give us the full key)`
            });
            goto(`/settings/security/`);
          }
        })
    );
  }

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'Read only',
      value: () => ({
        display: Checkbox,
        props: { name: 'read_only', checked: false }
      })
    }),
    col({
      label: 'Expiration',
      value: () => ({
        display: InputWithCheckbox,
        props: {
          checked: false,
          inputProps: {
            value: undefined,
            name: 'expiration',
            type: 'Date'
          }
        }
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

  $: {
    $currentRoute = [
      ...($currentRoute ?? []),
      { name: 'New Key', icon: 'mdi:key-add', href: 'new' }
    ];
  }
</script>

<svelte:window use:lockEditMode={true} />

<!-- 
    @component
    Displays the form for creating a new auth key.
-->
<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>
