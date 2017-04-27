<template lang="pug">
  .wrapper
    h1 Hello p5.js!
    p.magic Your creativity times p5-manager's magic
    h3 Getting started
    ol
      li Use<code>$ p5 new COLLECTION_NAME</code> to create a collection
      li Then<code>$ p5 generate PROJECT_NAME</code>to generate a  project
      li Run<code>$ p5 server</code>in the collection directory
      li Go to<code>localhost:5555</code>and you should see this page
      li All your projects would be listed in the left
    h3 Need help?
    ol
      li Check the #[a(href='https://github.com/chiunhau/p5-manager/blob/master/README.md' target='_blank') documentation]
      li Open an #[a(href='https://github.com/chiunhau/p5-manager/blob/master/README.md' target='_blank' ) issue]
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .wrapper {
    margin: auto;
    display: inline-block;
    padding-top: 70px;
    text-align: left;

    h1 {
      font-size: 80px;
      color: #f07;
      margin-bottom: 0px;
    }

    code {
      font-size: 16px;
      color: #f07;
      padding: 5px;
    }

    .magic {
      position: relative;
      font-size: 18px;
      color: #f07;
      margin-top: -10px;
      padding-bottom: 15px;
    }

    h3 {
      color: #666;
      margin-top: 40px;
      margin-bottom: 0px;
    }

    ol{
      font-size: 16px;
      color: #666;
      padding-left: 0px;
      margin-top: 0;
    }

    li {
      margin-top: 8px;
    }

    a {
      color: #f07;
    }

    p:after {
      content: "";
      position: absolute;
      width: 100%;
      background-color: #f07;
      height: 2px;
      bottom: 0px;
      left: 0;
    }
  }
</style>
