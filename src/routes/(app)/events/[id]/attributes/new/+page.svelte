<script lang="ts">
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import { page } from '$app/stores';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import { lockEditMode } from '$lib/actions';
  import { mode } from '$lib/stores.js';
  import Select from '$lib/components/form/Select.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import { api } from '$lib/api/index.js';
  import Form from '$lib/components/form/Form.svelte';
  import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups.js';
  import { notifySave } from '$lib/util/notifications.util.js';
  import { goto } from '$app/navigation';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute } from '$lib/stores';

  export let data;

  $mode = 'edit';

  const col = createTableHeadGenerator();

  const initialCategory = data.attributeTypes.categories![0];
  const initialTypes = data.attributeTypes.category_type_mappings![initialCategory] as string[];

  const typeCol = col({
    icon: '',
    key: 'type',
    label: 'Type',
    value: () => ({
      display: Select,
      props: {
        name: 'type',
        options: initialTypes.map((c) => ({ value: c, label: c })) ?? [],
        value: initialTypes[0]
      }
    })
  });

  const header = [
    col({
      icon: 'mdi:circle',
      key: 'value',
      label: 'Value',
      value: () => ({ display: Input, props: { name: 'value' } })
    }),
    col({
      icon: 'mdi:comment',
      key: 'comment',
      label: 'Comment',
      value: () => ({
        display: Input,
        props: { name: 'comment' }
      })
    }),
    col({
      icon: 'mdi:share',
      key: 'distribution',
      label: 'Distribution',
      value: () => ({
        display: Select,
        props: {
          value: '0',
          options: DISTRIBUTION_LOOKUP.map((x, i) => ({
            label: x.text ?? 'unknown',
            value: '' + i
          })),
          name: 'distribution'
        }
      })
    }),
    col({
      icon: 'mdi:circle',
      key: 'category',
      label: 'Category',
      value: () => ({
        display: Select,
        props: {
          name: 'category',
          options: data.attributeTypes.categories?.map((c) => ({ value: c, label: c })) ?? [],
          value: initialCategory,
          changeCallback: (e) => {
            const target = e.target as HTMLSelectElement;
            const value = target.value;
            // Without this, the value of the category select always resets??
            // I don't know why this is happening.
            // Please help me.
            setTimeout(() => (target.value = value));
            const types = data.attributeTypes.category_type_mappings![target.value] as string[];
            typeCol.update((tc) => ({
              ...tc,
              value: () => ({
                display: Select,
                props: {
                  name: 'type',
                  options: types.map((c) => ({ value: c, label: c })),
                  value: types[0]
                }
              })
            }));
          }
        }
      })
    }),
    typeCol
  ];

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
    { name: 'New Attribute', icon: 'mdi:plus', href: 'new' }
  ];
</script>

<svelte:window use:lockEditMode={true} />

<Form callback={editCallback}>
  <DynCard {header} data={{}} />
</Form>
