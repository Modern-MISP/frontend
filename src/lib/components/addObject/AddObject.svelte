<script lang="ts">
  import { run } from 'svelte/legacy';

  import { api } from '$lib/api';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import type { DynTableHeadExtent } from '$lib/components/table/dynTable/DynTable.model';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import AddAttribute from '$lib/components/addAttribute/AddAttribute.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
  import Icon from '@iconify/svelte';

  async function getAttributeTypes() {
    const resp = await $api.GET('/attributes/describeTypes', {});
    if (resp.error) {
      throw new Error();
    }
    return resp.data.result;
  }

  interface Props {
    /**
     * The object template uuid
     */
    objectTemplateUuid: any;
  }

  let { objectTemplateUuid }: Props = $props();

  let template = $state();
  let sortedOte = $state();

  run(() => {
    $api
      .GET('/object_templates/view/{objectTemplateId}', {
        params: { path: { objectTemplateId: objectTemplateUuid } }
      })
      .then((resp) => {
        if (resp.error) {
          throw new Error(
            Object.values(
              (resp.error as typeof resp.error & { errors: Record<string, string[]> }).errors
            )[0][0] ?? []
          );
        }
        template = resp.data;
        sortedOte = resp.data.ObjectTemplateElement.sort(
          (a, b) => b['ui-priority'] - a['ui-priority']
        );
        //else {
        //goto(`/attributes/${resp.data.Attribute?.id}`);
        //}
        console.log(resp.data);
      });
  });
  const fac = createTableHeadGenerator<NonNullable<typeof cardData>[number], DynTableHeadExtent>();

  const objectTemplateElementsHeader = [
    fac({
      icon: 'mdi:share',
      key: 'object_relation',
      label: 'Relation',
      hidden: true,
      value: (x) => ({
        display: Input,
        props: { value: x.object_relation, readonly: true, name: 'object_relation' }
      })
    })
  ];
</script>

{#await getAttributeTypes() then attributeTypes}
  <div class="flex flex-col gap-2">
    {#if sortedOte}
      {#each sortedOte as ote, index}
        <DynCard
          header={objectTemplateElementsHeader}
          title={ote.object_relation}
          description={ote.description}
          data={ote}
        >
          {#snippet before()}
            <div class="flex justify-end space-x-5 absolute right-10 w-[10em]">
              {#if template?.ObjectTemplate.requirements?.required?.includes(ote.object_relation)}
                <Tooltip tooltip="This attribute is required">
                  <Icon icon="mdi:asterisk" class="text-2xl text-sky" />
                </Tooltip>
              {/if}
              {#if template?.ObjectTemplate.requirements?.requiredOneOf?.includes(ote.object_relation)}
                <Tooltip tooltip="This attribute is in a group of required attributes">
                  <Icon icon="mdi:asterisk-circle-outline" class="text-2xl text-sky" />
                </Tooltip>
              {/if}
              {#if ote.multiple}
                <Tooltip tooltip="Add an additional attribute of the same object relation">
                  <button
                    type="button"
                    onclick={() => (sortedOte = sortedOte.toSpliced(index, 0, ote))}
                  >
                    <Icon icon="mdi:plus" class="text-2xl text-sky" />
                  </button>
                </Tooltip>
              {/if}
            </div>
          {/snippet}
          {#snippet after()}
            <AddAttribute
              contentOnly="true"
              allAttributeTypes={[ote.type]}
              categoryTypeMapping={attributeTypes.category_type_mappings}
              categories={ote.categories.length > 0 ? ote.categories : attributeTypes.categories}
              saneDefault={ote.sane_default.length > 0 ? ote.sane_default : undefined}
              valueList={ote.values_list}
              disable_correlation={ote.disable_correlation}
            />
          {/snippet}
        </DynCard>
      {/each}
    {/if}
  </div>
{/await}
