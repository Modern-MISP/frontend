<script lang="ts">
  import List from '$lib/components/list/List.svelte';

  import Card from '$lib/components/card/Card.svelte';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import type { PageData } from './$types';

  /** Data that is displayed on this page. */
  export let data: PageData;

  const { left, key } = data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seenIps = (key.AuthKey as any)?.unique_ips ?? [];
  const allowedIps = key.AuthKey?.allowed_ips;
  console.log(key);
</script>

<!--
  @component
  Displays information about a specific auth key, specified by `id`.
  
-->
<div class="flex flex-wrap w-full gap-2 overflow-auto lg:flex-nowrap">
  <DynCard header={left} data={key} />
  <Card class="relative pt-0">
    <div class="grid grid-cols-2">
      <List
        items={seenIps}
        elemClass={(ip) => (!allowedIps || allowedIps.includes(ip) ? 'text-green' : 'text-red')}
        title="Seen Ips:"
      ></List>

      <List items={allowedIps ?? []} title="Allowed Ips:"></List>
    </div>
  </Card>
</div>
