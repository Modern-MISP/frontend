<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import type { Mode } from '$lib/models/Mode';
  import { capitalize } from 'lodash-es';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type ActionBar from './ActionBar.svelte';
  import ActionBarEntryTemplate from './ActionBarEntryTemplate.svelte';
  import Icon from '@iconify/svelte';

  /**
   * The current mode of this Entry.
   */
  export let mode: Mode = 'view';

  /**
   * If true, the mode can't be toggled.
   */
  export let disabled: boolean = false;
</script>

<!--
  @component
  The {@link ActionBar} entry responsible for toggling modes.
-->

<ActionBarEntryTemplate>
  <div class="relative" class:cursor-not-allowed={disabled}>
    <div class:blur-[1px]={disabled}>
      <Checkbox
        {disabled}
        checked={mode === 'edit'}
        on:change={() => (mode = mode === 'view' ? 'edit' : 'view')}
      />
    </div>
    <div
      class="top-0 left-2 absolute text-red drop-shadow-md"
      class:hidden={!disabled}
      title="mode locked"
    >
      <Icon icon="mdi:lock" width="30" />
    </div>
  </div>
  <span slot="label">{capitalize(mode)} mode</span>
</ActionBarEntryTemplate>
