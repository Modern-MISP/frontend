<script lang="ts">
  import { POST } from '$lib/api';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
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
    return POST('/admin/users/index', { body: x });
  }}
  {...data}
  pagination={false}
  tableHref={(x) => `/admin/users/${x.User?.id}`}
></ComplexTableLayout>
