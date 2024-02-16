<script lang="ts">
  import CardRow from '../card/CardRow.svelte';

  import { api } from '$lib/api';
  import type { components } from '$lib/api/misp';
  import CheckBox from '$lib/components/checkbox/Checkbox.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import { notifications } from '$lib/stores';
  import { generateRandomPastelHex, shouldTextBeBlack } from '$lib/util/color.util';
  import { errorPill } from '$lib/util/pill.util';
  import { createEventDispatcher } from 'svelte';
  import Button from '../button/Button.svelte';
  import Input from '../input/Input.svelte';
  import Pill from '../pills/pill/Pill.svelte';

  const dispatch = createEventDispatcher<{
    close: void;
  }>();
  let color = generateRandomPastelHex();

  let text = '';

  let local_only = false;

  let orgs: components['responses']['OrganisationListResponse']['content']['application/json'] = [];
  $api.GET('/organisations').then((res) => {
    if (res.error) {
      notifications.add(errorPill('failed loading organizations'));
      return;
    }
    orgs = res.data;
  });

  let users: components['responses']['UserListResponse']['content']['application/json'] = [];
  $api.GET('/admin/users').then((res) => {
    if (res.error) {
      notifications.add(errorPill('failed loading users'));
      return;
    }
    users = res.data;
  });
</script>

<div class="flex flex-col h-full gap-1">
  <Input
    placeholder="Name"
    name="name"
    icon="mdi:tag-outline"
    on:value={({ detail }) => (text = detail)}
  />
  <CardRow>
    <span>Restrict to org:</span>
    <Select
      options={orgs.map((org) => ({
        label: org.Organisation?.name ?? 'unknown',
        value: org.Organisation?.id ?? ''
      }))}
      value=""
      name="org_id"
    />
  </CardRow>
  <CardRow>
    <span>Restrict to user:</span>
    <Select
      options={users.map((user) => ({
        label: user.User?.email ?? 'unknown',
        value: user.User?.id ?? ''
      }))}
      value=""
      name="user_id"
    />
  </CardRow>
  <CardRow>
    <span>Exportable</span>
    <CheckBox name="exportable" checked={false} />
  </CardRow>
  <CardRow>
    <span>Hide Tag</span>
    <CheckBox name="hide_tag" checked={false} />
  </CardRow>
  <CardRow>
    <span>Local only</span>
    <CheckBox name="local_only" bind:checked={local_only} />
  </CardRow>

  <CardRow>
    <span>Color</span>

    <div class="flex gap-1">
      <Input
        type="color"
        class="w-32 !cursor-pointer"
        value={color}
        name="colour"
        on:value={({ detail }) => (color = detail)}
      />
      <Button
        prefixIcon="mdi:sync"
        class="w-min text-sky"
        on:click={() => (color = generateRandomPastelHex())}
      ></Button>
    </div>
  </CardRow>

  {#if text}
    <div class="flex flex-col gap-4 p-2 border rounded-md border-text">
      <h3>This tag will be created</h3>
      <Pill
        {text}
        style={`background-color: ${color}; color: ${
          shouldTextBeBlack(color ?? '') ? 'black' : 'white'
        }`}
        icon={local_only ? 'mdi:cloud-off-outline' : 'mdi:earth'}
      ></Pill>
    </div>
  {/if}
  <div class="flex justify-center gap-4 mt-auto">
    <Button
      class="w-min text-red bg-surface1"
      suffixIcon="mdi:close-circle-outline"
      on:click={() => dispatch('close')}>Cancel</Button
    >
    <Button
      class="w-min text-green bg-surface1"
      suffixIcon="material-symbols:save-outline"
      type="submit"
      on:click>Save</Button
    >
  </div>
</div>
