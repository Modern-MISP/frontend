<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import type { Mode as Mode } from '$lib/models/Mode';
  import { capitalize } from 'lodash-es';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type ActionBar from './ActionBar.svelte';

  /**
   * The current mode of this Entry.
   */
  export let mode: Mode = 'view';
</script>

<!--
  @component
  The {@link ActionBar} entry responsible for toggling modes.
-->

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="flex flex-col items-center gap-1">
  <Checkbox
    checked={mode === 'edit'}
    on:change={() => (mode = mode === 'view' ? 'edit' : 'view')}
  />
  <span class="text-xs">{capitalize(mode)} mode</span>
</label>
