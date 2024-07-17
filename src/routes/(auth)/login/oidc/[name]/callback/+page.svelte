<script lang="ts">
  import { goto } from '$app/navigation';
  import { token } from '$lib/api';

  export let data;
  $token = data.token;
  goto('/events');
</script>
