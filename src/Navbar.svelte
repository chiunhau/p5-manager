<script>
  import { push } from 'svelte-spa-router';
  import { createEventDispatcher } from 'svelte';

  export let isSidebarActive = false;

  const dispatch = createEventDispatcher();

  function goToHome() {
    push('/');
  }

  function toggleSidebar() {
    dispatch('toggleSidebar');
  }
  
</script>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    padding: 10px 20px;
    color: #f07;
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    top: 0;
    z-index: 1100;
  }

  .navbar-title {
    font-size: 24px;
    text-align: center;
    flex: 1;
  }

  .toggle, .navbar-title {
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  .toggle > img {
    width: 24px;
    display: block;
    transition: transform 0.3s ease;
  }

  .toggle[aria-expanded='true'] > img {
    transform: rotate(144deg);
  }

  @media (max-width: 768px) {
    .navbar-links {
      display: none;
      flex-direction: column;
      gap: 10px;
      position: absolute;
      top: 50px;
      right: 20px;
      background-color: #333;
      padding: 10px;
      border-radius: 5px;
    }
  }
</style>

<div class="navbar">
  <button
    class="toggle"
    type="button"
    aria-label={isSidebarActive ? 'Close project menu' : 'Open project menu'}
    aria-controls="project-menu"
    aria-expanded={isSidebarActive}
    on:click={toggleSidebar}>
    <img src="/assets/star.png" alt="" />
  </button>
  <button class="navbar-title" type="button" on:click={goToHome}>
    p5-manager
  </button>
  <div class="navbar-links">
    <!-- Additional links can be added here -->
  </div>
</div>
