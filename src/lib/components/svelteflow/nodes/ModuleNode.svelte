<script lang="ts">
  import { GET } from '$lib/api';
  import BaseNode from '$lib/components/svelteflow/nodes/BaseNode.svelte';
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import ModuleParam from './ModuleParam.svelte';

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
  }).then((res) => {
    fullData = res.data;
  });
  $: console.log(data.moduleData.name, fullData);

  // TODO: better handle positioning
  const dist = 10;
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
    <span class="italic">{data.moduleData.module_type}</span>
    <span class="font-bold">{data.moduleData.name}</span>

    {#each fullData.params ?? [] as param}
      <ModuleParam {param} value={data.moduleData.indexed_params[param.id]} />
    {/each}
  </div>
  {#each data.inputs as inputId, i}
    <Handle
      id={inputId}
      type="target"
      position={Position.Left}
      class="!bg-teal-500 rounded-none border-none"
      style="top: {i * dist + dist}px"
    />
  {/each}
  {#each data.outputs as outputId, i}
    <Handle
      id={outputId}
      type="source"
      position={Position.Right}
      class="!bg-teal-500 rounded-none border-none"
      style="top: {i * dist + dist}px"
    />
  {/each}
</BaseNode>
