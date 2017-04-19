Vue.component('split-view', {
  template: '#split-view-template',
  data: function(){
    return {
      title: 'Hello World',
      projects: [],
      collectionName: '',
      iframesrc: '',
      sidebarActive: true
    };
  },
  mounted: function() {
    console.log('going to fetch');
    var self = this;
    $.get({
      url: '/fetch-projects',
      dataType: 'json',
      success: function(data) {

        self.projects = data.projects;
        self.collectionName = data.collectionName;
      }
    })
  },
  methods: {
    projectClicked: function(project) {
      this.sidebarActive = false;
      this.iframesrc = '/' + project + '/index.html';
    },
    toggle: function() {
      if (this.sidebarActive) {
        this.sidebarActive = false;
      }
      else {
        this.sidebarActive = true;
      }
    }
  }

});

var app = new Vue({
  el: '#app'

})
