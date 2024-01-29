<script lang="ts">
  import Button from '$lib/components/button/Button.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import Icon from '@iconify/svelte';
  import { login } from './authMock';
  import { goto } from '$app/navigation';

  let error: string | null = null;

  async function submit({ currentTarget }: SubmitEvent) {
    if (!(currentTarget && currentTarget instanceof HTMLFormElement)) return;

    const data = new FormData(currentTarget);
    const entries = Object.fromEntries(data.entries());
    try {
      const res = await login(entries);
      if (res) {
        localStorage.setItem('authToken', 'Bearer: secür.it.be');
        goto('/events');
      }
    } catch (e) {
      console.warn(e.body.message);
      error = e.body.message;
    }
  }
</script>

<!--
  @component
  Provides a login flow via username and password.
  Stores the generated authentication token in [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage),
  allowing the user to stay logged in after closing the page.
  
-->

<form class="flex flex-col gap-4 m-auto w-80" method="post" on:submit|preventDefault={submit}>
  <h1 class="text-4xl font-bold text-white">
    Login
    <hr />
  </h1>
  <Input name="email" placeholder="Email" icon="mdi:email-outline" />
  <Input name="password" placeholder="Password" icon="mdi:lock-outline" />
  <Button class="py-2 !w-fit self-end gap-2">
    Login
    <Icon icon="mdi:chevron-right" />
  </Button>
  {#if error}
    <div class="text-red">
      {error}
    </div>
  {/if}
</form>
