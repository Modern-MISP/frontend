<script lang="ts">
  import { goto } from '$app/navigation';
  import { token } from '$lib/api';
  import Button from '$lib/components/button/Button.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import { getFormValues } from '$lib/util/form.util';
  import { api } from '$lib/api';
  import { get } from 'svelte/store';
  import { page } from '$app/stores';
  import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
  import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
  import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'

  const email = $page.params.email;

  const passwordRequirements = [];

  let passwordFeedback: string[] = [];

  let password: string = '';

  const options = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
      userInputs: [email, "MISP"],
    },
  }

  zxcvbnOptions.setOptions(options)

  $: {
    passwordFeedback = zxcvbn(password).feedback.suggestions;
    console.log(passwordFeedback)
  }

  async function submit(event: SubmitEvent) {
    const entries = getFormValues(event);

    console.log("password", password)
    console.log(zxcvbn(entries.password))
    
    if (entries.password !== entries['password-repeat']) {
      alert('Passwords do not match');
      return;
    }

    return;

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
    bind:value={password}
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

  <span class="text-red">
    {#each passwordFeedback as feedback}
      {feedback}
      <br />
    {/each}

  <Button class="py-2 !w-fit self-end text-sky" suffixIcon="mdi:chevron-right" type="submit"
    >continue</Button
  >

  {#if passwordRequirements.length > 0}
    <div class="z-10 px-2 bg-base">Your password musst have:</div>
    <span class="z-10 px-2 text-red">
      {#each passwordRequirements as requirement}
        {requirement}
        <br />
      {/each}
    </span>
  {/if}
</form>
