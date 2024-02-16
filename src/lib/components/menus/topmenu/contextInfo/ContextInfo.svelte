<script lang="ts">
  import Info from '$lib/components/info/Info.svelte';
  import Icon from '@iconify/svelte';
  import { createPopover, melt } from '@melt-ui/svelte';

  /**
   * Contextual info messages.
   */
  export let info: string[];

  const {
    elements: { trigger, content, arrow },
    states: { open }
  } = createPopover({
    positioning: { placement: 'bottom' },
    portal: '#layout'
  });
</script>

<!--
  @component
  
  Indicate context specific information that is displayed as a popover on click.
-->
<button class="text-subtext0" class:!text-yellow={info.length > 0} use:melt={$trigger}>
  <Icon icon="mdi:information" width="30" />
</button>
{#if $open}
  <div use:melt={$content} class="bg-surface1 text-text rounded-lg p-3">
    <div use:melt={$arrow} />
    <div class="flex flex-col gap-2">
      {#each info as message}
        <Info class="w-full">{message}</Info>
      {:else}
        <p>No context info available.</p>
      {/each}
    </div>
  </div>
{/if}
