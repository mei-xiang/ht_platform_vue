<template>
  <div id="#app">
    <button @click="showLoadDialog">请求开始-点击显示loadDialog</button>
    <!-- 请求结束测试按钮可能点不动，外面有一层遮罩。可以使用vue devtools调试工具测试修改LoadDialog组件的showLoad值 -->
    <button @click="hideLoadDialog">请求结束-点击显示loadDialog</button>
  </div>
</template>

<script>
import Pager from '@/demo/page/Pager'
export default {
  methods: {
    showLoadDialog() {
      // 请求开始调用
      this.$loadDialog.show()
    },
    hideLoadDialog() {
      // 请求结束调用
      this.$loadDialog.hide()
    }
  }
}
</script>

<style>
.app {
  width: 100%;
  height: 100%;
}
</style>

