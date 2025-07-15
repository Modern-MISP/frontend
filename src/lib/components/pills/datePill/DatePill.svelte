<script lang="ts">
  import { DATE_FORMAT } from '$lib/components/config';
  import { format } from 'date-fns';
  import Pill from '../pill/Pill.svelte';

  interface Props {
    /**
     * The date of the to be displayed.
     */
    date: Date | null;
    /**
     * The text that should be displayed if the date is null.
     */
    onNullText?: string;
    /**
     * Label of the DatePill
     */
    label?: string | undefined;
    /**
     * Icon of the pill, defaults to a clock
     */
    icon?: string | undefined;
    class?: string;
  }

  let {
    date,
    onNullText = 'No date',
    label = undefined,
    icon = 'mdi:clock',
    class: clazz = ''
  }: Props = $props();
  /**
   * Class that should be applied to the pill.
   */
</script>

<!--
  @component
  Displays a date in a pill with the default format. The date format can be configured in the `config.ts` file.
 -->

<Pill {icon} class={clazz} {label}>
  {#if date}
    {#if date.getTime() === new Date('1970-01-01').getTime()}
      No Date
    {:else}
      {format(date, DATE_FORMAT)}
    {/if}
  {:else}
    {onNullText}
  {/if}
</Pill>
