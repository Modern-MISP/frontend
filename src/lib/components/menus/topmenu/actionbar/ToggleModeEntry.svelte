<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import type { Mode } from '$lib/models/Mode';
  import { capitalize } from 'lodash-es';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type ActionBar from './ActionBar.svelte';
  import ActionBarEntryTemplate from './ActionBarEntryTemplate.svelte';

  /**
   * The current mode of this Entry.
   */
  export let mode: Mode = 'view';
</script>

<!--
  @component
  The {@link ActionBar} entry responsible for toggling modes.
-->

<ActionBarEntryTemplate>
  <Checkbox
    checked={mode === 'edit'}
    on:change={() => (mode = mode === 'view' ? 'edit' : 'view')}
  />
  <span slot="label">{capitalize(mode)} mode</span>
</ActionBarEntryTemplate>
