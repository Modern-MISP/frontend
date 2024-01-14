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
  Displays a date in a pill with the default format. The date format can be configured in the `config.ts` file.
 -->

<Pill icon="mdi:clock" class={clazz}>
  {#if date}
    {format(date, DATE_FORMAT)}
  {:else}
    {onNullText}
  {/if}
</Pill>
