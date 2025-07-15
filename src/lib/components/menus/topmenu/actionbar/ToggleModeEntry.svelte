<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import type { Mode } from '$lib/models/Mode';
  import { appState } from '$lib/stores.svelte.ts';
  import { capitalize } from 'lodash-es';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type ActionBar from './ActionBar.svelte';
  import ActionBarEntryTemplate from './ActionBarEntryTemplate.svelte';
  import Icon from '@iconify/svelte';

  interface Props {
    /**
     * If true, the mode can't be toggled.
     */
    disabled?: boolean;
  }

  let { disabled = false }: Props = $props();
</script>

<!--
  @component
  The {@link ActionBar} entry responsible for toggling modes.
-->

<ActionBarEntryTemplate>
  <div class="relative" class:cursor-not-allowed={disabled}>
    <div class:blur-[1px]={disabled}>
      <Checkbox {disabled} checked={appState.mode === 'edit'} on:change={appState.toggleMode} />
    </div>
    <div
      class="top-0 left-2 absolute text-ctp-red drop-shadow-md"
      class:hidden={!disabled}
      title="mode locked"
    >
      <Icon icon="mdi:lock" width="30" />
    </div>
  </div>
  {#snippet label()}
    <span>{capitalize(appState.mode)} mode</span>
  {/snippet}
</ActionBarEntryTemplate>
