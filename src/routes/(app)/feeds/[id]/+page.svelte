<script lang="ts">
  import { page } from '$app/stores';
  import { actionBar } from '$lib/actions';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import { notifySave } from '$lib/util/notifications.util';
  import type { PageData } from './$types';

  /** Page data containing the data of the feed */
  export let data: PageData;
</script>

<!--
  @component
  
  Information about a feed specified by 'id'.

-->

<div class="w-full lg:w-5/6 xl:w-1/2">
  <DynCard header={data.header} data={data.data} />
</div>

<svelte:window
  use:actionBar={[
    {
      label: 'Pull Feed',
      icon: 'mdi:download',
      action: () => {
        notifySave(
          $api
            .POST('/feeds/fetchFromFeed/{feedId}', {
              params: { path: { feedId: $page.params.id } }
            })
            .then((resp) => {
              if (resp.error) throw new Error(resp.error.message);
            })
        );
      }
    }
  ]}
/>
