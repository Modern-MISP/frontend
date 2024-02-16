<script lang="ts">
  import { api } from '$lib/api';
  import Form from '$lib/components/form/Form.svelte';
  import CreateTagForm from '$lib/components/tagForms/CreateTagForm.svelte';
  import { get } from 'svelte/store';
  import { notifySave } from '$lib/util/notifications.util';

  function addTag(formData: Record<string, string>) {
    notifySave(
      get(api)
        .POST('/tags/add', {
          body: formData
        })
        .then((res) => {
          if (res.error) throw Error(res.error.message);
        })
    );
  }
</script>

<div class="absolute left-0 z-50 w-1/2 h-full overflow-auto">
  <Form callback={addTag}>
    <CreateTagForm />
  </Form>
</div>
