<script lang="ts">
  import ComplexTableLayout from '$lib/components/table/complexTable/ComplexTableLayout.svelte';
  import { notifications } from '$lib/stores.svelte.ts';
  import type { PageData } from './$types';
  import { successPill } from '$lib/util/pill.util';

  interface Props {
    /** Page data containing data of the users table.*/
    data: PageData;
  }

  let { data }: Props = $props();

  let password = $state('');
  data.passwordStore.subscribe((value) => {
    password = value;
  });

  function closePopup() {
    const popup = document.getElementById('password-popup');
    if (popup) popup.style.display = 'none';
    notifications.add(successPill('New Password added successfully'));
  }
</script>

<!--
  @component
  Displays a list of all users of the instance.

-->
<ComplexTableLayout {...data} tableHref={(x) => `/admin/users/${x.User?.id}`}></ComplexTableLayout>

<!-- Password Popup -->
<div id="password-popup" class="popup">
  <div class="popup-content">
    <p>
      Please make sure that you note down the new password below, this is the only time the new
      password is shown in plain text, so make sure you save it. If you lose the new password,
      simply generate a new one.
    </p>
    <p><strong>{password}</strong></p>
    <button onclick={closePopup} class="save-button">I have noted down the new password</button>
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
