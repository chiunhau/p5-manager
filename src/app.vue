<template lang="html">
  <div>
    <div class="message">
      {{ message }}
    </div>
    <div>
      {{ count }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Helo, Vue.js 2.0',
      count: 0
    }
  },

  mounted () {
    this.handle = setInterval(() => {
      this.count++
    }, 1000)
  },

  destroyed () {
    clearInterval(this.handle)
  }
}
</script>

<style lang="css">
.message {
  color: pink;
  font-size: 1.4em;
}
</style>
