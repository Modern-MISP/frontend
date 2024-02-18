<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { actionBar } from '$lib/actions';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import ActionBarEntry from '$lib/components/menus/topmenu/actionbar/ActionBarEntry.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { notifySave } from '$lib/util/notifications.util';
  import type { PageData } from './$types';

  /** Data that is displayed on this page. */
  export let data: PageData;

  const { left, right, user } = data;

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api
        .PUT('/admin/users/edit/{userId}', {
          params: { path: { userId: $page.params.id } },
          body: formData
        })
        .then((resp) => {
          if (resp.error) {
            // @ts-expect-error MISP API return custom errors object
            const mispErrors: string[] = Object.values(resp.error.errors ?? {});
            throw new Error(mispErrors.length ? mispErrors[0] : resp.error.message);
          }
        })
    );
  }

  function deleteUser() {
    notifySave(
      $api
        .DELETE('/admin/users/delete/{userId}', { params: { path: { userId: $page.params.id } } })
        .then((resp) => {
          if (resp.error) {
            // @ts-expect-error MISP API return custom errors object
            const mispErrors: string[] = Object.values(resp.error.errors ?? {});
            throw new Error(mispErrors.length ? mispErrors[0] : resp.error.message);
          } else {
            goto('/admin/users');
          }
        })
    );
  }
</script>

<!--
  @component
  Displays information about a specific user, specified by `id`.
  
-->

<Form
  callback={editCallback}
  additionalActions={[{ label: 'Delete User', icon: 'mdi:delete', action: deleteUser }]}
>
  <div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
    <DynCard header={left} data={user} />
    <DynCard header={right} data={user} />
  </div>
</Form>
