<script lang="ts">
  import Button from '$lib/components/button/Button.svelte';

  /**
   * The name of the OIDC provider to be displayed.
   */
  export let name: string | null;

  /**
   * The id of the OIDC provider.
   */
  export let id: string;

  function OidcLogin(id: string) {
    console.log('OidcLogin', id);
  }
</script>

<!--
  @component
  A button that represents an OIDC provider.
-->
<Button on:click={() => OidcLogin(id)} class="oidc-button py-2 !w-fit text-sky">
  {name}
</Button>
