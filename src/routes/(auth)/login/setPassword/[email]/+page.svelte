<script lang="ts">
  import { goto } from '$app/navigation';
  import { token } from '$lib/api';
  import Button from '$lib/components/button/Button.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import { getFormValues } from '$lib/util/form.util';
  import { api } from '$lib/api';
  import { get } from 'svelte/store';
  import { page } from '$app/stores';

  const passwordRequirements = [
    'At least 8 characters',
    'At least one uppercase letter',
    'At least one lowercase letter',
    'At least one number',
    'At least one special character'
  ];

  async function submit(event: SubmitEvent) {
    const entries = getFormValues(event);
    const email = $page.params.email;
    
    if (entries.password !== entries['password-repeat']) {
      alert('Passwords do not match');
      return;
    }

    // TODO password requirements?
    get(api)
      .POST('/auth/login/setOwnPassword', {
        body: {
          email: email,
          password: entries.password,
          oldPassword: entries['old-password']
        }
      })
      .then((resp) => {
        if (resp.error) {
          // @ts-expect-error MISP API return custom errors object
          if (typeof resp.error.detail === 'string') {
            if (resp.error.detail === 'Bad Request') {
              alert("New password can't contain old Password");
            } else if (resp.error.detail === 'Unauthorized') {
              alert('Old password is incorrect');
            } else {
              throw new Error(resp.error.detail);
            }
          } else if (resp.error.detail != null) {
            throw new Error(resp.error.detail[0].msg);
          }
        } else {
          $token = resp.data.token;
          goto('/events');
        }
      })
  }
</script>

<!-- 
    @component
    Displays the set password page. 
-->
<form
  class="flex flex-col gap-4 m-auto w-80 text-text"
  method="post"
  on:submit|preventDefault={submit}
>
  <h1 class="text-4xl font-bold leading-normal">
    New password
    <hr />
  </h1>

  <Input
    name="old-password"
    placeholder="Old password"
    type="password"
    icon="mdi:lock-outline"
    disabled={false}
  />
  <Input
    name="password"
    placeholder="New password"
    type="password"
    icon="mdi:lock-outline"
    disabled={false}
  />
  <Input
    name="password-repeat"
    placeholder="Repeat new password"
    type="password"
    icon="mdi:lock-outline"
    disabled={false}
  />

  <Button class="py-2 !w-fit self-end text-sky" suffixIcon="mdi:chevron-right" type="submit"
    >continue</Button
  >

  <div class="z-10 px-2 bg-base">Your password musst have:</div>
  <span class="z-10 px-2 text-red">
    {#each passwordRequirements as requirement}
      {requirement}
      <br />
    {/each}
  </span>
</form>
