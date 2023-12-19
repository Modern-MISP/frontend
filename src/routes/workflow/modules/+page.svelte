<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  goto(`${$page.url}/list`, { replaceState: true });
</script>
