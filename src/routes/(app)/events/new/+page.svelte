<script lang="ts">
  import { lockEditMode } from '$lib/actions';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { mode } from '$lib/stores';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import Input from '$lib/components/input/Input.svelte';
  import { notifySave } from '$lib/util/notifications.util';
  import Select from '$lib/components/form/Select.svelte';
  import {
    ANALYSIS_LOOKUP,
    DISTRIBUTION_LOOKUP,
    THREAT_LEVEL_LOOKUP
  } from '$lib/consts/PillLookups';
  import { goto } from '$app/navigation';

  $mode = 'edit';

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api.POST('/events/add', { body: formData }).then((resp) => {
        if (resp.error) {
          throw new Error(
            // @ts-expect-error Wrong error type from OpenAPI spec
            Object.values(resp.error.errors?.Event).at(0)?.at(0) ?? resp.error.message
          );
        } else {
          goto(`/events/${resp.data.Event?.id}`);
        }
      })
    );
  }

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'Date',
      value: () => ({
        display: Input,
        props: {
          type: 'date',
          name: 'date'
        }
      })
    }),
    col({
      label: 'Distribution',
      value: () => ({
        display: Select,
        props: {
          options: DISTRIBUTION_LOOKUP.toSpliced(4, 1).map((x, i) => ({
            label: x.text!,
            value: `${i}`
          })),
          name: 'distribution'
        }
      })
    }),
    col({
      label: 'Threat Level',
      value: () => ({
        display: Select,
        props: {
          options: THREAT_LEVEL_LOOKUP.map((x, i) => ({
            label: x.text!,
            value: `${i + 1}`
          })),
          name: 'threat_level_id'
        }
      })
    }),
    col({
      label: 'Analysis',
      value: () => ({
        display: Select,
        props: {
          options: ANALYSIS_LOOKUP.map((x, i) => ({
            label: x.text!,
            value: `${i}`
          })),
          name: 'analysis'
        }
      })
    }),
    col({
      label: 'Event info',
      value: () => ({
        display: Input,
        props: {
          name: 'info'
        }
      })
    }),
    col({
      label: 'Extends UUID',
      value: () => ({
        display: Input,
        props: {
          name: 'extends_uuid'
        }
      })
    })
  ];
</script>

<svelte:window use:lockEditMode={true} />

<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>
