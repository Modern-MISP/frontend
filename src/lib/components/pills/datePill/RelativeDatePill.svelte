<script lang="ts">
  import { isAfter, addWeeks } from 'date-fns';
  import DatePill from './DatePill.svelte';

  /**
   * The date of the to be displayed.
   */
  export let date: Date | null;

  /**
   * The text that should be displayed if the date is null.
   */
  export let onNullText = 'Never';

  const today = new Date();
  /**
   * Returns the class that should be applied to the pill. The class is based on a date.
   * - If the date is in the past, the class will be red.
   * - If the date is over one week in the future, the class will be green.
   * - If the date is less then one week in the future, the class will be orange.
   * @param date The date to be checked.
   * @returns The class that should be applied to the pill.
   */
  function getClass(date: Date | null) {
    if (!date) return '!text-green';
    if (isAfter(today, date)) return '!text-red';
    if (isAfter(addWeeks(date, -1), today)) return '!text-green';
    return '!text-peach';
  }
</script>

<DatePill {date} {onNullText} class={getClass(date)} />
