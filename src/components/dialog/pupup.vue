<template>
  <transition name='fade'>
    <!-- 蒙版 -->
    <div class="mask" v-if="show" @touchmove.prevent>
      <div class="dialogBox">
   
        <h1>{{title}}</h1>
        <p>{{content}}</p>
        <button @click="btnClick">{{btnText}}</button>
      </div>
      <!-- <img @click="show = false" v-fb class="close" src="../../../pages/signin/dialog/images/关闭.png" alt=""> -->
    </div>
  </transition>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      show: false,
      imgUrl: '',
      title: '',
      content: '',
      btnText: '',
      click: ''
    }
  },
  created () {
  },
  methods: {
    btnClick () {
      this.click()
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
  // @import "../../../assets/css/minx/minx";
  // @import "../../../assets/css/pixel/pixel";
  // 渐变过渡
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .35s;
  }
  // // 全局弹窗
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    background:rgba(18,18,18,1);
    opacity:0.5025999999999999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // padding: 75/75rem;
    .dialogBox{
      height: 40rem;
      width: 60rem;
      background: #FFF;
      border-radius:8px;
      text-align: center;
      
      .shadow{
        width: 270/75rem;
        margin-top: -90/75rem;
      }
      h1{
        margin-top: 32/75rem;
        font-size:32/75rem;
        color:#f1300b;
        line-height:32/75rem;
        font-weight: 600;
      }
      p{
        margin-top: 32/75rem;
        font-size:28/75rem;
        color:#222222;
        line-height:40/75rem;
      }
      button{
        margin-top: 34/75rem;
        background:#f95644;
        border-radius:10px;
        width:23/75remx;
        height:64/75rem;
        font-size:28/75rem;
        color:#ffffff;
      }
    }
    .close{
      width:60/75rem;
      height:60/75rem;
      margin-top: 40/75rem;
    }
  }
</style>
