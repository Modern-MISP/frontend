<script lang="ts">
  import { lockEditMode } from '$lib/actions';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import type { ActionBarEntryProps } from '$lib/models/ActionBarEntry.interface';
  import { mode } from '$lib/stores';
  import { error, type NumericRange } from '@sveltejs/kit';
  import { api } from '$lib/api';
  import { notifySave } from '$lib/util/notifications.util.js';

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    console.log('formData', formData);
    notifySave(
      $api
        .POST('/user_settings/setSetting/{userId}/{userSettingName}', {
          params: { path: { userId: Number(data.userid), userSettingName: 'user_name' } },
          body: { value: { name: String(formData.name) } }
        })
        .then((resp) => {
          if (resp.error) {
            throw new Error(
              // @ts-expect-error Wrong error type from OpenAPI spec
              error(resp.status as NumericRange<400, 599>, resp.data)
            );
          }
        })
    );
  }

  const Export: ActionBarEntryProps[] = [
    {
      icon: 'mdi:download',
      label: 'Export',
      action: () => {
        console.log('YAY');
      }
    }
  ];

  /**
   * Page data containing information about the user.
   */
  export let data;

  $: ({ header, title, description } = data);
</script>

<svelte:window use:lockEditMode={true} />
<!--
  @component
  Displays the information settings page.

-->
<Form callback={editCallback} additionalActions={Export}>
  <DynCard {header} data={{}} {title} {description}></DynCard>
</Form>
