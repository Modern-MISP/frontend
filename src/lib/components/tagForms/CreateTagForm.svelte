<script>
  import CardRow from '../card/CardRow.svelte';

  import Select from '$lib/components/form/Select.svelte';
  import CheckBox from '$lib/components/checkbox/Checkbox.svelte';
</script>

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
