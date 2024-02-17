<script lang="ts">
  import { goto } from '$app/navigation';
  import { PUBLIC_MISP_KEY } from '$env/static/public';
  import { token } from '$lib/api';
  import Button from '$lib/components/button/Button.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import { getFormValues } from '$lib/util/form.util';
  import { login } from './authMock';

  let error: string = '';

  async function submit(event: SubmitEvent) {
    const entries = getFormValues(event);

    if (entries.token) {
      $token = entries.token;
      goto('/events');
      return;
    }

    try {
      const res = await login(entries as { email: string; password: string }); // Can not get the form builder type safe
      if (res) {
        $token = PUBLIC_MISP_KEY;
        goto('/events');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
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

<form
  class="flex flex-col gap-4 m-auto w-80 text-text"
  method="post"
  on:submit|preventDefault={submit}
>
  <h1 class="text-4xl font-bold leading-normal">
    Login
    <hr />
  </h1>
  <Input name="email" placeholder="Email" icon="mdi:email-outline" />
  <Input name="password" placeholder="Password" type="password" icon="mdi:lock-outline" />

  <div class="relative flex items-center justify-center">
    <hr class="absolute w-full" />

    <div class="z-10 px-2 bg-base">or</div>
  </div>

  <Input name="token" placeholder="Token" icon="mdi:key-outline" />
  <Button class="py-2 !w-fit self-end text-sky" suffixIcon="mdi:chevron-right" type="submit"
    >Login</Button
  >
  <span class="h-12 text-red">
    {error}
  </span>
</form>
