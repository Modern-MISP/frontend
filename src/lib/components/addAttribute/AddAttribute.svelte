<script lang="ts">
  import { run } from 'svelte/legacy';

  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import DynCardContent from '$lib/components/card/dynCard/DynCardContent.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import { DISTRIBUTION_LOOKUP } from '$lib/consts/PillLookups.js';

  interface Props {
    /**
     * All Attribute types that should be selectable
     */
    allAttributeTypes: any;
    /**
     * All categories
     */
    categories: any;
    /**
     * Mapping between categories and types
     */
    categoryTypeMapping: any;
    /**
     * sane defaults, are shown as suggestions
     */
    saneDefault?: any;
    /**
     * a list of possible values. If set only they are selectable
     */
    valueList?: any;
    /**
     * Whether to set the default of disable correlation
     */
    disable_correlation?: boolean;
    /**
     * Whether to render DynCard or DynCardContent
     */
    contentOnly?: boolean;
  }

  let {
    allAttributeTypes,
    categories,
    categoryTypeMapping,
    saneDefault = undefined,
    valueList = [],
    disable_correlation = false,
    contentOnly = false
  }: Props = $props();

  const col = createTableHeadGenerator();

  const typeCol = col({
    icon: '',
    key: 'type',
    label: 'Type'
  });
  const valueCol = col({
    icon: 'mdi:circle',
    key: 'value',
    label: 'Value'
  });

  const categoryCol = col({
    icon: 'mdi:circle',
    key: 'category',
    label: 'Category'
  });

  const disableCorrelationCol = col({
    icon: 'mdi:circle',
    key: 'correlate',
    label: 'Correlate',
    value: () => ({
      display: Checkbox,
      props: {
        name: 'disable_correlation',
        checked: !disable_correlation
      }
    })
  });

  function updateCols(allAttributeTypes, categories, categoryTypeMapping, saneDefault, valueList) {
    let filteredCategories = categories.filter(
      (x) => categoryTypeMapping![x].filter((y) => allAttributeTypes.includes(y)).length > 0
    );
    if (valueList.length > 0) {
      valueCol.update((vc) => ({
        ...vc,
        value: () => ({
          display: Select,
          props: {
            options: valueList.map((x) => ({
              label: x,
              value: x
            })),
            name: 'value'
          }
        })
      }));
    } else {
      valueCol.update((vc) => ({
        ...vc,
        value: () => ({ display: Input, props: { name: 'value', datalist: saneDefault } })
      }));
    }
    typeCol.update((tc) => ({
      ...tc,
      value: () => ({
        display: Select,
        props: {
          name: 'type',
          value: categoryTypeMapping![filteredCategories![0]].filter((x) =>
            allAttributeTypes.includes(x)
          )[0],
          options:
            (
              categoryTypeMapping![filteredCategories![0]].filter((x) =>
                allAttributeTypes.includes(x)
              ) as string[]
            ).map((c) => ({ value: c, label: c })) ?? []
        }
      })
    }));
    categoryCol.update((cc) => ({
      ...cc,
      value: () => ({
        display: Select,
        props: {
          name: 'category',
          options: filteredCategories?.map((c) => ({ value: c, label: c })) ?? [],
          value: filteredCategories[0],
          changeCallback: (e) => {
            const target = e.target as HTMLSelectElement;
            const types = categoryTypeMapping![target.value].filter((x) =>
              allAttributeTypes.includes(x)
            ) as string[];
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
    }));
  }
  run(() => {
    updateCols(allAttributeTypes, categories, categoryTypeMapping, saneDefault, valueList);
  });

  const header = [
    valueCol,
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
          // Remove "sharing group" option
          options: DISTRIBUTION_LOOKUP.toSpliced(4, 1).map((x, i) => ({
            label: x.text ?? 'unknown',
            value: '' + i
          })),
          name: 'distribution'
        }
      })
    }),
    categoryCol,
    typeCol,
    disableCorrelationCol
  ];
</script>

{#if contentOnly}
  <DynCardContent {header} data={{}} />
{:else}
  <DynCard {header} data={{}} />
{/if}
