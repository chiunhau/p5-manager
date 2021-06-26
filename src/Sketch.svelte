<script>
  export let params = {};
</script>

<iframe
  title="{params.id}"
  src="{`/${params.id}/index.html`}"
  width="100%"
  scrolling="no"
  id="single-sketch"></iframe>

<style>
  iframe {
    border: none;
    height: 100%;
    margin-left: 0px;
  }
</style>
