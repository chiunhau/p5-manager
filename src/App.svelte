<script>
  import Navbar from './Navbar.svelte';
  import Sidebar from './Sidebar.svelte';
  import Router from 'svelte-spa-router';
  import Welcome from './Welcome.svelte';
  import Sketch from './Sketch.svelte';

  let isSidebarActive = false;

  const routes = {
    '/': Welcome,
    '/:id': Sketch,
  };

  function handleToggleSidebar() {
    isSidebarActive = !isSidebarActive;
  }
</script>

<div class="app" class:isSidebarActive>
  <Navbar on:toggleSidebar={handleToggleSidebar} />
  <Sidebar {isSidebarActive} />
  <Router {routes} />
</div>

<style>
  .app {
    height: 100%;
  }

  .app.isSidebarActive {
    padding-left: 220px; /* Adjust this value based on your sidebar width */
  }
</style>
