<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { api } from '$lib/api';
  import type { components } from '$lib/api/misp';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import { appState } from '$lib/stores.svelte.ts';
  import { notifySave } from '$lib/util/notifications.util';
  import type { PageData } from '../$types';
  import type { EventState } from './EventState.interface';
  import { header } from './formHeaders';

  interface Props {
    /**
     * Page data containing the data of the event with the id in the url
     */
    data: PageData;
    /**
     * Event state
     */
    state?: EventState;
    add?: import('svelte').Snippet;
    create?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  }

  let { data, state = 'info', add, create, children }: Props = $props();

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
      {#if state === 'add' && appState.mode === 'edit'}
        {@render add?.()}
      {:else if state === 'create' && appState.mode === 'edit'}
        {@render create?.()}
      {:else}
        <section class="h-full overflow-auto">
          <DynCard data={data.event} {header} />
        </section>
      {/if}
      <section class="h-full overflow-hidden">
        {@render children?.()}
      </section>
    </div>
  </Form>
</div>
