<script lang="ts">
  import { api } from '$lib/api';
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import { get } from 'svelte/store';

  /**
   * Page data
   */
  export let data;
</script>

<!--
  @component
  Displays a list of all events.
  
-->

<ComplexTableLayout
  {...data}
  endpoint={(bodyOptions) =>
    get(api).POST('/events/index', { body: { limit: 50, ...bodyOptions } })}
  fastFilter={[
    {
      label: 'My Organisation',
      icon: 'material-symbols:work-outline',
      ifActive: {
        org: '1'
      }
    },
    {
      label: 'My Events',
      icon: 'mdi:account-circle',
      ifActive: {
        email: 'admin@admin.test'
      }
    }
  ]}
></ComplexTableLayout>
