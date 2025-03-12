<script lang="ts">
  import { page } from '$app/stores';
  import { lockEditMode } from '$lib/actions';
  import { mode } from '$lib/stores.js';
  import { api } from '$lib/api/index.js';
  import Form from '$lib/components/form/Form.svelte';
  import { notifySave } from '$lib/util/notifications.util.js';
  import { goto } from '$app/navigation';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute } from '$lib/stores';
  import AddAttribute from '$lib/components/addAttribute/AddAttribute.svelte';

  /**Page data*/
  export let data;

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api
        .POST('/attributes/add/{eventId}', {
          body: formData,
          params: { path: { eventId: $page.params.id } }
        })
        .then((resp) => {
          if (resp.error) {
            throw new Error(
              Object.values(
                (resp.error as typeof resp.error & { errors: Record<string, string[]> }).errors
              )[0][0] ?? []
            );
          } else {
            goto(`/attributes/${resp.data.Attribute?.id}`);
          }
        })
    );
  }

  $: $currentRoute = [
    ...($currentRoute ?? []),
    { name: 'New Attribute', icon: 'mdi:flag-plus', href: 'new' }
  ];

  let test = ['cookie', 'md5'];
</script>

<svelte:window use:lockEditMode={true} />

<!--
@component
Displays the form for creating a new attribute.
-->

<Form callback={editCallback}>
  <AddAttribute
    allAttributeTypes={test}
    categoryTypeMapping={data.attributeTypes.category_type_mappings}
    categories={data.attributeTypes.categories}
  />
</Form>
