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

  function handleKeyDown(event, action) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
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

<div class="sidebar {isSidebarActive ? '-active' : ''}">
  {#if loaded}
    <h2>{p5rc.collectionName}</h2>
    <ul>
      {#each p5rc.projects as project}
        <li>
          <button on:click="{() => handleRouteChange(`/${project}`)}"
            on:keydown={(e) => handleKeyDown(e, () => handleRouteChange(`/${project}`))}
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
</div>

<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: -220px;
    width: 220px;
    height: 100%;
    padding-left: 20px;
    background-color: #f5f5f5;
    text-align: left;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    z-index: 1000;
    box-sizing: border-box;
  }

  .sidebar.-active {
    left: 0;
  }

  .sidebar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .sidebar ul li {
    cursor: pointer;
  }

  .sidebar ul li button.-active {
    color: #f07;
  }

  .sidebar .footer {
    position: absolute;
    bottom: 20px;
    font-size: 13px;
    color: #333;
  }

  .highlight {
    color: #f07;
  }
</style>
