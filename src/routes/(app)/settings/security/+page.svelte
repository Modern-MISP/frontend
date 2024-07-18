<script lang="ts">
  import { lockEditMode } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { mode } from '$lib/stores';
  import { notifySave } from '$lib/util/notifications.util';
  import { invalidateAll } from '$app/navigation';
  import { api } from '$lib/api';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api
        .PUT('/users/{userId}', {
          params: { path: { userId: data.userId } },
          body: formData
        })
        .then((resp) => {
          if (resp.error) {
            // @ts-expect-error MISP API return custom errors object
            const mispErrors: string[] = Object.values(resp.error.errors ?? {});
            throw new Error(mispErrors.length ? mispErrors[0] : resp.error.message);
          } else {
            invalidateAll();
          }
        })
    );
  }

  /**
   * Page data containing security information about the user.
   */
  export let data;

  $: ({ header } = data.card);
  $: ({ tableData, topMenuActions } = data.table);
</script>

<svelte:window use:lockEditMode={true} />

<!--
  @component
  Displays the information security settings page.

-->
<ComplexTableLayout
  tableHref={(x) => `/settings/security/${x.AuthKey?.id}`}
  {...data.table}
  {tableData}
></ComplexTableLayout>

<Form callback={editCallback} additionalActions={topMenuActions}>
  <DynCard {header} data={{}}></DynCard>
</Form>
