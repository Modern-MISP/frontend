<script lang="ts">
  import { page } from '$app/stores';
  import { actionBar } from '$lib/actions';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { notifySave } from '$lib/util/notifications.util';
  import type { PageData } from './$types';
  //import { header as headerPromise } from './formHeaders';

  /**
   * Page data containing the data of the attribute with the id in the url
   */
  export let data: PageData;

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api
        .PUT('/attributes/edit/{attributeId}', {
          params: { path: { attributeId: $page.params.id } },
          body: formData
        })
        .then((resp) => {
          if (resp.error) throw Error(resp.error.message);
        })
    );
  }
</script>

<svelte:window
  use:actionBar={[
    {
      label: 'Add Sighting',
      icon: 'mdi:plus',
      action: () => {
        notifySave(
          $api
            .POST('/sightings/add/{attributeId}', {
              params: { path: { attributeId: $page.params.id } }
            })
            .then((resp) => {
              if (resp.error) throw new Error(resp.error.message);
            })
        );
      }
    }
  ]}
/>
<!--
  @component
  Displays information about a specific attribute, specified by `id`.
-->
<Form callback={editCallback}>
  <div class="flex flex-wrap w-full gap-2 lg:flex-nowrap">
    <DynCard header={data.left} data={data.attribute} />
    <DynCard header={data.right} data={data.attribute} />
  </div>
</Form>
