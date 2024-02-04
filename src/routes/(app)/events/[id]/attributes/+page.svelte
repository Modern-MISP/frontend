<script lang="ts">
  import AttributeList from "../../../attributes/AttributeList.svelte";

  export let data;

  const attributeData = data.event.Attribute!;
</script>
<AttributeList data={attributeData}></AttributeList>