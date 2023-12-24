<script lang="ts">
  import { addWeeks, format, isAfter } from 'date-fns';
  import Pill from '../pill/Pill.svelte';
  import { DATE_FORMAT } from '$lib/components/config';

  /**
   * The date of the to be displayed.
   */
  export let date: Date;
  const today = new Date();

  /**
   * Returns the class that should be applied to the pill. The class is based on a date.
   * - If the date is in the past, the class will be red.
   * - If the date is over one week in the future, the class will be green.
   * - If the date is less then one week in the future, the class will be orange.
   * @param date The date to be checked.
   * @returns The class that should be applied to the pill.
   */
  function getClass(date: Date) {
    if (isAfter(today, date)) return '!text-red';
    if (isAfter(addWeeks(date, -1), today)) return '!text-green';
    return '!text-peach';
  }
</script>

<!-- 
  @component
  Displays a date in a pill. The color of the pill is based on the date.
  - If the date is in the past, the pill will be red.
  - If the date is over one week in the future, the pill will be green.
  - If the date is less then one week in the future, the pill will be orange.
 -->

<Pill icon="mdi:clock" class={getClass(date)}>
  {format(date, DATE_FORMAT)}
</Pill>
