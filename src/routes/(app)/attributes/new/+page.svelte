<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { mode } from '$lib/stores';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { page } from '$app/stores';
  import Card from '$lib/components/card/Card.svelte';
  import CardHeading from '$lib/components/card/CardHeading.svelte';
  import TagCollection from '$lib/components/pills/pillCollection/TagCollection.svelte';
  import AddTagForm from '$lib/components/tagForms/AddTagForm.svelte';
  import CreateTag from '../../tags/CreateTag.svelte';
  import { addTags, deleteTags } from './attribute.util';
  import type { PickerPill } from '$lib/models/Picker.interface';
  import type { EventState } from '../../events/[id]/_components/EventState.interface';

  $mode = 'edit';

  export let data;

  let selection: PickerPill<{ local_only: boolean; relation: string }>[] = [];

  let state: EventState = 'info';

  function editCallback(formData: Record<string, string>) {
    console.log(formData);
  }

  let formActions: ActionBarEntryProps[] = [];
</script>

<!--
@component Displays information about an attribute specified by ID, allows adding of tags.

-->
<div class="h-full overflow-auto">
  <Form callback={editCallback} bind:actions={formActions}>
    <div class="grid h-full grid-cols-2 gap-2 lg:flex-nowrap">
      {#if state === 'add' && $mode === 'edit'}
        <AddTagForm
          bind:selection
          on:createTag={() => (state = 'create')}
          on:close={() => (state = 'info')}
        />
      {:else if state === 'create' && $mode === 'edit'}
        <Card>
          <CardHeading>Create a Tag</CardHeading>
          <CreateTag on:close={() => (state = 'add')}></CreateTag>
        </Card>
      {:else}
        <section class="h-full overflow-auto">
          <DynCard header={data.header} data={data.tableData} />
        </section>
      {/if}
      <section class="h-full overflow-hidden">
        <Card>
          <CardHeading>Tags</CardHeading>
          <TagCollection
            bind:selection
            on:close={() => (state = 'info')}
            on:open={() => (state = 'add')}
            on:delete={({ detail }) => {
              deleteTags(
                detail.map((x) => ({ attributeId: $page.params.id, value: x.value ?? '' }))
              );
            }}
            on:save={({ detail }) => {
              // @ts-expect-error svelte error. Does not detect the generic correctly.
              addTags(detail.map((x) => ({ ...x, attributeId: $page.params.id })));
            }}
            tags={[]}
          ></TagCollection>
        </Card>
      </section>
    </div>
  </Form>
</div>
