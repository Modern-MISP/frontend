<script lang="ts">
  import { goto } from '$app/navigation';
  import { lockEditMode } from '$lib/actions.js';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import Input from '$lib/components/input/Input.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute, mode, notifications } from '$lib/stores.js';
  import { notifySave } from '$lib/util/notifications.util';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import InputWithCheckbox from '$lib/components/inputWithCheckbox/InputWithCheckbox.svelte';
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';

  /** Page data */
  export let data;

  $mode = 'edit';

  const authKeyStore = writable('');

  function showPopup(authKey) {
    authKeyStore.set(authKey);
    const popup = document.getElementById('authkey-popup');
    if (popup) popup.style.display = 'block';
  }

  function closePopup() {
    const popup = document.getElementById('authkey-popup');
    if (popup) popup.style.display = 'none';
    notifications.add({
      text: `Key added successfully`
    });
    goto(`/admin/keys/`);
  }

  function editCallback(formData: Record<string, string>) {
    notifySave(
      $api
        .POST('/auth_keys/add/{userId}', {
          body: formData,
          params: { path: { userId: formData.user_id } }
        })
        .then((resp) => {
          if (resp.error) {
            // throw new Error(resp.error.message);
            // @ts-expect-error MISP API return custom errors object
            const mispErrors: string[] = Object.values(resp.error.errors ?? {});
            throw new Error(mispErrors.length ? mispErrors[0] : resp.error.message);
          } else {
            const authKey = resp.data.AuthKey?.authkey_raw;
            showPopup(authKey);
          }
        })
    );
  }

  const col = createTableHeadGenerator();

  const header = [
    col({
      label: 'User',
      value: () => ({
        display: Select,
        props: {
          options: data.users.map((u) => ({ label: u.User!.email!, value: u.User!.id! })),
          value: data.users.find((u) => u.User!.id == $page.url.searchParams.get('id'))?.User!.id,
          name: 'user_id'
        }
      })
    }),
    col({
      label: 'Read only',
      value: () => ({
        display: Checkbox,
        props: { name: 'read_only', checked: false }
      })
    }),
    col({
      label: 'Expiration',
      value: () => ({
        display: InputWithCheckbox,
        props: {
          checked: false,
          inputProps: {
            value: undefined,
            name: 'expiration',
            type: 'Date'
          }
        }
      })
    }),
    col({
      label: 'Comment',
      value: () => ({
        display: Input,
        props: { name: 'comment' }
      })
    })
  ];

  $: $currentRoute = [
    ...($currentRoute ?? []),
    { name: 'New Key', icon: 'mdi:key-add', href: 'new' }
  ];
</script>

<svelte:window use:lockEditMode={true} />

<!--
  @component
  Displays the form for creating a new key.
-->
<Form callback={editCallback}>
  <DynCard {header} data={{}}></DynCard>
</Form>

<!-- Auth Key Popup -->
<div id="authkey-popup" class="popup">
  <div class="popup-content">
    <p>
      Please make sure that you note down the auth key below, this is the only time the auth key is
      shown in plain text, so make sure you save it. If you lose the key, simply remove the entry
      and generate a new one.
    </p>
    <p><strong>{$authKeyStore}</strong></p>
    <button on:click={closePopup} class="save-button">I have noted down my key</button>
  </div>
</div>

<style>
  .popup {
    display: none;
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-color: #23212e;
    padding: 50px;
    border: 2px solid #4c9caa;
    border-radius: 8px;
    color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    width: 70%;
  }

  .popup-content {
    text-align: center;
  }

  .save-button {
    background-color: rgb(123, 137, 156);
    color: black;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }

  .save-button:hover {
    background-color: #4c9caa;
  }
</style>
