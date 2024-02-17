<script lang="ts">
  import List from '$lib/components/list/List.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import Card from '$lib/components/card/Card.svelte';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import type { PageData } from './$types';
  import { api } from '$lib/api';
  import { notifySave } from '$lib/util/notifications.util';
  import ListEdit from '$lib/components/list/ListEdit.svelte';
  import { mode, notifications } from '$lib/stores';
  import { invalidateAll } from '$app/navigation';
  import { errorPill } from '$lib/util/pill.util';

  /** Data that is displayed on this page. */
  export let data: PageData;

  $: ({ left, key } = data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $: seenIps = (key.AuthKey as any)?.unique_ips ?? [];
  $: allowedIps = key.AuthKey?.allowed_ips;

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api
        .POST('/auth_keys/edit/{authKeyId}', {
          params: { path: { authKeyId: key.AuthKey!.id! } },
          body: { allowed_ips: [], ...formData } // Allow all ips if no override is given
        })
        .then((resp) => {
          if (
            resp.error &&
            'errors' in resp.error &&
            typeof resp.error.errors === 'object' &&
            resp.error.errors
          ) {
            Object.values(resp.error.errors).forEach((error) => {
              notifications.add(errorPill(error));
            });
            throw new Error(resp.error.message);
          }
        })
        .then(invalidateAll)
    );
  }
</script>

<!--
  @component
  Displays information about a specific auth key, specified by `id`.
  
-->
<Form callback={editCallback}>
  <div class="flex flex-wrap w-full h-full gap-2 overflow-auto lg:flex-nowrap">
    <DynCard header={left} data={key} />
    <Card class="relative pt-0">
      <div class="grid grid-cols-2 gap-8">
        <List
          items={seenIps}
          elemClass={(ip) => (!allowedIps || allowedIps.includes(ip) ? 'text-green' : 'text-red')}
          title="Seen Ips:"
        ></List>

        {#if $mode === 'edit'}
          <div>
            <ListEdit items={allowedIps ?? []} title="Allowed Ips:" name="allowed_ips"></ListEdit>
          </div>
        {:else}
          <List items={allowedIps ?? []} title="Allowed Ips:"></List>
        {/if}
      </div>
    </Card>
  </div>
</Form>
