<script lang="ts">
  import { goto } from '$app/navigation';
  import { lockEditMode } from '$lib/actions';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import Input from '$lib/components/input/Input.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute, mode } from '$lib/stores';
  import { notifySave } from '$lib/util/notifications.util';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api.POST('/servers/add', { body: { ...formData } }).then((resp) => {
        if (resp.error) {
          // throw new Error(resp.error.message);
          // @ts-expect-error MISP API return custom errors object
          const mispErrors: string[] = Object.values(resp.error.errors ?? {});
          throw new Error(mispErrors.length ? mispErrors[0] : resp.error.message);
        } else {
          goto(`/admin/servers/${resp.data.Server!.id!}`);
        }
      })
    );
  }

  const col = createTableHeadGenerator();

  const header = [
    col({ label: 'URL', value: () => ({ display: Input, props: { name: 'url' } }) }),
    col({ label: 'Name', value: () => ({ display: Input, props: { name: 'name' } }) }),
    col({
      label: 'Remote Org ID',
      value: () => ({ display: Input, props: { name: 'remote_org_id' } })
    }),
    col({
      label: 'Authkey',
      value: () => ({ display: Input, props: { name: 'authkey' } })
    })
  ];

  $currentRoute = [
    ...($currentRoute ?? []),
    { name: 'New Remote Server', href: 'new', icon: 'mdi:server-plus' }
  ];
</script>

<svelte:window use:lockEditMode={true} />

<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>
