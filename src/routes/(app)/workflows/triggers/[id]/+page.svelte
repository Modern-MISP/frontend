<script lang="ts">
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import { writable } from 'svelte/store';
  import type { PageData } from './$types';
  import { SvelteFlow, Background, BackgroundVariant, Controls } from '@xyflow/svelte';
  import { flavors } from '@catppuccin/palette';
  import { settings } from '$lib/stores';
    import TriggerNode from './TriggerNode.svelte';

  const colors = flavors[$settings.theme].colors;

  export let data: PageData;

  const { trigger, infoHeader } = data;

  const nodes = writable([
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 0, y: 0 },
      class: 'bg-base',
    },
    {
      id: '2',
      type: 'trigger',
      data: { label: 'Node' },
      position: { x: 0, y: 150 }
    }
  ]);
  
  const edges = writable([
    {
      id: '1-2',
      type: 'default',
      source: '1',
      target: '2',
      label: 'Edge Text'
    }
  ]);

  const nodeTypes = {
    trigger: TriggerNode,
  }
 
  const snapGrid = [25, 25];
</script>

<div class="flex flex-row">
  <div class="flex-col basis-1/3">
    <DynCard header={infoHeader} data={trigger} />
  </div>
  <div class="flex-col w-full basis-2/3">
    <SvelteFlow {nodes} {edges} {snapGrid} {nodeTypes}>
      <Background
        bgColor={colors.crust.hex}
        patternColor={colors.overlay0.hex}
        variant={BackgroundVariant.Dots}
        size={2} />
      <Controls position="top-right"></Controls>
    </SvelteFlow>
  </div>
</div>
  