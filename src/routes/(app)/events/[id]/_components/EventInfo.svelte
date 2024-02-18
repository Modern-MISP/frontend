<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { api } from '$lib/api';
  import type { components } from '$lib/api/misp';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { mode } from '$lib/stores';
  import { notifySave } from '$lib/util/notifications.util';
  import type { PageData } from '../$types';
  import type { EventState } from './EventState.interface';
  import { header } from './formHeaders';

  /**
   * Page data containing the data of the event with the id in the url
   */
  export let data: PageData;

  /**
   * Event state
   */
  export let state: EventState = 'info';

  async function formCallback(formData: Record<string, string>) {
    notifySave(
      $api
        .PUT('/events/edit/{eventId}', {
          params: { path: { eventId: data!.event.id! } },
          body: formData as components['requestBodies']['EditEventRequest']['content']['application/json']
        })
        .then((resp) => {
          if (resp.error) {
            let mispError: string | undefined = undefined;
            // @ts-expect-error MISP API returns custom errors object
            const mispErrors = resp.error.errors;
            if (typeof mispErrors === 'object') {
              const errorValues: string[] = Object.values(mispErrors ?? {});
              mispError = errorValues.length ? errorValues[0] : undefined;
            } else if (typeof mispErrors === 'string') {
              mispError = mispErrors;
            }
            throw new Error(mispError ?? resp.error.message);
          }
        })
        .then(invalidateAll),
      'Event updated successfully!'
    );
  }
</script>

<div class="h-full overflow-auto">
  <Form callback={formCallback}>
    <div class="grid h-full grid-cols-2 gap-2 lg:flex-nowrap">
      {#if state === 'add' && $mode === 'edit'}
        <slot name="add" />
      {:else if state === 'create' && $mode === 'edit'}
        <slot name="create" />
      {:else}
        <section class="h-full">
          <DynCard data={data.event} {header} />
        </section>
      {/if}
      <section class="h-full overflow-hidden">
        <slot />
      </section>
    </div>
  </Form>
</div>
