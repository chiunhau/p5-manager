<script>
  import { onMount } from 'svelte';
  import { push, location } from 'svelte-spa-router';
  export let isSidebarActive = false;

  let loaded = false;
  let p5rc;

  const fetchData = async () => {
    const response = await fetch('/api/p5rc');
    return await response.json();
  };

  function handleRouteChange(to) {
    push(to);
  }

  onMount(async () => {
    try {
      p5rc = await fetchData();
      loaded = true;
    } catch (error) {
      console.error(error);
    }
  });
</script>

<aside id="project-menu" class="sidebar {isSidebarActive ? '-active' : ''}" aria-hidden={!isSidebarActive}>
  {#if loaded}
    <h2>{p5rc.collectionName}</h2>
    <ul>
      {#each p5rc.projects as project}
        <li>
          <button type="button" on:click="{() => handleRouteChange(`/${project}`)}"
            class="{project === $location.slice(1) ? '-active' : ''}">
            {project}
          </button>
        </li>
      {/each}
    </ul>
  {/if}

  <div class="footer">
    <a href="https://github.com/chiunhau/p5-manager" class="version">
      p5-manager v1.4.0
    </a>
    <br />
    by
    <a href="https://twitter.com/chiunhauyou" class="author highlight"
      >@chiunhauyou</a>
  </div>
</aside>

<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100%;
    padding: 70px 16px 24px;
    background-color: #333;
    color: #fff;
    text-align: left;
    display: flex;
    flex-direction: column;
    transform: translateX(-100%);
    visibility: hidden;
    overflow: hidden;
    transition: transform 0.5s ease, width 0.3s ease,
      visibility 0s linear 0.5s;
    z-index: 1000;
    box-sizing: border-box;
  }

  .sidebar.-active {
    transform: translateX(0);
    visibility: visible;
    transition-delay: 0s;
    box-shadow: 4px 0 18px rgba(0, 0, 0, 0.2);
  }

  .sidebar.-active:hover {
    width: min(460px, calc(100vw - 24px));
  }

  .sidebar h2 {
    flex: 0 0 auto;
    margin: 0 0 20px;
    color: #f07;
    font-size: 20px;
    overflow-wrap: anywhere;
  }

  .sidebar ul {
    flex: 1 1 auto;
    min-height: 0;
    list-style-type: none;
    margin: 0;
    padding: 0 6px 0 0;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-color: #f07 #292929;
    scrollbar-width: thin;
  }

  .sidebar ul::-webkit-scrollbar {
    width: 8px;
  }

  .sidebar ul::-webkit-scrollbar-track {
    background: #292929;
    border-radius: 4px;
  }

  .sidebar ul::-webkit-scrollbar-thumb {
    background: #f07;
    border-radius: 4px;
  }

  .sidebar ul li {
    margin-bottom: 6px;
  }

  .sidebar ul li button {
    width: 100%;
    padding: 10px 12px;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: #eee;
    font: inherit;
    line-height: 1.35;
    text-align: left;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .sidebar ul li button:hover,
  .sidebar ul li button:focus-visible {
    background: rgba(255, 0, 119, 0.16);
    color: #fff;
    outline: 2px solid #f07;
    outline-offset: -2px;
  }

  .sidebar ul li button.-active {
    background: #f07;
    color: #fff;
    font-weight: 600;
  }

  .sidebar a {
    color: #f07;
  }

  .sidebar .footer {
    flex: 0 0 auto;
    padding-top: 18px;
    font-size: 13px;
    color: #bbb;
  }

  .highlight {
    color: #f07;
  }
</style>
