<script lang="ts">
  import { goto } from '$app/navigation';
  import { token } from '$lib/api';
  import Button from '$lib/components/button/Button.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import { getFormValues } from '$lib/util/form.util';
  import { api } from '$lib/api';
  import { get } from 'svelte/store';
  import { page } from '$app/stores';
  import { zxcvbnAsync, zxcvbnOptions, debounce } from '@zxcvbn-ts/core';
  import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
  import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
  import { matcherPwnedFactory } from '@zxcvbn-ts/matcher-pwned';

  const email = $page.params.email;

  let passwordFeedback: string[] = [];

  let password: string = '';
  let retypedPassword: string = '';
  let oldPassword: string = '';
  const debouncedZxcvbn = debounce(getPasswordFeedback, 200);

  $: {
    password;
    retypedPassword;
    debouncedZxcvbn();
  }

  function getPasswordFeedback() {
    zxcvbnAsync(password, [oldPassword]).then((result) => {
      let feedback: string[] = [];
      if (result.feedback.warning) {
        feedback = [result.feedback.warning];
      } else if (result.feedback.suggestions.length > 0) {
        feedback = result.feedback.suggestions;
      } else if (password != retypedPassword) {
        feedback = ['New Password and Repeat Password do not match'];
      }
      passwordFeedback = feedback;
    }).catch( (err) => console.error(err));
  }

  const options = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    useLevenshteinDistance: true,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
      userInputs: [email, 'MISP']
    }
  };
  const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
  zxcvbnOptions.addMatcher('pwned', matcherPwned);
  zxcvbnOptions.setOptions(options);

  async function submit(event: SubmitEvent) {
    const entries = getFormValues(event);

    if (entries.password != entries['password-repeat']) {
      alert('Passwords do not match');
      return;
    }

    if (passwordFeedback.length > 0) {
      alert(passwordFeedback.join('\n'));
      return;
    }

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
          // ts-expect-error MISP API return custom errors object
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
      });
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
    on:value={(input) => (oldPassword = input.detail)}
    name="old-password"
    placeholder="Old password"
    type="password"
    icon="mdi:lock-outline"
    disabled={false}
  />
  <Input
    on:value={(input) => (password = input.detail)}
    name="password"
    placeholder="New password"
    type="password"
    icon="mdi:lock-outline"
    disabled={false}
  />
  <Input
    on:value={(input) => (retypedPassword = input.detail)}
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
  </span>
</form>
