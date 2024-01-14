<script>
  import { settings } from '$lib/stores';
</script>

<!--
  @component
  
  Root layout. Used to apply the theme and render the full application. 
  The theme works with css variables and tailwind. Basically you can apply ever class from  
{@link https://github.com/catppuccin/tailwindcss} to any element, and the theme will change the colors with css variables.
  
-->
<body class="{$settings.theme} bg-base w-full h-[100vh] flex">
  <slot />
</body>
