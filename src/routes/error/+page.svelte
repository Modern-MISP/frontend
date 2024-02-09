<script lang="ts">
  import { page } from '$app/stores';
  import { currentRoute } from '$lib/stores';
  import { objectHasOwn } from 'ts-extras';
  import ErrorPage from './ErrorPage.svelte';

  let status: number;
  let message: string;

  if (!objectHasOwn($page.state, 'status')) {
    // no actual error has been set
    status = 418;
    message = "I'm a teapot.";
  } else {
    status = $page.state.status as number;
    message = objectHasOwn($page.state, 'message') ? ($page.state.message as string) : '';
  }

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

  This page can be used for error propagation, since SvelteKit lacks built-in error escalation.
  -->
<ErrorPage {status} {message} />
