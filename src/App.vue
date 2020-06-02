<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
      onLoad(id) {
          this.$api.article.articleDetail(id, {
              api: 123
          }).then(res=> {
              // 执行某些操作
          })
      }

  }
}
</script>

<style>
#app {
 width: 100%;
 height: 100%;
}
</style>
