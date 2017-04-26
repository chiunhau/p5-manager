<template lang="pug">
  iframe(v-bind:src='src' width='100%' scrolling='no')
</template>

<script>
  export default {
    data() {
      return {
        src: '/test1/index.html'
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
