<template>
  <div class="loadDialogBox" v-if="showLoad">
    <div class="loadDialog" :class="showLoad ?'fadein':'fadeout'">
      <div class="top">
        <!-- <img src="@/assets/image/close.png" @click="close" alt /> -->
        <!-- <img src="@/assets/image/close.png" alt /> -->
      </div>
      <div class="loadImg">
        <img src="@/assets/image/loading.gif" alt />
      </div>
      <div class="text">努力刷新中～</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoad: false
    }
  },
  methods: {
    // close() {
    //   this.showLoad = false
    // },
    // show({ duration = 1500 }) {
    //   console.log('我执行了')
    //   this.showLoad = true
    //   setTimeout(() => {
    //     this.showLoad = false
    //     console.log('我关闭了')
    //   }, duration - 250)
    // }
    show() {
      this.showLoad = true
    },
    hide() {
      this.showLoad = false
    }
  }
}
</script>

<style lang="less" scoped>
.loadDialogBox {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(9, 9, 9, 0.5029);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .loadDialog {
    position: fixed;
    box-shadow: 0 0 17px 0 #c7c7c7;
    width: 496px;
    height: 280px;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // background-color: transparent;
    background-color: #fff;
    border-radius:8px;

    .loadImg {
      margin-top: 60px;
      margin-bottom: 10px;
      img {
        width: 120px;
        height: 120px;
      }
    }
    .text {
      color: #4e4e4e;
      font-size: 18px;
      font-family: 'PingFangSC-Regular', 'PingFang SC';
      font-weight: 400;
      height: 25px;
      line-height: 25px;
      transform: translateY(-10px);
    }
  }
}

/* 显示动画，与隐藏动画 */
.fadein {
  animation: animate_in 0s;
}
.fadeout {
  animation: animate_out 0s;
  opacity: 0;
}
@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
