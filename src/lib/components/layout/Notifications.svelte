<script lang="ts">
  import { notifications } from '$lib/stores';
  import Pill from '../pills/pill/Pill.svelte';
</script>

{#if $notifications.length > 0}
  <div class="absolute top-0 right-0 z-50 flex flex-col gap-2">
    {#each $notifications as notification}
      <button on:click={() => notifications.remove(notification)} class="h-12">
        <Pill {...notification} class="h-full shadow-xl {notification.class}"></Pill>
      </button>
    {/each}
  </div>
{/if}
