<script lang="ts">
  import { page } from '$app/state';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { notifySave } from '$lib/util/notifications.util';
  import type { PageData } from './$types';

  interface Props {
    /** Page data containing data of the servers with the 'id' in the url */
    data: PageData;
  }

  let { data }: Props = $props();

  const { left, right, server } = data;

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api
        .PUT('/servers/edit/{serverId}', {
          params: { path: { serverId: page.params.id } },
          body: formData
        })
        .then((resp) => {
          if (resp.error) throw new Error(resp['error']['message']);
        })
    );
  }
</script>

<!--
    @component
    Displays information about a specific remote server, specified by `id`.

-->
<Form callback={editCallback}>
  <div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
    <DynCard header={left} data={server} />
    <DynCard header={right} data={server} />
  </div>
</Form>
