<script lang="ts">
  /** HTTP status code */
  export let status: number;
  /** error message */
  export let message: string;
</script>

<!--
  @component
  
  Display generic HTTP error.
-->
<div class="flex flex-col items-center justify-center w-full h-full gap-6 p-5 text-center text-red">
  <h2 class="text-9xl">
    {status}
  </h2>
  <h1 class="text-4xl font-bold">An error occurred!</h1>
  <p class="text-xl">
    {message}
  </p>

  {#if status === 403}
    <span>
      Goto
      <a href="/login" class="underline text-sky">login</a>
    </span>
  {/if}
</div>
