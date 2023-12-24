<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte';
  import { themes } from '$lib/stores';
  import { addDays, addWeeks } from 'date-fns';
  import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
  export let Hst: Hst;

  let olderThenWeek = addWeeks(new Date(), 2);

  let expired = addDays(new Date(), -1);

  let warning = addDays(new Date(), 1);

  let theme = 'macchiato';
</script>

<Hst.Story>
  <svelte:fragment slot="controls">
    <Hst.Select title="Theme" bind:value={theme} options={themes} />
  </svelte:fragment>

  <div class={theme}>
    <div class="flex flex-col gap-2">
      <DatePill date={olderThenWeek} />
      <DatePill date={expired} />
      <DatePill date={warning} />
    </div>
  </div>
</Hst.Story>
