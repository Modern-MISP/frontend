<script lang="ts">
  import Select from '$lib/components/form/Select.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import { mode } from '$lib/stores';
  import { objectEntries } from 'ts-extras';

  type Param = {
    id: string;
    label: string;
    placeholder: string;
    type: string;
    options?: { [key: string]: string };
  };

  /** The parameter data from the workflow module. */
  export let param: Param;
  /** The already supplied value for an indexed parameter. */
  export let value: string = '';

  const mappedOptions = objectEntries(param.options ?? {}).map(([k, v]) => ({
    value: k,
    label: v
  }));
</script>

<!--
  @component
  
  Parameter of a workflow module.
-->
<div>
  <label for={param.id}>{param.label}</label>
  {#if param.type === 'select'}
    <Select name={param.id} options={mappedOptions} {value} disabled={$mode === 'view'} />
  {:else}
    <Input
      type={param.type}
      name={param.id}
      placeholder={param.placeholder}
      {value}
      disabled={$mode === 'view'}
    />
  {/if}
</div>
