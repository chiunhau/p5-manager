<template lang="pug">
  .sidebar(v-bind:class='{"sidebar--active": sidebarActive}')
    button.toggle(v-bind:class='{"toggle--active": sidebarActive}' v-on:click='toggle')
      img(src='/assets/star.png')
    h2
      router-link(to='/') {{collectionName}}
    ul
      li(v-for='(project, index) in projects')
        router-link.project-link(v-if='split' v-on:click.native='toggle' v-bind:to='fullLinkTo(side, project)' v-bind:class='{"project-link--active": activeProject == project}') {{project}}
        router-link.project-link(v-else v-on:click.native='toggle' v-bind:to='"/" + project' v-bind:class='{"project-link--active": activeProject == project}') {{project}}
        a.staticBtn(v-if='!split' v-bind:href='staticLinkTo(project)' v-bind:class='{active: project === activeProject}' target='_blank' )  ↗
    .about
      router-link.link-split(v-if='!split' v-bind:to='"/split-view/+"') Split View Mode
      router-link.link-split(v-else to='/') ← Standard Mode
      a.brand(href='/') p5 Manager&nbsp;&nbsp;
      a.version(href='https://github.com/chiunhau/p5-manager' target='_blank') v0.4.2
      p made by #[a.twitter(href='https://twitter.com/chiunhauyou' target='_blank') @chiunhau]
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import $ from 'jquery'
  Vue.use(VueRouter);

  export default {
    data() {
      return {
        projects: [],
        collectionName: '',
        sidebarActive: false
      }
    },
    props: ['side', 'split'],
    computed: {
      activeProject() {
        return this.$route.params.project
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
        console.log(this.sidebarActive)
      },
      staticLinkTo(project) {
        return document.location.origin + '/' + project + '/index.html'
      },
      fullLinkTo(side, project) {
        var projects = this.$route.params.twoProjects.toString().split('+')

        if (side === 'left') {
          return '/split-view/' + project + '+' + projects[1]
        }

        else {
          return '/split-view/' + projects[0] + '+' + project
        }
      }
    },
    mounted: function() {
      console.log('going to fetch');
      var self = this;
      $.get({
        url: '/api/p5rc',
        dataType: 'json',
        success: function(data) {
          self.projects = data.projects;
          self.collectionName = data.collectionName;
        }
      })
    },
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

    // &.sidebar--active {
    //   left: 0;
    // }

    .project-link--active {
      color: #f07;
    }

    .staticBtn {
      color: #ccc;
      font-size: 15px;

      .active {
        color: #aaa;
      }
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

    &.toggle--right {
      right: 180px;

    }

    &.toggle--active {
      -ms-transform: rotate(144deg); /* IE 9 */
      -webkit-transform: rotate(144deg); /* Chrome, Safari, Opera */
      transform: rotate(144deg);
    }
  }

  .about {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    font-size: 14px;
    padding-left: 30px;

    p {
      margin-top: 0;
      color: #999;
    }

    .twitter {
      color: #f07;
    }
  }

  .link-split {
    display: block;
    color: #f07;
  }

  .split-view--left .sidebar {
    left: -175px;
    text-align: left;
  }

  .split-view--right .sidebar {
    right: -175px;
    text-align: right;
  }

  .split-view--left .sidebar.sidebar--active {
    left: 0;
  }

  .split-view--right .sidebar.sidebar--active {
    right: 0;
  }

  .split-view--left .sidebar h2 {
    margin-top: 10px;
    padding-left: 30px;
  }

  .split-view--right .sidebar h2 {
    margin-top: 10px;
    padding-right: 30px;
  }

  .sidebar h2 a {
    color: #333;
  }

  .split-view--left .sidebar ul {
    list-style: none;
    padding-left: 30px;
  }

  .split-view--right .sidebar ul {
    list-style: none;
    padding-right: 30px;
  }

  .split-view.split-view--left .toggle{
    left: 180px;
  }

  .split-view.split-view--right .toggle{
    right: 180px;
  }

  .split-view.split-view--right .about {
    display: none;
  }

  .single-view {
    .sidebar {
      left: -175px;
      text-align: left;

      &.sidebar--active {
        left: 0;
      }

      h2 {
        margin-top: 10px;
        padding-left: 30px;
      }

      ul {
        list-style: none;
        padding-left: 30px;
      }
      .toggle{
        left: 180px;
      }
    }
  }
</style>
