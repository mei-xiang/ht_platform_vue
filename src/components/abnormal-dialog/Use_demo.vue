<template>
  <div>
    <!-- 对话框demo -->
    <button @click="handler"></button>
  </div>
</template>

<script>
export default {
  methods: {
    handler() {
      // 
      /**
       * type: 1双按钮; 2单按钮; 3自动关闭
       * isClose: 默认false。是否显示关闭小按钮
       * msg: 状态内容
       * btn: Object类型。cancelVal:取消按钮内容, confirmVal:确认按钮内容
       * addrName: 图片名称
       */

      /**------------------ 1.验证失败 --------------- */
      this.$abnormalDialog({
        type: 1,
        msg: "您的账号不存在，建议联系管理员！",
        btn: {
          cancelVal: "返回",
          confirmVal: "联系管理员"
        },
        addrName: "verification_failed"
      })
        .then(() => {
          console.log("点击了确认");
        })
        .catch(() => {
          console.log("点击了取消");
        });

      /**------------------ 2.账号绑定 --------------- */
      this.$abnormalDialog({
        type: 1,
        msg: "输入错误次数过多，将锁定2小时，建议联系管理员！",
        btn: {
          cancelVal: "返回",
          confirmVal: "联系管理员"
        },
        addrName: "account_binding"
      })
        .then(() => {
          console.log("点击了确认");
        })
        .catch(() => {
          console.log("点击了取消");
        });

      /**------------------ 3.网络异常 --------------- */
      this.$abnormalDialog({
        type: 1,
        msg: "您的网络异常，请切换网络或联系管理员！",
        btn: {
          cancelVal: "返回",
          confirmVal: "联系管理员"
        },
        addrName: "network_anomaly"
      })
        .then(() => {
          console.log("点击了确认");
        })
        .catch(() => {
          console.log("点击了取消");
        });

      /**------------------ 4.确认提交 --------------- */
      this.$abnormalDialog({
        type: 1,
        msg: "确认是否提交?",
        btn: {
          cancelVal: "返回",
          confirmVal: "确认提交"
        },
        addrName: "confirm_submit"
      })
        .then(() => {
          console.log("点击了确认");
        })
        .catch(() => {
          console.log("点击了取消");
        });

      /**------------------ 5.登录超时 --------------- */
      this.$abnormalDialog({
        type: 2,
        msg:
          "您的系统闲置时间已超过30分钟，服务器已终止您与系统的对话，请重新登录！",
        addrName: "login_timeout"
      })
        .then(() => {
          console.log("点击了确认");
        })
        .catch(() => {
          console.log("点击了取消");
        });

      /**------------------ 6.非模态框-提交成功 --------------- */
      this.$abnormalDialog({
        type: 3,
        msg: "提交成功！",
        addrName: "submit_success"
      })
        .then(() => {
          console.log("点击了确认");
        })
        .catch(() => {
          console.log("点击了取消");
        });
      /**------------------ 7.非模态框-提交失败 --------------- */
      this.$abnormalDialog({
        type: 3,
        msg: "(系统故障原因)\n提交失败！",
        addrName: "submit_error"
      })
        .then(() => {
          console.log("点击了确认");
        })
        .catch(() => {
          console.log("点击了取消");
        });
      /**------------------ 8.非模态框-密码错误 --------------- */
      this.$abnormalDialog({
        type: 3,
        msg: "您的密码错误，还可以试4次哟！",
        addrName: "wrong_password"
      })
        .then(() => {
          console.log("点击了确认");
        })
        .catch(() => {
          console.log("点击了取消");
        });
    }
  }
};
</script>

<style></style>
