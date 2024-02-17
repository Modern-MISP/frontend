<script lang="ts">
  import { page } from '$app/stores';
  import { actionBar } from '$lib/actions';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { notifySave } from '$lib/util/notifications.util';
  import type { PageData } from './$types';
  import AddTagForm from '$lib/components/tagForms/AddTagForm.svelte';
  import CreateTagForm from '$lib/components/tagForms/CreateTagForm.svelte';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import AttributeTags from './AttributeTags.svelte';
  import { addTags } from './attribute.util';

  /**
   * Page data containing the data of the attribute with the id in the url
   */
  export let data: PageData;

  let selection: PickerPill[] = [];

  let state: 'addTag' | 'info' | 'createTag' = 'info';

  function editCallback(formData: Record<string, string>) {
    $api
      .PUT('/attributes/edit/{attributeId}', {
        params: { path: { attributeId: $page.params.id } },
        body: formData
      })
      .then((resp) => {
        if (resp.error) throw Error(resp.error.message);
      });
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
@component Displays information about an attribute specified by ID, allows adding of tags.

-->
<div class="h-full overflow-auto">
  <Form callback={editCallback}>
    <div class="grid h-full grid-cols-2 gap-2 lg:flex-nowrap">
      {#if state === 'addTag'}
        <AddTagForm
          bind:selection
          on:createTag={() => (state = 'createTag')}
          on:close={() => (state = 'info')}
          on:add={({ detail }) => {
            addTags(detail.map((x) => ({ ...x, attributeId: $page.params.id })));
          }}
        />
      {:else if state === 'createTag'}
        <CreateTagForm on:close={() => (state = 'addTag')}></CreateTagForm>
      {:else}
        <section class="h-full">
          <DynCard header={data.header} data={data.attribute} />
        </section>
      {/if}
      <section class="h-full">
        <AttributeTags bind:state {data} bind:selection />
      </section>
    </div>
  </Form>
</div>
