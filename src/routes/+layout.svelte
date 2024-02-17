<script>
  import { settings } from '$lib/stores';
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
<body id="layout" class="{$settings.theme} bg-base w-full h-[100vh] flex">
  <slot />
</body>
