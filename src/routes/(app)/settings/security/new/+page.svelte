<script lang="ts">
  import { goto } from '$app/navigation';
  import { lockEditMode } from '$lib/actions.js';
  import { api } from '$lib/api';
  import DynCard from '$lib/components/card/dynCard/DynCard.svelte';
  import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
  import Form from '$lib/components/form/Form.svelte';
  import Input from '$lib/components/input/Input.svelte';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { currentRoute, mode, notifications } from '$lib/stores.js';
  import { notifySave } from '$lib/util/notifications.util';
  import { createTableHeadGenerator } from '$lib/util/tableBuilder.util';
  import InputWithCheckbox from '$lib/components/inputWithCheckbox/InputWithCheckbox.svelte';
  import { writable } from 'svelte/store';
  import { successPill } from '$lib/util/pill.util.js';

  /** Page data containing the form for new auth keys */
  export let data;
  $: ({ user } = data);

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
    notifications.add(successPill('New Auth Key added successfully'));
    goto('/settings/security/');
  }

  function editCallback(formData: Record<string, string>) {
    formData.user_id = user.User?.id;
    notifySave(
      $api
        .POST('/auth_keys/add/{userId}', {
          body: formData,
          params: { path: { userId: formData.user_id } }
        })
        .then((resp) => {
          if (resp.error) {
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

  $: {
    $currentRoute = [
      ...($currentRoute ?? []),
      { name: 'New Key', icon: 'mdi:key-add', href: 'new' }
    ];
  }
</script>

<svelte:window use:lockEditMode={true} />

<!-- 
    @component
    Displays the form for creating a new auth key.
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
