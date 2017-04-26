<template lang="pug">
  .sidebar(v-bind:class='{"sidebar--active": sidebarActive}')
    button.toggle.toggle--left(v-bind:class='{"toggle--active": sidebarActive}' v-on:click='toggle')
      img(src='/assets/star.png')
    h2
      a(href='/') DEMO1
    ul
      li(v-for='(project, index) in projects')
        a(href='#') {{project}}
</template>

<script>
  export default {
    data() {
      return {
        message: "Hello",
        projects: [
          'project1',
          'project2'
        ],
        sidebarActive: true
      }
    },
    methods: {
      toggle() {
        if (this.sidebarActive) {
          this.sidebarActive = false;
        }
        else {
          this.sidebarActive = true;
        }
      }
    }
  }
</script>

<style lang="scss">
  a {
    color: #999;
    text-decoration: none;

    &:hover, &:active {
      color: #555;
    }

    &:active {
      color: #f07;
    }
  }

  .sidebar {
    position: absolute;
    z-index: 10;
    top: 0;
    left: -175px;
    background-color: #f5f5f5;
    width: 220px;
    height: 100%;
    text-align: left;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;

    h2 {
      margin-top: 10px;
      padding-left: 30px;
      color: #333;
    }

    ul {
      list-style: none;
      padding-left: 30px;
    }

    &.sidebar--active {
      left: 0;
    }
  }

  .toggle {
    position: absolute;
    top: 10px;
    background-color: transparent;
    border: none;
    transition: all 1s;
    -webkit-transition: all 1s;
    z-index: 11;

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }

    img {
      width: 24px;
    }

    &.toggle--left {
      left: 180px;

    }

    &.toggle--active {
      -ms-transform: rotate(144deg); /* IE 9 */
      -webkit-transform: rotate(144deg); /* Chrome, Safari, Opera */
      transform: rotate(144deg);
    }
  }
</style>
