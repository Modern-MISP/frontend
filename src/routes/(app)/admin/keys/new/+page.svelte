<script lang="ts">
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import Picker from '$lib/components/picker/Picker.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute } from '$lib/stores.js';
  import { notifySave } from '$lib/util/notifications.util';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

  export let data;

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
          }
        })
    );
  }

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'User',
      value: () => ({
        display: Picker,
        props: {
          pickableItems: data.users.map((u) => ({
            text: u.User?.email,
            icon: 'mdi:account',
            label: u.User?.id
          }))
        }
      })
    }),
    col({
      label: 'Read only',
      value: () => ({
        display: Checkbox,
        props: { name: 'read_only', checked: false }
      })
    })
  ];

  $currentRoute = [...($currentRoute ?? []), { name: 'New Key', icon: 'mdi:key-add', href: 'new' }];
</script>

<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>
