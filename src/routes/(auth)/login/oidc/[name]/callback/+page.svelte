<script lang="ts">
  import { goto } from '$app/navigation';
  import { token } from '$lib/api';

  let { data } = $props();
  $token = data.token;
  goto('/events');
</script>
