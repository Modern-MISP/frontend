<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import { api } from '$lib/api';
  import { get } from 'svelte/store';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<!--
  @component
  Displays a list of all users of the instance.
  
-->
<ComplexTableLayout
  endpoint={(x) => {
    // @ts-expect-error Not in the OpenAPI spec.. great. AND not even implemented wtf...
    return get(api).POST('/admin/users/index', { body: x });
  }}
  {...data}
  pagination={false}
  topMenuActions={[
    {
      icon: 'mdi:plus',
      label: 'Add User',
      action: '/admin/users/new'
    }
  ]}
  tableHref={(x) => `/admin/users/${x.User?.id}`}
></ComplexTableLayout>
