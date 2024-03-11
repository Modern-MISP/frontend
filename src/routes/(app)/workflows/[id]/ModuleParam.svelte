<script lang="ts">
  import Select from '$lib/components/form/Select.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import Picker from '$lib/components/picker/Picker.svelte';
  import { mode } from '$lib/stores';
  import { objectEntries } from 'ts-extras';
  import type { ModuleParam as Param } from '../../../../routes/(app)/workflows/modules/module';
  import type { PickerPill } from '$lib/models/Picker.interface';

  /** The parameter data from the workflow module. */
  export let param: Param;
  /** The already supplied value for an indexed parameter. */
  export let value: string | string[] = '';

  let stringValue: string = Array.isArray(value) ? '' : value;
  let arrayValue: string[] = Array.isArray(value) ? value : [];

  const selectOptions = objectEntries(param.options ?? {}).map(([k, v]) => ({
    value: k,
    label: v
  }));

  const pickerIconLookup: { [key: string]: string } = {
    tags: 'mdi:tag',
    clusters: 'carbon:assembly-cluster'
  };
  function getPickerPills(textValues: string[]): PickerPill[] {
    return textValues.map((v) => ({
      icon: pickerIconLookup[param.id],
      text: v
    }));
  }
  const pickerOptions = getPickerPills(Object.values(param.options ?? {}));

  // need setValue to avoid cyclic dependency of reactive statements
  const setValue = (newValue: string | string[]) => {
    if (JSON.stringify(value) !== JSON.stringify(newValue)) value = newValue;
  };
  $: if (Array.isArray(value)) setValue(arrayValue);
  $: if (!Array.isArray(value)) setValue(stringValue);
  $: {
    if (Array.isArray(value)) {
      arrayValue = value;
    } else {
      stringValue = value;
    }
  }

  function onPickerUpdate(event: CustomEvent<PickerPill[]>) {
    arrayValue = event.detail.map((p) => p.text!);
  }
</script>

<!--
  @component
  
  Parameter of a workflow module.
-->
<div>
  <label for={param.id}>{param.label}</label>
  {#if param.type === 'select'}
    <Select
      name={param.id}
      options={selectOptions}
      bind:value={stringValue}
      disabled={$mode === 'view'}
    />
  {:else if param.type === 'picker'}
    <Picker
      name={param.id}
      placeholder={param.placeholder}
      pickableItems={pickerOptions}
      pickedItems={getPickerPills(arrayValue)}
      disabled={$mode === 'view'}
      on:update={onPickerUpdate}
    />
  {:else}
    <Input
      type={param.type}
      name={param.id}
      placeholder={param.placeholder}
      bind:value={stringValue}
      on:value={(e) => (stringValue = e.detail)}
      disabled={$mode === 'view'}
    />
  {/if}
</div>
