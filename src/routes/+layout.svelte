<script>
  import { settings } from '$lib/stores';
</script>

<body class="{$settings.theme} bg-base w-full h-[100vh] flex">
  <slot />
</body>
