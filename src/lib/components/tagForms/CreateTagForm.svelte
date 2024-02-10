<script lang="ts">
  import CardHeading from '../card/CardHeading.svelte';

  import CardRow from '../card/CardRow.svelte';

  import CheckBox from '$lib/components/checkbox/Checkbox.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import Card from '../card/Card.svelte';
  import Input from '../input/Input.svelte';
  import { generateRandomPastelHex, shouldTextBeBlack } from '$lib/util/color.util';
  import Button from '../button/Button.svelte';
  import Pill from '../pills/pill/Pill.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    close: void;
  }>();
  let color = generateRandomPastelHex();

  let text = '';

  let local_only = false;
</script>

<div class="flex flex-col gap-1">
  <Card>
    <CardHeading>Create a new Tag</CardHeading>
    <Input placeholder="Name" icon="mdi:tag-outline" on:value={({ detail }) => (text = detail)} />
    <CardRow>
      <span>Restrict to org:</span>
      <Select
        options={[
          {
            label: 'ORGNAME',
            value: '0'
          },
          {
            label: 'ANOTHER ORG',
            value: '1'
          }
        ]}
        value="0"
        name="restrict_org"
      />
    </CardRow>
    <CardRow>
      <span>Restrict to user:</span>
      <Select
        options={[
          {
            label: 'admin@admin.test',
            value: '0'
          },
          {
            label: 'foo.bar@test',
            value: '1'
          }
        ]}
        value="0"
        name="restrict_user"
      />
    </CardRow>
    <CardRow>
      <span>Exportable</span>
      <CheckBox name="exportable" checked={false} />
    </CardRow>
    <CardRow>
      <span>Hide Tag</span>
      <CheckBox name="hidden" checked={false} />
    </CardRow>
    <CardRow>
      <span>Local only</span>
      <CheckBox name="hidden" bind:checked={local_only} />
    </CardRow>

    <CardRow>
      <span>Color</span>

      <div class="flex gap-1">
        <Input
          type="color"
          class="w-32 !cursor-pointer"
          value={color}
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
  </Card>

  <Card class="!h-min overflow-initial">
    <div class="flex justify-center gap-4">
      <Button
        class="w-min text-red bg-surface1"
        suffixIcon="mdi:close-circle-outline"
        on:click={() => dispatch('close')}>Cancel</Button
      >
      <Button
        class="w-min text-green bg-surface1"
        suffixIcon="material-symbols:save-outline"
        on:click>Save</Button
      >
    </div>
  </Card>
</div>
