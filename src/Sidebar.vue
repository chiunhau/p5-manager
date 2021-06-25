<template lang="pug">
  .sidebar(v-bind:class='{"sidebar--active": sidebarActive}')
    button.toggle(v-bind:class='{"toggle--active": sidebarActive}' v-on:click='toggle')
      img(v-bind:src='star')
    h2
      router-link(to='/') {{collectionName}}
    ul
      li(v-for='(project, index) in projects')
        router-link.project-link(v-if='split' v-on:click.native='toggle' v-bind:to='fullLinkTo(side, project)' v-bind:class='{"project-link--active": activeProject == project}') {{project}}
        router-link.project-link(v-else v-on:click.native='toggle' v-bind:to='"/" + project' v-bind:class='{"project-link--active": activeProject == project}') {{project}}
        a.staticBtn(v-if='!split' v-bind:href='staticLinkTo(project)' v-bind:class='{active: project === activeProject}' target='_blank' )  ↗
    .about
      a.version(href='https://github.com/chiunhau/p5-manager' target='_blank') p5 Manager v1.3.1
      p Made by #[a.twitter(href='https://twitter.com/chiunhauyou' target='_blank') @chiunhau]
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'jquery';
import star from './star.png';
Vue.use(VueRouter);

export default {
  data() {
    return {
      projects: [],
      collectionName: '',
      sidebarActive: false,
      star,
    };
  },
  props: ['side', 'split'],
  computed: {
    activeProject() {
      return this.$route.params.project;
    },
  },
  methods: {
    toggle() {
      if (this.sidebarActive) {
        this.sidebarActive = false;
      } else {
        this.sidebarActive = true;
      }
      console.log(this.sidebarActive);
    },
    staticLinkTo(project) {
      return document.location.origin + '/' + project + '/index.html';
    },
    fullLinkTo(side, project) {
      var projects = this.$route.params.twoProjects.toString().split('+');

      if (side === 'left') {
        return '/split-view/' + project + '+' + projects[1];
      } else {
        return '/split-view/' + projects[0] + '+' + project;
      }
    },
  },
  mounted: function () {
    console.log('going to fetch');
    var self = this;
    $.get({
      url: '/api/p5rc',
      dataType: 'json',
      success: function (data) {
        self.projects = data.projects;
        self.collectionName = data.collectionName;
      },
    });
  },
};
</script>

<style lang="scss">
a {
  color: #333;
  text-decoration: none;

  &:hover,
  &:active {
    color: #666;
  }

  &:active {
    color: #f07;
  }
}

.sidebar {
  position: absolute;
  top: 0;
  left: -220px;
  width: 220px;
  height: 100%;
  padding-left: 20px;
  background-color: #f5f5f5;
  text-align: left;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  z-index: 10;
  box-sizing: border-box;

  h2 {
    margin-top: 10px;
    color: #333;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  &.sidebar--active {
    left: 0;
  }

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
  right: -40px;
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
</style>
