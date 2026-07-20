<script>
  import { push } from 'svelte-spa-router';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function goToHome() {
    push('/');
  }

  function toggleSidebar() {
    dispatch('toggleSidebar');
  }

  function toggleMenu() {
      console.log("Toggling sidebar visibility...");
      dispatch('toggleSidebar'); // Emitting event to toggle sidebar visibility
    }
  
  function handleKeyDown(event, callback) {
    if (event.key === 'Enter' || event.key === ' ') {
      callback();
    }
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
    top: 0;
    z-index: 1000;
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
  <button class="toggle" on:click={toggleSidebar} on:keydown={(e) => handleKeyDown(e, toggleSidebar)}>
    <img src="/assets/star.png" alt="star.png" />
  </button>
  <button class="navbar-title" on:click={goToHome} on:keydown={(e) => handleKeyDown(e, goToHome)}>
    p5-manager
  </button>
  <div class="navbar-links">
    <!-- Additional links can be added here -->
  </div>
</div>
