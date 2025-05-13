<script lang="ts">
  import Button from '$lib/components/button/Button.svelte';

  /**
   * The name of the OIDC provider to be displayed.
   */
  export let name: string | null;

  /**
   * The OIDC provider's URL.
   */
  export let url: string;

  function OidcLogin(url: string) {
    window.location.href = url;
  }
</script>

<!--
  @component
  A button that represents an OIDC provider.
-->
<Button on:click={() => OidcLogin(url)} class="oidc-button py-2 w-fit! text-ctp-sky">
  {name}
</Button>
