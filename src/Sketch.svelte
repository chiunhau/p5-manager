<script>
  export let params = {};

  let iframe;

  function makeCanvasResponsive() {
    const document = iframe?.contentDocument;

    if (!document || document.getElementById('p5-manager-responsive-canvas')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'p5-manager-responsive-canvas';
    style.textContent = `
      html, body {
        width: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }

      canvas {
        display: block;
        max-width: 100% !important;
        height: auto !important;
        margin-left: auto;
        margin-right: auto;
      }
    `;
    document.head.appendChild(style);
  }
</script>

<iframe
  bind:this={iframe}
  title="{params.id}"
  src="{`/${params.id}/index.html`}"
  on:load={makeCanvasResponsive}
  scrolling="no"
  id="single-sketch"></iframe>

<style>
  iframe {
    display: block;
    width: 100%;
    max-width: 100%;
    border: none;
    height: 100%;
    margin: 0;
  }
</style>
