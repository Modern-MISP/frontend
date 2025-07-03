<script lang="ts">
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import { page } from '$app/stores';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import AddObject from '$lib/components/addObject/AddObject.svelte';
  import { lockEditMode } from '$lib/actions';
  import { mode } from '$lib/stores.js';
  import Select from '$lib/components/form/Select.svelte';
  import { api } from '$lib/api/index.js';
  import Form from '$lib/components/form/Form.svelte';
  import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups.js';
  import { notifySave } from '$lib/util/notifications.util.js';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute } from '$lib/stores';

  /**Page data*/
  export let data;

  $mode = 'edit';

  const col = createTableHeadGenerator();
  let selectedCategory = data.categories[0];
  let availableTemplates = [];
  export let selectedTemplate = data.categoryToNameMap[selectedCategory][0].id;

  $: availableTemplates = data.categoryToNameMap[selectedCategory] as string[];

  let templateCol = col({
    icon: 'mdi:circle',
    key: 'name',
    label: 'Object Template',
    value: () => ({
      display: Select,
      props: {
        name: 'template',
        options: availableTemplates.map((c) => ({ value: c.id, label: c.name })) ?? [],
        changeCallback: (e) => {
          const target = e.target as HTMLSelectElement;
          selectedTemplate = target.value;
        }
      }
    })
  });

  const header = [
    col({
      icon: 'mdi:circle',
      key: 'category',
      label: 'Category',
      value: () => ({
        display: Select,
        props: {
          name: 'object_template_category',
          options: data.categories.map((c) => ({ value: c, label: c })) ?? [],
          changeCallback: (e) => {
            const target = e.target as HTMLSelectElement;
            selectedCategory = target.value;
            selectedTemplate = data.categoryToNameMap[selectedCategory][0].id;
            templateCol.update((tc) => ({
              ...tc,
              value: () => ({
                display: Select,
                props: {
                  name: 'name',
                  options: availableTemplates.map((c) => ({ value: c.id, label: c.name })),
                  value: availableTemplates[0].id,
                  changeCallback: (e) => {
                    const target = e.target as HTMLSelectElement;
                    selectedTemplate = target.value;
                  }
                }
              })
            }));
          }
        }
      })
    }),
    templateCol,
    col({
      icon: 'mdi:share',
      key: 'distribution',
      label: 'Distribution',
      value: () => ({
        display: Select,
        props: {
          // Remove "sharing group" option
          options: DISTRIBUTION_LOOKUP.map((x, i) => ({
            label: x.text ?? 'unknown',
            value: '' + i
          })),
          name: 'object_distribution'
        }
      })
    })
  ];

  function editCallback(formData: Record<string, string>) {
    let attributes = formData.category
      .map(function (e, i) {
        return {
          object_relation: formData.object_relation[i],
          type: formData.type[i],
          category: e,
          value: formData.value[i],
          distribution: formData.distribution[i],
          comment: formData.comment[i],
          disable_correlation: formData.disable_correlation[i]
        };
      })
      .filter((attr) => attr.value !== undefined && attr.value !== null && attr.value !== '');
    let object = {
      distribution: 0,
      sharing_group_id: 0,
      comment: '',
      first_seen: '',
      last_seen: ''
    };

    notifySave(
      $api
        .POST('/objects/add/{eventId}/{objectTemplateId}', {
          body: {
            Object: object,
            Attribute: attributes
          },
          params: { path: { eventId: $page.params.id, objectTemplateId: selectedTemplate } }
        })
        .then((resp) => {
          if (resp.error) {
            throw new Error(
              Object.values(
                (resp.error as typeof resp.error & { errors: Record<string, string[]> }).errors
              )[0][0] ?? []
            );
          } else {
            console.log(resp);
            //            goto(`/attributes/${resp.data.Attribute?.id}`);
          }
        })
    );
  }

  $: $currentRoute = [
    ...($currentRoute ?? []),
    { name: 'New Object', icon: 'mdi:flag-plus', href: 'new' } // TODO: icon
  ];
</script>

<svelte:window use:lockEditMode={true} />

<!--
@component
Displays the form for creating a new attribute.
-->

<Form callback={editCallback} class="overflow-auto">
  <DynCard {header} data={{}} class="!bg-surface2 !h-auto my-4" />
  <AddObject objectTemplateUuid={selectedTemplate} />
</Form>
