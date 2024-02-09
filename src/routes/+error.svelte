<script>
  import { page } from '$app/stores';
  import { currentRoute } from '$lib/stores';
  import ErrorPage from './error/ErrorPage.svelte';

  $currentRoute = [
    {
      name: 'Error',
      icon: 'mdi:alert-circle-outline',
      href: '/error'
    }
  ];
</script>

<!-- 
  @component

  If any error occurs inside of a +page.ts [load function](https://kit.svelte.dev/docs/load), this page will be rendered. Handles 403 errors, by showing a link to the login page.

  See: https://kit.svelte.dev/docs/errors
  
 -->
<ErrorPage status={$page.status} message={$page.error?.message ?? ''} />
