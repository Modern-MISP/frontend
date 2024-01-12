<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import CardRow from '$lib/components/card/CardRow.svelte';

  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import DatePill from '$lib/components/pills/datePill/DatePill.svelte';
  import HrefPill from '$lib/components/pills/hrefPill/HrefPill.svelte';
  import LookupPill from '$lib/components/pills/lookupPill/LookupPill.svelte';
  import Pill from '$lib/components/pills/pill/Pill.svelte';
  import { createTableHeadGenerator } from '$lib/components/table/TableBuilder';
  import {
    ANALYSIS_LOOKUP,
    DISTRIBUTION_LOOKUP,
    THREAT_LEVEL_LOOKUP
  } from '$lib/consts/PillLookups';
  import type { PageData } from './$types';

  /**
   * Page data containing the data of the event with the id in the url
   */
  export let data: PageData;

  let { event } = data;

  const col = createTableHeadGenerator<typeof event>();

  const infoHeader = [
    col({
      key: 'info',
      label: 'Info',
      display: Input,
      value: (x) => ({
        value: x?.info ?? '',
        name: 'info',
        placeholder: "Enter the event's info"
      })
    }),
    col({
      label: 'Threat Level',
      display: Select,
      value: (x) => ({
        value: '' + (+(x?.threat_level_id ?? 1) - 1),
        options: THREAT_LEVEL_LOOKUP.map((x, i) => ({ label: x.text ?? 'unknown', value: '' + i }))
      })
    }),
    col({
      label: 'Analysis',
      display: LookupPill,
      value: (x) => ({
        value: +(x?.analysis ?? 1),
        options: ANALYSIS_LOOKUP
      })
    }),
    col({
      label: 'Published',
      display: Checkbox,
      value: (x) => ({
        checked: x?.published ?? false,
        name: 'published'
      })
    }),
    col({
      label: 'Date',
      display: DatePill,
      value: (x) => ({
        date: x?.date ? new Date(x.date) : null
      })
    }),
    col({
      label: 'Creator user',
      display: HrefPill,
      value: (x) => ({
        href: 'mailto:' + x?.event_creator_email,
        text: x?.event_creator_email,
        icon: 'mdi:account-outline'
      })
    }),
    col({
      label: 'Creator Org',
      display: Pill,
      value: (x) => ({
        text: x?.Orgc?.name,
        icon: 'material-symbols:work-outline'
      })
    }),
    col({
      label: 'Owner Org',
      display: Pill,
      value: (x) => ({
        text: x?.Org?.name,
        icon: 'material-symbols:work-outline'
      })
    }),
    col({ label: 'ID', value: (x) => x?.id ?? 'unknown' }),
    col({ label: 'UUID', value: (x) => x?.uuid ?? 'unknown' }),
    col({
      label: 'Distribution',
      display: LookupPill,
      value: (x) => ({
        value: +(x?.distribution ?? 1),
        options: DISTRIBUTION_LOOKUP
      })
    }),
    col({
      label: 'Attribute Count',
      value: (x) =>
        `${(x?.Attribute?.length ?? 0) + (x?.Object?.length ?? 0)} (${
          x?.Object?.length ?? 0
        } Objects)`
    }),

    col({ label: 'Extends UUID', value: (x) => x?.extends_uuid || 'none' })
  ];
  console.log(event);
  let form: HTMLFormElement;
  $: if (form) console.log(new FormData(form));

  const submit = ({ currentTarget }: SubmitEvent) => {
    if (!(currentTarget && currentTarget instanceof HTMLFormElement)) return;

    const data = new FormData(currentTarget);
    console.log(data);
  };
</script>

<form bind:this={form} on:submit|preventDefault={submit}>
  <input type="text" name="test" />
  <Card class="gap-4">
    {#each infoHeader as { label, value, display }}
      <CardRow class="gap-2">
        <span class="font-bold">{label}</span>
        {#if display}
          <svelte:component this={display} {...value(event)} />
        {:else}
          <span>{value(event)}</span>
        {/if}
      </CardRow>
    {/each}
  </Card>
</form>

<button on:click={() => form.requestSubmit()}>Submit</button>
