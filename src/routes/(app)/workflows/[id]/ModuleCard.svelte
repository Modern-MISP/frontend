<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import Icon from '@iconify/svelte';
  import type { Module } from '../modules/module';

  /** The module that is displayed in the card. */
  export let module: Module;

  function onDragStart(event: DragEvent) {
    if (!event.dataTransfer) {
      return null;
    }

    event.dataTransfer.setData('application/svelteflow', JSON.stringify(module));
    event.dataTransfer.effectAllowed = 'move';
  }
</script>

<!--
  @component
  
  A module card that can be dragged inside the flow.
-->
<div
  on:dragstart={onDragStart}
  draggable={!module.disabled}
  role="listitem"
  class:shadow-none={module.disabled}
  class:shadow-sm={!module.disabled}
  class:hover:shadow-lg={!module.disabled}
  class:cursor-not-allowed={module.disabled}
  class:blur-[1px]={module.disabled}
  class:border-2={module.disabled}
  class:border-red={module.disabled}
  class:rounded-lg={module.disabled}
>
  <Card class="!bg-surface1">
    <div class="flex flex-row gap-2 items-center">
      <Icon icon={`fa6-solid:${module.icon}`} />
      <span class="basis-full text-text">{module.name}</span>
      <span class="italic text-subtext0">v{module.version}</span>
    </div>
    <p class="text-subtext0">{module.description}</p>
  </Card>
</div>
