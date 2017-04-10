new Vue({
  el: '#app',
  data: {
    title: 'Hello World',
    projects: [],
    collectionName: '',
    iframesrc: '',
    sidebarActive: true
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
