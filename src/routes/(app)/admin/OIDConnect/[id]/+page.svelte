<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { notifySave } from '$lib/util/notifications.util';
  import type { PageData } from './$types';

  /** Page data containing data of the providers with the 'id' in the url */
  export let data: PageData;

  $: ({ left, provider } = data);

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api
        .POST('/auth/openID/editOpenIDConnectProvider/{openIDConnectProvider}', {
          params: { path: { openIDConnectProvider: $page.params.id } },
          body: formData
        })
        .then((resp) => {
          if (resp.error) {
            // @ts-expect-error MISP API return custom errors object
            const mispErrors: string[] = Object.values(resp.error.errors ?? {});
            throw new Error(mispErrors.length ? mispErrors[0] : resp.error.message);
          } else {
            goto(`/admin/OIDConnect/`);
          }
        })
    );
  }
</script>

<!--
  @component
  Displays information about a specific provider, specified by `id`.
  
-->

<Form callback={editCallback}>
  <div class="flex flex-wrap w-full h-full gap-2 lg:flex-nowrap">
    <DynCard header={left} data={provider} />
  </div>
</Form>
