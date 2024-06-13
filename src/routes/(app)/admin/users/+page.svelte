<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import type { PageData } from './$types';

  /**Page data containing data of the users table.*/
  export let data: PageData;
</script>

<!--
  @component
  Displays a list of all users of the instance.
  
-->
<ComplexTableLayout {...data} tableHref={(x) => `/admin/users/${x.User?.id}`}></ComplexTableLayout>
