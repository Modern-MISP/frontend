<script lang="ts">
  import { page } from '$app/stores';
  import { addContextInfo, lockViewMode } from '$lib/actions';
  import Layout from '$lib/components/layout/Layout.svelte';
  import { currentRoute, contextRouteEntries, notifications, mode } from '$lib/stores';
  import { routes } from './routes';
  import { beforeNavigate, goto } from '$app/navigation';
  import { errorPill } from '$lib/util/pill.util';
  import type { Tweened } from 'svelte/motion';

  export let data;

  export let progressValue: Tweened<number>;

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

  beforeNavigate(({ cancel, to }) => {
    // This can only access statically defined routes in ./routes.ts,
    // not the dynamically defined $currentRoute additions that exist across the codebase.
    // The problem is that $currentRoute isn't updated yet in beforeNavigate if the change gets
    // applied in the +page.svelte of the route.
    const userAccess = routes
      .flatMap((r) => [r, ...(r.children ?? [])])
      ?.findLast((r) => to?.url.pathname.startsWith(r.href))?.userAccess;
    if (userAccess === 'none' && !data.admin) {
      notifications.add(errorPill('Access restricted to administrators'));
      cancel();
      progressValue.set(0, { duration: 0 });
    }
  });

  // Get "most specific" route
  $: userAccess = $currentRoute?.at(-1)?.userAccess;

  // This should only be called when loading a restricted route directly via the URL,
  // otherwise the beforeNavigation always gets called first.
  $: if (userAccess === 'none' && !data.admin) {
    notifications.add(errorPill('Access restricted to administrators'));
    goto('/events');
  }

  // Set the mode to view mode if edit mode is restricted, and lock view mode further below.
  $: editModeRestricted = userAccess === 'viewOnly' && !data.admin;
  $: if (editModeRestricted) {
    $mode = 'view';
  }
</script>

<!--
  @component
  App Layout. Used for all routes besides [`/login`](pages.md#/login).
  Contains the {@link Layout} component, in which each page's content is inserted into via the component's default slot.
  
-->
<svelte:window
  use:lockViewMode={data.cfg.MAINTENANCE_MODE || editModeRestricted}
  use:addContextInfo={{
    message: data.cfg.MAINTENANCE_MESSAGE,
    condition: data.cfg.MAINTENANCE_MODE
  }}
  use:addContextInfo={{
    message: 'Edit mode is restricted to administrators',
    condition: editModeRestricted
  }}
/>
<Layout {routes} currentRoute={$currentRoute} contextRoutes={$contextRouteEntries} userData={data}>
  <slot />
</Layout>
