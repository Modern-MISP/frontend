<script lang="ts">
  import { goto } from '$app/navigation';
  import { token } from '$lib/api';
  import Button from '$lib/components/button/Button.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import { getFormValues } from '$lib/util/form.util';
  import { compatibility } from '$lib/stores';
  import OidcButton from '$lib/components/button/oidcButton/OidcButton.svelte';
  import { onMount } from 'svelte';
  import { forEach } from 'lodash-es';
  import { api } from '$lib/api';
  import { get } from 'svelte/store';

  let error: string = '';

  async function submit(event: SubmitEvent) {
    const entries = getFormValues(event);

    if (entries.token) {
      $token = entries.token;
      goto('/events');
      return;
    } else if (entries.email && entries.password) {
      get(api)
        .POST('/auth/login/password', {
          body: {
            email: entries.email,
            password: entries.password
          }
        })
        .then((resp) => {
          if (resp.error) {
            if (typeof resp.error.detail === 'string') {
              if (resp.error.detail === 'Forbidden') {
                goto(`/login/setPassword/${entries.email}`);
              } else {
                error =
                  'Wrong password or email address. Try again or click Forgot password? to reset it.';
                throw new Error(resp.error.detail);
              }
            } else if (resp.error.detail != null) {
              error =
                'Wrong password or email address. Try again or click Forgot password? to reset it.';
              throw new Error(resp.error.detail[0].msg);
            }
          } else {
            $token = resp.data.token;
            goto('/events');
          }
        });
    }
  }

  const visible = !compatibility;
  let oidc = true;

  const data = [
    {
      id: '1',
      name: 'Google'
    },
    {
      id: '2',
      name: 'Facebook'
    },
    {
      id: '3',
      name: 'Illias'
    }
  ];

  onMount(() => {
    if (data.length === 0) oidc = false;
    if (!visible) oidc = false;
    if (!oidc) return;
    forEach(data, (item) => {
      new OidcButton({
        target: document.querySelector('.oidc') ?? document,
        props: {
          name: item.name,
          id: item.id
        }
      });
    });
  });

  function forgot_password() {
    alert('Please Contact your Administrator to reset your password.');
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

  {#if visible}
    <Input name="email" placeholder="Email" icon="mdi:email-outline" disabled={false} />
    <Input
      name="password"
      placeholder="Password"
      type="password"
      icon="mdi:lock-outline"
      disabled={false}
    />

    <div class="flex">
      <a
        on:click={forgot_password}
        href="/login"
        class="text-sky"
        style="text-decoration: underline;">Forgot password?</a
      >
    </div>

    {#if error}
      <span class="h-12 text-red">
        {error}
      </span>
    {/if}

    <div class="relative flex items-center justify-center">
      <hr class="absolute w-full" />

      <div class="z-10 px-2 bg-base">or</div>
    </div>
  {/if}
  {#if oidc}
    <div class="oidc flex w-80"></div>

    <div class="relative flex items-center justify-center">
      <hr class="absolute w-full" />

      <div class="z-10 px-2 bg-base">or</div>
    </div>
  {/if}

  <Input name="token" placeholder="Token" icon="mdi:key-outline" />
  <Button class="py-2 !w-fit self-end text-sky" suffixIcon="mdi:chevron-right" type="submit"
    >Login</Button
  >
</form>

<style>
  .oidc {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
