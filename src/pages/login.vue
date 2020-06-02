<template>
  <div class="login">
    <div class="content">
      <div class="logo">
        <img src="@/assets/image/login/login.png" alt />
      </div>
      <Form hide-required-mark ref="loginFormRef" :model="loginForm" :rules="loginFormRule">
        <FormItem label="登陆账号" prop="username">
          <Input v-model="loginForm.username" placeholder="请输入您的账号" />
          <img src="@/assets/image/login/username.png" alt class="login_icon" />
        </FormItem>
        <FormItem label="登陆密码" prop="password">
          <Input type="password" v-model="loginForm.password" placeholder="请输入您的密码" />
          <img src="@/assets/image/login/password.png" alt class="login_icon" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('loginFormRef')">登陆</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import base from '../http/api/base';
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginFormRule: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$loadDialog.show();
      axios({
        method: "post",
        url: base.sq+"/platformauthserver/oauth/token",
        headers: { Authorization: "Basic " + "YW5kcm9pZDphbmRyb2lk" },
        data: qs.stringify({
          grant_type: "password",
          username: this.loginForm.username,
          password: md5(this.loginForm.password)
        })
      }).then(res => {
        console.log(this);
        this.$loadDialog.hide();
        if (res.data.access_token) {
          this.$Storage.setSession("token", res.data.access_token);
           this.$router.push({ path: "/page/userWorkBench" });
        }
      });

      setTimeout(() => {
        this.$loadDialog.hide();
      }, 1000);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) return;
        this.login();
      });
    },
    handleAddBook() {
      this.login();
    },
 
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/image/login/login_bg.png");
  background-size: 100% 100%;
  position: relative;
  .content {
    width: 595px;
    height: 768px;
    position: absolute;
    top: 156px;
    right: 269px;
    padding: 88px 62px 0;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 34px 0px rgba(0, 33, 104, 0.08);
    border-radius: 20px;
    .logo {
      text-align: center;
      img {
        width: 339px;
        height: 87px;
      }
    }

    .ivu-form {
      /deep/ .ivu-form-item-label {
        color: #000;
      }
      .ivu-input-type-text {
        width: 100%;
        box-shadow: 0px 0px 34px 0px rgba(0, 33, 104, 0.08);
        border-radius: 20px;
      }
      /deep/ .ivu-input {
        padding-left: 55px;
        font-size: 20px;
        font-family: "PingFangSC-Regular", "PingFang SC";
        font-weight: 400;
        color: #4e4e4e;
        background: rgba(255, 255, 255, 1);
      }
      .ivu-form-item {
        margin-bottom: 30px;
      }
      .login_icon {
        position: absolute;
        top: 8.3px;
        right: 22px;
        width: 28px;
        height: 28px;
      }
      .ivu-form-item-content .ivu-form-item-error-tip {
        right: auto;
        left: 0 !important;
      }
      div.ivu-form-item-error-tip {
        right: auto !important;
        left: 0 !important;
      }
      button {
        width: 472px;
        height: 58px;
        background: linear-gradient(
          69deg,
          rgba(8, 83, 243, 1) 0%,
          rgba(68, 131, 255, 1) 100%
        );
        border-radius: 12px;
        margin-top: 46px;
      }
    }
  }
}
</style>
