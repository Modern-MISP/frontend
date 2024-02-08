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
<div on:dragstart={onDragStart} draggable="true" role="listitem">
  <Card class="!resize-none !bg-surface1">
    <div class="flex flex-row gap-2 items-center">
      <Icon icon={`fa6-solid:${module.icon}`} />
      <span class="basis-full text-text">{module.name}</span>
      <span class="italic text-subtext0">v{module.version}</span>
    </div>
    <p class="text-subtext0">{module.description}</p>
  </Card>
</div>
