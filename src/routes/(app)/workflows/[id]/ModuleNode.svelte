<script lang="ts">
  import { api } from '$lib/api';
  import BaseNode from '$lib/components/svelteflow/BaseNode.svelte';
  import Icon from '@iconify/svelte';
  import { Handle, Position, useSvelteFlow, type NodeProps } from '@xyflow/svelte';
  import { tick } from 'svelte';
  import { get } from 'svelte/store';
  import ModuleParam from './ModuleParam.svelte';
  import type { Module } from '../../../../routes/(app)/workflows/modules/module';

  const svelteFlow = useSvelteFlow();

  type $$Props = NodeProps;

  /** Node id */
  export let id: $$Props['id'];
  /** Node data */
  export let data: $$Props['data'];
  /** Node drag handle */
  export let dragHandle: $$Props['dragHandle'];
  /** Node type */
  export let type: $$Props['type'] = undefined;
  /** Node selected */
  export let selected: $$Props['selected'] = undefined;
  /** Node is connectable */
  export let isConnectable: $$Props['isConnectable'] = undefined;
  /** Node z index */
  export let zIndex: $$Props['zIndex'] = undefined;
  /** Node width */
  export let width: $$Props['width'] = undefined;
  /** Node height */
  export let height: $$Props['height'] = undefined;
  /** Node dragging */
  export let dragging: $$Props['dragging'];
  /** Node target position */
  export let targetPosition: $$Props['targetPosition'] = undefined;
  /** Node source position */
  export let sourcePosition: $$Props['sourcePosition'] = undefined;
  /** Node absolute x position */
  export let positionAbsoluteX: $$Props['positionAbsoluteX'];
  /** Node absolute y position */
  export let positionAbsoluteY: $$Props['positionAbsoluteY'];

  /** Similar to `data.moduleData`, but with more and differently named properties. */
  let fullData: Module = {};
  get(api)
    // @ts-expect-error '/workflows/moduleView' is not specified within the OpenAPI spec
    .GET('/workflows/moduleView/{moduleId}', {
      params: { path: { moduleId: data.moduleData.id } }
    })
    .then(async (res) => {
      fullData = res.data as Module;
      await tick();
      svelteFlow.fitView();
      data.onUpdate(id);
    });

  // TODO: better handle positioning
  const dist = 20;
</script>

<!--
  @component
  
  A node representing a generic workflow module.
-->
<BaseNode
  {id}
  {data}
  {dragHandle}
  {type}
  {selected}
  {isConnectable}
  {zIndex}
  {width}
  {height}
  {dragging}
  {targetPosition}
  {sourcePosition}
  {positionAbsoluteX}
  {positionAbsoluteY}
  class={fullData.disabled ? 'border-4 border-red' : ''}
>
  <div class="flex flex-col">
    <div class="flex flex-row items-center gap-1">
      <span class="mb-2 mr-5 italic basis-full">{data.moduleData.module_type}</span>
      {#if data.moduleData.misp_core_format}
        <span
          class="text-2xl text-sky"
          title="The data passed by this trigger is compliant with the MISP core format"
        >
          <Icon icon="material-symbols:chat" />
        </span>
      {/if}
      {#if fullData.disabled}
        <button
          type="button"
          class="text-2xl text-red hover:mix-blend-hard-light"
          title="Module disabled"
        >
          <Icon icon="fa6-solid:circle-exclamation" />
        </button>
      {/if}
      {#if fullData.blocking}
        <button
          type="button"
          class="text-2xl text-peach hover:mix-blend-hard-light"
          title="Blocking module might not work as intended"
        >
          <Icon icon="fa6-solid:triangle-exclamation" />
        </button>
      {/if}
      {#if fullData.support_filters}
        <!-- Module filters are not yet supported -->
        <button
          type="button"
          class="text-2xl text-sky hover:mix-blend-hard-light"
          title="module filtering conditions (not yet supported)"
          disabled
        >
          <Icon icon="mdi:filter" />
        </button>
      {/if}
    </div>
    <div class="flex flex-row items-center w-full gap-3 text-lg">
      <Icon icon={`fa6-solid:${fullData.icon}`} />
      <span class="font-bold basis-full">{data.moduleData.name}</span>
    </div>

    {#if (fullData.params ?? []).length > 0}
      <hr class="h-1 my-3 border-text" />
      {#if fullData.module_type === 'action'}
        <span class="max-w-xs mb-2">{fullData.description}</span>
      {/if}

      {#each fullData.params ?? [] as param}
        <ModuleParam {param} bind:value={data.moduleData.indexed_params[param.id]} />
      {/each}
    {/if}
  </div>
  {#each data.inputs as inputId, i}
    <Handle
      id={inputId}
      type="target"
      position={Position.Left}
      class="!bg-sky rounded-none border-none !w-4 !h-4"
      style="top: {i * dist + dist}px"
    />
  {/each}
  {#each data.outputs as outputId, i}
    <Handle
      id={outputId}
      type="source"
      position={Position.Right}
      class="!bg-sky rounded-none border-none !w-4 !h-4"
      style="top: {i * dist + dist}px"
    />
  {/each}
</BaseNode>
