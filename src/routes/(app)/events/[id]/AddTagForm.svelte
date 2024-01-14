<script lang="ts">
  import Card from '$lib/components/card/Card.svelte';
  import CardRow from '$lib/components/card/CardRow.svelte';
  import Input from '$lib/components/input/Input.svelte';
  import Select from '$lib/components/form/Select.svelte';
  import CheckBox from '$lib/components/checkbox/Checkbox.svelte';
  import Button from '$lib/components/button/Button.svelte';
  import Pill from '$lib/components/pills/pill/Pill.svelte';

  let color = '';
</script>

<div class="flex flex-col gap-1">
  <form class="grow">
    <Card>
      <Input placeholder="Name" name="name" class="h-16" />
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
        <CheckBox name="local_only" checked={false} />
      </CardRow>
      <CardRow>
        <span>Color</span>
        <Input
          name="colour"
          class="w-20"
          type="color"
          on:value={({ detail }) => (color = detail)}
        />
      </CardRow>
    </Card>
  </form>
  <Card class="h-min">
    <div class="flex flex-row justify-center gap-4">
      <Button class="w-min text-red">Cancel</Button>
      <Button class="w-min text-green">Save</Button>
    </div>
  </Card>
</div>
