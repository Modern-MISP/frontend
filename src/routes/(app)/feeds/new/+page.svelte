<script lang="ts">
  import { lockEditMode } from '$lib/actions';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { appState } from '$lib/stores.svelte.ts';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import Input from '$lib/components/input/Input.svelte';
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import { notifySave } from '$lib/util/notifications.util';
  import Select from '$lib/components/form/Select.svelte';
  import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups';
  import { goto } from '$app/navigation';

  appState.mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api.POST('/feeds/add', { body: formData }).then((resp) => {
        if (resp.error) {
          throw new Error(
            // @ts-expect-error Wrong error type from OpenAPI spec
            Object.values(resp.error.errors?.Feeds).at(0)?.at(0) ?? resp.error.message
          );
        } else {
          goto(`/feeds/${resp.data.Feed?.id}`);
        }
      })
    );
  }

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'Name',
      value: () => ({
        display: Input,
        props: {
          type: 'text',
          name: 'name'
        }
      })
    }),
    col({
      label: 'Provider',
      value: () => ({
        display: Input,
        props: {
          type: 'text',
          name: 'provider'
        }
      })
    }),
    col({
      label: 'URL',
      value: () => ({
        display: Input,
        props: {
          type: 'text',
          name: 'url'
        }
      })
    }),
    col({
      label: 'Rules',
      value: () => ({
        display: Input,
        props: {
          type: 'text',
          name: 'rules'
        }
      })
    }),
    col({
      label: 'Distribution',
      value: () => ({
        display: Select,
        props: {
          options: DISTRIBUTION_LOOKUP.toSpliced(4, 1).map((x, i) => ({
            label: x.text!,
            value: `${i}`
          })),
          name: 'distribution'
        }
      })
    }),
    col({
      label: 'Enabled',
      value: () => ({
        display: Checkbox,
        props: { name: 'enabled', checked: false }
      })
    })
  ];
</script>

<svelte:window use:lockEditMode={true} />

<!--
    @component
    Displays the form for creating a new feed.

-->

<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>
