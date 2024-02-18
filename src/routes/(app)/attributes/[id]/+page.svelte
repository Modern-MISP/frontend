<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import { actionBar } from '$lib/actions';
  import { api } from '$lib/api';
  import Card from '$lib/components/card/Card.svelte';
  import CardHeading from '$lib/components/card/CardHeading.svelte';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import TagCollection from '$lib/components/pills/pillCollection/TagCollection.svelte';
  import AddTagForm from '$lib/components/tagForms/AddTagForm.svelte';
  import CreateTagForm from '$lib/components/tagForms/CreateTagForm.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import { notifySave } from '$lib/util/notifications.util';
  import type { PageData } from './$types';
  import { addTags, deleteTags } from './attribute.util';

  /**
   * Page data containing the data of the attribute with the id in the url
   */
  export let data: PageData;

  let selection: PickerPill<{ local_only: boolean; relation: string }>[] = [];

  let state: 'addTag' | 'info' | 'createTag' = 'info';

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api
        .PUT('/attributes/edit/{attributeId}', {
          params: { path: { attributeId: $page.params.id } },
          body: { last_seen: '', first_seen: '', ...formData } // default last_seen and first_seen to empty to set to null, if disabled in form
        })
        .then((resp) => {
          if (resp.error) throw Error(resp.error.message);
        })
        .then(invalidateAll)
    );
  }

  let formActions: ActionBarEntryProps[] = [];
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
    },
    {
      label: 'Delete Attribute',
      class: 'hover:text-red',
      icon: 'mdi:delete-outline',
      action: () => {
        notifySave(
          $api
            .DELETE('/attributes/delete/{attributeId}', {
              params: { path: { attributeId: $page.params.id } }
            })
            .then((resp) => {
              if (resp.error) throw new Error(resp.error.message);
            })
            .then(() => history.back())
        );
      }
    },
    ...formActions
  ]}
/>

<!--
@component Displays information about an attribute specified by ID, allows adding of tags.

-->
<div class="h-full overflow-auto">
  <Form callback={editCallback} bind:actions={formActions}>
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
        <Card>
          <CardHeading>Tags</CardHeading>
          <TagCollection
            on:delete={({ detail }) => {
              deleteTags(
                detail.map((x) => ({ attributeId: $page.params.id, value: x.value ?? '' }))
              );
            }}
            tags={data.attribute.Tag ?? []}
          ></TagCollection>
        </Card>
      </section>
    </div>
  </Form>
</div>
