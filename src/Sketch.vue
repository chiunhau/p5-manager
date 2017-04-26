<template lang="pug">
  div
    h3 {{$route.params.project}}
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
        return '/' + this.$route.params.project + '/index.html'
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
