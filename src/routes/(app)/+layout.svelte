<script lang="ts">
  import { page } from '$app/stores';
  import Layout from '$lib/components/layout/Layout.svelte';
  import { currentRoute } from '$lib/stores';
  import { routes } from './routes';

  const idEntry = (name: string) => ({
    name,
    icon: 'mdi:id-card',
    href: './'
  });

  /**
   * Add all routes from {@link "./routes.ts"} that are included in the current url. If the route has a id parameter also include the id
   */
  $: $currentRoute = [
    ...routes
      .flatMap((x) => [x, ...(x.children || [])])
      .filter(({ href }) => $page.url.href.includes(href)),
    ...($page.params.id ? [idEntry($page.params.id)] : [])
  ];
</script>

<!--
  @component
  App Layout. Used for all routes besides [`/login`](pages.md#/login).
  Contains the {@link Layout} component, in which each page's content is inserted into via the component's default slot.
  
-->

<Layout {routes} currentRoute={$currentRoute}>
  <slot /></Layout
>
