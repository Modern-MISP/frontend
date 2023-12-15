<script>
  import { goto } from '$app/navigation';

  goto('/galaxy/list', { replaceState: true });
</script>

<div class="flex flex-col gap-4 text-sky">
  <a href="/galaxy/edit">Edit</a>
  <a href="/galaxy/view">View</a>
</div>
