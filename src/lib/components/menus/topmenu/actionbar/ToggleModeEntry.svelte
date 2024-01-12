<script lang="ts">
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import { capitalize } from 'lodash-es';

  /**
   * The current mode of this Entry.
   */
  export let mode: 'view' | 'edit' = 'view';
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="flex flex-col items-center gap-1">
  <Checkbox
    checked={mode === 'edit'}
    on:change={() => (mode = mode === 'view' ? 'edit' : 'view')}
  />
  <span class="text-xs">{capitalize(mode)} mode</span>
</label>
