<script>
  import Router from 'svelte-spa-router';
  import Sidebar from './Sidebar.svelte';
  import Welcome from './Welcome.svelte';
  import Sketch from './Sketch.svelte';

  const routes = {
    '/': Welcome,
    '/:id': Sketch,
  };
</script>

<div class="app">
  <Sidebar />
  <Router routes="{routes}" />
</div>

<style>
  .app {
    height: 100%;
  }
</style>
