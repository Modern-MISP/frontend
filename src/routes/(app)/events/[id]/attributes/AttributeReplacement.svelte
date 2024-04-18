<script lang="ts">
  import { page } from '$app/stores';
  import { api } from '$lib/api';
  import { getFormValues } from '$lib/util/form.util';
  import { error, type NumericRange } from '@sveltejs/kit';
  import { createEventDispatcher, onMount } from 'svelte';
  import type { ChangeEventHandler, EventHandler } from 'svelte/elements';
  import Select from '$lib/components/form/Select.svelte';
  import type { components } from '$lib/api/misp';
  import { notifications } from '$lib/stores';
  import { successPill } from '$lib/util/pill.util';
  import { invalidateAll } from '$app/navigation';
  import Button from '$lib/components/button/Button.svelte';

  const dispatch = createEventDispatcher<{ close: void }>();

  type ResponseType = Omit<
    components['responses']['DescribeAttributeTypesResponse']['content']['application/json'],
    'category_type_mappings'
  > & {
    category_type_mappings?: Record<string, string[]>;
  };

  let attributeTypes: ResponseType;

  onMount(async () => {
    const { data, error: mispError, response } = await $api.GET('/attributes/describeTypes');
    if (mispError) error(response.status as NumericRange<400, 599>, mispError.message);
    attributeTypes = (data as { result: ResponseType }).result;
  });

  const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (e) => {
    const { category, type, value } = getFormValues(e);
    $api
      // @ts-expect-error Not in the OpenAPI spec
      .POST('/attributes/attributeReplace/{eventId}', {
        params: { path: { eventId: $page.params.id } },
        body: {
          event_id: $page.params.id,
          to_ids: '0',
          category,
          type,
          value: value.replaceAll('\n', '\r\n')
        }
      });
    notifications.add(
      successPill("Request has been sent, but response can't be displayed because of CORS")
    );
    invalidateAll();
    dispatch('close');
  };

  let typeSelect: Select<string>;

  const categorySelectCallback: ChangeEventHandler<HTMLSelectElement> = (e) => {
    typeSelect.options = (attributeTypes.category_type_mappings ?? {})[e.currentTarget.value].map(
      (x) => ({ label: x, value: x })
    );
    typeSelect.value = typeSelect.options[0].value;
  };
</script>

<div class="h-full">
  {#if attributeTypes}
    <form on:submit|preventDefault={onSubmit} class="flex flex-col h-full gap-4">
      <Select
        options={(attributeTypes.categories ?? []).map((x) => ({ label: x, value: x }))}
        name="category"
        changeCallback={categorySelectCallback}
      ></Select>
      <Select
        bind:this={typeSelect}
        options={(attributeTypes.category_type_mappings ?? {})[
          (attributeTypes.categories ?? [])[0]
        ].map((x) => ({ label: x, value: x }))}
        name="type"
      ></Select>
      <textarea
        class="w-full h-full p-2 border rounded-md outline-none bg-surface0 border-sky"
        name="value"
      ></textarea>

      <Button
        class="self-end w-min text-green bg-surface1"
        suffixIcon="material-symbols:save-outline"
        type="submit">Submit</Button
      >
    </form>
  {/if}
</div>
