<script lang="ts" generics="T extends Enabled">
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { Enabled } from './Enabled.interface';

  import ActiveEntry from '$lib/components/menus/topmenu/actionbar/ActiveEntry.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';

  import { findKey, values } from 'lodash-es';

  /**
   * any array that extends Enabled ({enabled: boolean})
   */
  export let data: T[];

  /**
   * Filtered data
   */
  export let filtered: T[];

  let filter = { all: true, enabled: false, disabled: false };

  $: filtered = data.filter(
    (x) => filter.all || (filter.enabled && x.enabled) || (filter.disabled && !x.enabled)
  );

  let lastFilter: keyof typeof filter = 'all';

  $: if (values(filter).filter(Boolean).length > 1) {
    filter[lastFilter] = false;
    lastFilter = (findKey(filter, Boolean) as keyof typeof filter) ?? 'all';
  } else {
    filter[lastFilter] = true;
  }
</script>

<ActionCard>
  <ActiveEntry label="All" icon="mdi:all-inclusive" bind:active={filter.all}></ActiveEntry>
  <ActiveEntry label="Enabled" icon="mdi:checkbox-outline" bind:active={filter.enabled}
  ></ActiveEntry>
  <ActiveEntry label="Disabled" icon="mdi:close-box-outline" bind:active={filter.disabled}
  ></ActiveEntry>
</ActionCard>
