<script lang="ts">
  import { DATE_FORMAT } from '$lib/components/config';
  import { format } from 'date-fns';
  import Pill from '../pill/Pill.svelte';

  /**
   * The date of the to be displayed.
   */
  export let date: Date | null;

  /**
   * The text that should be displayed if the date is null.
   */
  export let onNullText = 'No date';

  let clazz = '';
  /**
   * Class that should be applied to the pill.
   */
  export { clazz as class };
</script>

<!-- 
  @component
  Displays a date in a pill. The color of the pill is based on the date.
  - If the date is in the past, the pill will be red.
  - If the date is over one week in the future, the pill will be green.
  - If the date is less then one week in the future, the pill will be orange.
 -->

<Pill icon="mdi:clock" class={clazz}>
  {#if date}
    {format(date, DATE_FORMAT)}
  {:else}
    {onNullText}
  {/if}
</Pill>
