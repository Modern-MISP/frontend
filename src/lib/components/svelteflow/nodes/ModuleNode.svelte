<script lang="ts">
  import { GET } from '$lib/api';
  import BaseNode from '$lib/components/svelteflow/nodes/BaseNode.svelte';
  import { Handle, Position, type NodeProps, useSvelteFlow } from '@xyflow/svelte';
  import ModuleParam from './ModuleParam.svelte';
  import Icon from '@iconify/svelte';
  import { tick } from 'svelte';

  const svelteFlow = useSvelteFlow();

  type $$Props = NodeProps;

  /** Node id */
  export let id: $$Props['id'];
  /** Node data */
  export let data: $$Props['data'];
  /** Node drag handle */
  export let dragHandle: $$Props['dragHandle'] = undefined;
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

  // TODO: define 'module' type to use here
  /** Similar to `data.moduleData`, but with more and differently named properties. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fullData: any = {};
  // @ts-expect-error '/workflows/moduleView' is not specified within the OpenAPI spec
  GET('/workflows/moduleView/{moduleId}', {
    params: { path: { moduleId: data.moduleData.id } }
  }).then(async (res) => {
    fullData = res.data;
    await tick();
    svelteFlow.fitView();
    data.onUpdate(id);
  });
  $: console.log(data.moduleData.name, fullData);

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
    <div class="flex flex-row gap-1 items-center">
      <span class="italic mb-2 mr-5 basis-full">{data.moduleData.module_type}</span>
      {#if data.moduleData.misp_core_format}
        <span
          class="text-sky text-2xl"
          title="The data passed by this trigger is compliant with the MISP core format"
        >
          <Icon icon="material-symbols:chat" />
        </span>
      {/if}
      {#if fullData.disabled}
        <button class="text-red text-2xl hover:mix-blend-hard-light" title="Module disabled">
          <Icon icon="fa6-solid:circle-exclamation" />
        </button>
      {/if}
      {#if fullData.blocking}
        <button
          class="text-peach text-2xl hover:mix-blend-hard-light"
          title="Blocking module might not work as intended"
        >
          <Icon icon="fa6-solid:triangle-exclamation" />
        </button>
      {/if}
      {#if fullData.support_filters}
        <button
          class="text-sky text-2xl hover:mix-blend-hard-light"
          title="module filtering conditions"
        >
          <Icon icon="mdi:filter" />
        </button>
      {/if}
      {#if fullData.module_type !== 'trigger'}
        <button class="text-sky text-2xl hover:mix-blend-hard-light" title="node settings">
          <Icon icon="mdi:dots-horizontal" />
        </button>
      {/if}
    </div>
    <div class="flex flex-row gap-3 w-full items-center text-lg">
      <Icon icon={`fa6-solid:${fullData.icon}`} />
      <span class="font-bold basis-full">{data.moduleData.name}</span>
    </div>

    {#if (fullData.params ?? []).length > 0}
      <hr class="border-text h-1 my-3" />
      {#if fullData.module_type === 'action'}
        <span class="max-w-xs mb-2">{fullData.description}</span>
      {/if}

      {#each fullData.params as param}
        <ModuleParam {param} value={data.moduleData.indexed_params[param.id]} />
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
