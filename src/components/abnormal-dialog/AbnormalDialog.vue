<template>
  <div class="abnormalDialog" v-if="isShow">
    <div class="content">
      <div class="top" :class="{h80: isH80}">
        <Icon type="md-close" class="close" v-if="text.isClose" @click="cancel" />
      </div>
      <div class="center">
        <div class="image" >
          <img v-if="text.addrName=='verification_failed'" src="@/assets/image/dialog/verification_failed.png" alt />
          <img v-if="text.addrName=='account_binding'" src="@/assets/image/dialog/account_binding.png" alt />
          <img v-if="text.addrName=='network_anomaly'" src="@/assets/image/dialog/network_anomaly.png" alt />
          <img v-if="text.addrName=='confirm_submit'" src="@/assets/image/dialog/confirm_submit.png" alt />
          <img v-if="text.addrName=='login_timeout'" src="@/assets/image/dialog/login_timeout.png" alt />
          <img v-if="text.addrName=='submit_success'" src="@/assets/image/dialog/submit_success.png" alt />
          <img v-if="text.addrName=='submit_error'" src="@/assets/image/dialog/submit_error.png" alt />
          <img v-if="text.addrName=='wrong_password'" src="@/assets/image/dialog/wrong_password.png" alt />
        </div>
        <div class="text">{{ text.msg }}</div>
      </div>
      <div class="bottom">
        <a
          href="javascript:;"
          class="return"
          @click="cancel"
          v-if="text.type == 1"
        >{{ text.btn.cancelVal }}</a>
        <a
          href="javascript:;"
          class="contact"
          @click="confirm"
          v-if="text.type == 1"
        >{{ text.btn.confirmVal }}</a>
        <a href="javascript:;" class="againlogin" @click="confirm" v-if="text.type==2">重新登陆</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      text: {
        type: null, // 开启对话框的类型
        isClose: false, // 关闭按钮
        msg: '', // 标题名称
        addrName: '', // 图片名称
        picAddr: '', // 图片路径
        btn: {
          confirmVal: '', // 确认按钮名称
          cancelVal: '' // 取消按钮名称
        },
        isH80: false
      }
    }
  },
  // watch: {
  //   'text.addrName': {
  //     handler(newVal, oldVal) {
  //       switch (newVal) {
  //         case 'verification_failed':
  //           this.text.picAddr = '/static/img/verification_failed.8262ad1.png'
  //           break
  //         case 'account_binding':
  //           this.text.picAddr = '/static/img/account_binding.b29cbf6.png'
  //           break
  //         case 'network_anomaly':
  //           this.text.picAddr = '/static/img/network_anomaly.5a5b700.png'
  //           break
  //         case 'confirm_submit':
  //           this.text.picAddr = '/static/img/confirm_submit.6bf9c48.png'
  //           break
  //         case 'login_timeout':
  //           this.text.picAddr = '/static/img/login_timeout.44568c9.png'
  //           break
  //         case 'submit_success':
  //           this.text.picAddr = '/static/img/submit_success.88cf394.png'
  //           break
  //         case 'submit_error':
  //           this.text.picAddr = '/static/img/submit_error.88cf394.png'
  //           break
  //         case 'wrong_password':
  //           this.text.picAddr = '/static/img/wrong_password.e5448be.png'
  //           break
  //       }
  //     },
  //     deep: true
  //   }
  // },
  computed: {
    isH80() {
      return this.text.type == 3
    }
  },
  methods: {
    cancel() {
      this.isShow = false
      console.log('取消')
    },
    confirm() {
      this.isShow = false
      console.log('确认')
    }
  }
}
</script>

<style lang="less" scoped>
.abnormalDialog {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(9, 9, 9, 0.5029);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-size: 20px;
  .content {
    width: 600px;
    height: 400px;
    background-color: #fff;
    min-height: 200px;
    border-radius: 15px;
    .top {
      text-align: right;
      padding-top: 9px;
      padding-right: 15px;
      height: 43px;
      .close {
        width: 22px;
        height: 22px;
      }
    }
    .h80 {
      height: 80px;
    }
    .center {
      text-align: center;

      .image {
        width: 248px;
        height: 165px;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        height: 50px;
        padding: 0 112px;
        color: #666666;
        line-height: 28px;
        text-align: center;
        font-weight: 400;
      }
    }
    .bottom {
      display: flex;
      text-align: center;
      justify-content: center;
      line-height: 58px;
      height: 58px;
      margin-top: 30px;
      .return {
        width: 174px;
        background-color: #f5f5f5;
        color: #4e4e4e;
        margin-right: 20px;
        border-radius: 10px;
      }
      .contact {
        width: 284px;
        background: linear-gradient(to bottom right, #0853f3, #4483ff);
        border-radius: 10px;
        color: #fff;
        font-weight: 500;
      }
      .againlogin {
        width: 472px;
        background: linear-gradient(to bottom right, #0853f3, #4483ff);
        border-radius: 10px;
        color: #fff;
        font-weight: 500;
      }
    }
  }
}
</style>
