<template lang="pug">
  div
    h3 {{project}}
    h3 {{src}}
    iframe(v-bind:src='src' width='100%' scrolling='no')
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: ['project'],
    computed: {
      src() {
        return '/' + this.project + '/index.html'
      }
    }

  }
</script>

<style lang="scss">
  iframe {
    border: none;
    height: 100%;
    margin-left: 0px;
  }
</style>
