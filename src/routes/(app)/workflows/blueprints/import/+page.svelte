<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { lockEditMode } from '$lib/actions';
  import { notifySave } from '$lib/util/notifications.util';
  import { api } from '$lib/api';
  import { goto } from '$app/navigation';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import Input from '$lib/components/input/Input.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute, mode } from '$lib/stores';

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api.POST('/workflowBlueprints/import', { body: { ...formData } }).then((response) => {
        if (response.error) {
          // throw new Error(resp.error.message);
          // @ts-expect-error MISP API return custom errors object
          const mispErrors: string[] = Object.values(response.error.errors ?? {});
          throw new Error(mispErrors.length ? mispErrors[0] : response.error.message);
        } else {
          goto(`/workflowBlueprints/view/${response.data.WorkflowBlueprint.id!}`);
        }
      })
    );
  }

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'Paste a JSON of a Workflow blueprint to import it:',
      value: () => ({ display: Input, props: { name: 'data' } })
    })
  ];

  $: $currentRoute = [
    ...($currentRoute ?? []),
    { name: 'Import Blueprint', href: 'import', icon: 'mdi:layers-plus' }
  ];
</script>

<svelte:window use:lockEditMode={true} />

<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>
