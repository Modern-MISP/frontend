<script lang="ts">
  import { api } from '$lib/api';
  import CreateTagForm from '$lib/components/tagForms/CreateTagForm.svelte';
  import { get } from 'svelte/store';
  import { notifySave } from '$lib/util/notifications.util';
  import { getFormValues } from '$lib/util/form.util';
  import { createEventDispatcher } from 'svelte';
  import { invalidateAll } from '$app/navigation';

  const dispatch = createEventDispatcher();

  function addTag(formData: Record<string, string>) {
    notifySave(
      get(api)
        .POST('/tags/add', {
          body: formData
        })
        .then((res) => {
          if (res.error) throw Error(res.error.message);
          dispatch('close');
          invalidateAll();
        })
    );
  }
</script>

<form on:submit|preventDefault={(e) => addTag(getFormValues(e))} class="h-full">
  <CreateTagForm on:close />
</form>
