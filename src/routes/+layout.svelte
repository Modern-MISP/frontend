<script>
  import { settings } from '$lib/stores';
</script>

<!--
  @component
  
  Root layout.
  
-->
<body class="{$settings.theme} bg-base w-full h-[100vh] flex">
  <slot />
</body>
