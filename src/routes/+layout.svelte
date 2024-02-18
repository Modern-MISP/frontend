<script lang="ts">
  import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
  import { token } from '$lib/api';
  import { settings } from '$lib/stores';
  import { tweened } from 'svelte/motion';

  const progressValue = tweened(0, { duration: 0 });

  const maxProgress = 100;

  beforeNavigate(() => {
    progressValue.set(99, { duration: 200, delay: 100 });
  });

  afterNavigate(() => {
    $progressValue = 0;
  });

  $: if (!$token) goto('/login');
</script>

<!--
  @component
  
  Root layout. Used to apply the theme and render the full application. 
  The theme is based on css variables and [tailwindcss](https://tailwindcss.com/).
  Elements using the proper tailwind classes will be themed automatically according to the current theme when placed in this layout.
  
-->
<svelte:head>
  <title>MMISP</title>
  <meta name="application-name" content="MMISP" />
  <meta name="description" content="Modern MISP Frontend" />
  <meta name="keywords" content="MISP" />
  <meta charset="utf-8" />
</svelte:head>

<body id="layout" class="{$settings.theme} bg-base w-full h-screen flex flex-col">
  <div class="relative w-full h-1 overflow-hidden bg-base">
    <div
      class="h-full w-full bg-sky/80 transition-transform duration-500
        ease-[cubic-bezier(0.65,0,0.35,1)]"
      class:hidden={$progressValue === 0}
      style={`transform: translateX(-${100 - (100 * ($progressValue ?? 0)) / (maxProgress ?? 1)}%)`}
    />
  </div>
  <main class="flex w-full h-full">
    <slot />
  </main>
</body>
