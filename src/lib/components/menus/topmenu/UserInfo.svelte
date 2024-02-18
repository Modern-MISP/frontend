<script lang="ts">
  import { goto } from '$app/navigation';
  import { token } from '$lib/api';
  import Button from '$lib/components/button/Button.svelte';
  import Info from '$lib/components/info/Info.svelte';
  import Icon from '@iconify/svelte';
  import { createPopover, melt } from '@melt-ui/svelte';

  /**
   * Information about the current user.
   */
  export let userData: { email: string; admin: boolean };

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
<button use:melt={$trigger}>
  {#if userData.admin}
    <Icon icon="mdi:shield-account" width="30" />
  {:else}
    <Icon icon="mdi:account" width="30" />
  {/if}
</button>
{#if $open}
  <div use:melt={$content} class="bg-surface1 text-text rounded-lg p-3">
    <div use:melt={$arrow} />
    <div class="flex flex-col gap-2">
      <Info text={userData.email}></Info>
      <Info text={userData.admin ? 'Administrator account' : 'User account'}></Info>
      <Button
        class="text-red"
        on:click={() => {
          token.set('');
          goto('/login');
        }}
      >
        Log out
      </Button>
    </div>
  </div>
{/if}
