<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import Icon from '@iconify/svelte';

  export let mode: 'view' | 'edit' = 'view';

  export let isOpen = false;
</script>

<div class="flex flex-row items-center justify-between gap-4 p-4 rounded-xl bg-mantle text-text">
  <div class="flex items-center gap-4">
    <button on:click={() => (isOpen = !isOpen)} class="lg:hidden">
      {#if isOpen}
        <Icon icon="mdi:close-circle-outline" class="text-4xl shrink-0" />
      {:else}
        <Icon icon="mdi:menu" class="text-4xl shrink-0" />
      {/if}
    </button>
    <Input placeholder="search">
      <Icon icon="mdi:magnify" slot="icon" class="w-10 h-10" />
    </Input>
  </div>
  <div class="flex items-center gap-6">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="flex flex-col items-center gap-1">
      <Checkbox
        checked={mode === 'edit'}
        on:change={() => (mode = mode === 'view' ? 'edit' : 'view')}
      />
      <span class="text-xs">View mode</span>
    </label>
    <div class="flex flex-col items-center gap-1">
      <div class="text-2xl rounded-full">
        <Icon icon="mdi:account-circle" />
      </div>
      <span class="text-xs">admin@admin.test</span>
    </div>
  </div>
</div>
