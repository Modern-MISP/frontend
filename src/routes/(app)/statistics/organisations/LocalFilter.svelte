<script lang="ts" generics="T extends Local">
  import { run } from 'svelte/legacy';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { Local } from './Local.interface';

  import ActiveEntry from '$lib/components/menus/topmenu/actionbar/ActiveEntry.svelte';
  import ActionCard from '$lib/components/table/actions/card/ActionCard.svelte';

  import { findKey, values } from 'lodash-es';

  interface Props {
    /**
     * any array that extends Local ({local: boolean})
     */
    data: T[];
    /**
     * Filtered data
     */
    filtered: T[];
  }

  let { data, filtered = $bindable() }: Props = $props();

  let filter = $state({ all: true, enabled: false, disabled: false });

  run(() => {
    filtered = data.filter(
      (x) => filter.all || (filter.enabled && x.local) || (filter.disabled && !x.local)
    );
  });

  let lastFilter: keyof typeof filter = $state('all');

  run(() => {
    if (values(filter).filter(Boolean).length > 1) {
      filter[lastFilter] = false;
      lastFilter = (findKey(filter, Boolean) as keyof typeof filter) ?? 'all';
    } else {
      filter[lastFilter] = true;
    }
  });
</script>

<ActionCard>
  <ActiveEntry label="All" icon="mdi:all-inclusive" bind:active={filter.all}></ActiveEntry>
  <ActiveEntry label="Local Organisations" icon="mdi:checkbox-outline" bind:active={filter.enabled}
  ></ActiveEntry>
  <ActiveEntry
    label="Remote Organisations"
    icon="mdi:close-box-outline"
    bind:active={filter.disabled}
  ></ActiveEntry>
</ActionCard>
