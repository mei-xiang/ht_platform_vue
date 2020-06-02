<template>
  <div class="content" id="layout">
    <div class="layout-single">
      <div class="htu-layout htu-layout-has-sider">
        <div class="layout-sider">
          <div id="logo"></div>
          <div class>
            <Menu :open-names="['1']" accordion>
              <Submenu :name="item.parentId" v-for="(item,index) in menuArr" :key="index" v-if="menuArr.length">
                <template slot="title">
                  <Icon type="ios-stats icondaiyue" />
                  {{item.name}}
                </template>
                <MenuGroup
                  :title="secondItem.name"
                  v-for="(secondItem,secondIndex) in item.list"
                  :key="secondIndex"
                  @click.native="goPage(secondItem.url)"
                >
                  <!-- <MenuItem :name=thirdItem.name v-for="(thirdItem,thirdIndex) in secondItem.list" :key="thirdIndex" @click.native="goPage(thirdItem.url)">{{thirdItem.name}}</MenuItem> -->
                </MenuGroup>
              </Submenu>
            </Menu>
          </div>
        </div>
        <!-- 显示用户信息对话框 -->
        <!-- <button @click="showUserDialog">点击显示</button> -->
        <div data-v-11a02437 class="htu-layout">
          <div data-v-11a02437 class="layout-header htu-layout-header">
            <div class="nav">
              <div>安全管理/安全环保管理</div>
              <div class="rightdiv">
                <div class="info"></div>
                <div class="names" @click="showUserDialog">宋敬亭
                  <div class="headimg"></div>
                </div>
              </div>
            </div>
            <!-- <div data-v-11a02437 class="htu-breadcrumb">
              <span data-v-11a02437>
                <span class="htu-breadcrumb-item-link">Home</span>
                <span class="htu-breadcrumb-item-separator">/</span>
              </span>
              <span data-v-11a02437>
                <span class="htu-breadcrumb-item-link">Components</span>
                <span class="htu-breadcrumb-item-separator">/</span>
              </span>
              <span data-v-11a02437>
                <span class="htu-breadcrumb-item-link">Layout</span>
                <span class="htu-breadcrumb-item-separator">/</span>
              </span>
            </div> -->

          </div>

          <div class="layout-content">
            <div class="htu-layout-content">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户信息对话框(可修改密码) -->
    <div class="userinfo_dark" v-if="isShowUserDialog">
      <div class="content">
        <div class="left">
          <div class="image">
            <img src="@/assets/image/avatar.png" alt />
            <p>{{userInfo.username}}</p>
          </div>
          <button @click="logout">退出登陆</button>
          <p class="text">平安东江安环管理系统为深圳市华藤环境信息科技有限公司开发的一套系统</p>
          <p class="version">版本号：V1.3.1</p>
        </div>
        <div class="right">
          <img src="@/assets/image/user_close.png" alt class="user_close" @click="closeUserDialog" />
          <div class="item">
            <label>用户名</label>
            <div>{{userInfo.username}}</div>
          </div>
          <div class="item">
            <label>姓名</label>
            <div>{{userInfo.userName}}</div>
          </div>
          <div class="item">
            <label>所属部门</label>
            <div>{{userInfo.deptName}}</div>
          </div>
          <div class="item">
            <label>邮箱地址</label>
            <div>{{userInfo.email}}</div>
          </div>
          <div class="item">
            <label>原密码</label>
            <input type="text" v-model="password.oldPassword" />
            <!-- <img src="@/assets/image/success.png" alt class="success" /> -->
            <!-- <img src="@/assets/image/error.png" alt class="error" /> -->
          </div>
          <div class="item">
            <label>修改密码</label>
            <input type="password" v-model="password.newPassword" />
          </div>
          <div class="item">
            <label>确认密码</label>
            <input type="password" v-model="password.confirmPassword" />
          </div>
          <button @click="modifyPassword">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import treeMenu from '@/components/menu'
export default {
  components: { treeMenu },
  data() {
    return {
      menuArr: [],
      isShowUserDialog: false,
      userInfo: {}, // 用户信息
      password: {
        newPassword: '', // 新密码
        oldPassword: '', // 旧密码
        confirmPassword: '' // 确认密码
      }
      // isShowBtn: false // 显示正确按钮，错误按钮
    }
  },
  methods: {
    goPage(page) {
      var _self = this
      _self.$router.push({ path: '/page' + page })
    },
    getMenu() {
      var _self = this
      this.$api.sysApilist.navMenu().then(res => {
        // _self.menuArr = res.menuList;
        // _self.$store.commit('setMenuList', { menuList: res.menuList })
      })
    },
    // 获取安环所有数据字典
   

    // 显示用户信息对话框
    showUserDialog() {
      this.isShowUserDialog = true
      // 获取用户信息
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    // 关闭用户信息对话框
    closeUserDialog() {
      this.isShowUserDialog = false
      for (let key in this.password) {
        this.password[key] = ''
      }
    },
    // 修改密码
    modifyPassword() {
      if (this.password.newPassword !== this.password.confirmPassword) {
        return this.$Message.error('两次密码不正确')
      }
      this.$api.commonApilist
        .modifyPassword({
          newPassword: md5(this.password.newPassword),
          oldPassword: md5(this.password.oldPassword)
        })
        .then(res => {
          if (res.data.code === 0) {
            this.isShowUserDialog = false
          }
        })
    },
    // 退出登录
    // todo----------- 退出接口不通。501
    logout() {
      this.$api.commonApilist.logout().then(res => {
        // 清空state中的用户信息和localstorage与sessionstorage中的token
        // window.sessionStorage.removeItem('token')
        // // window.localStorage,removeItem('userInfo')
        // this.$store.commit('$_removeStorage','userInfo')
      })
    }
  },
  mounted() {
    // this.getMenu()
  },
  activated() {}
}
</script>
<style lang='less' scoped>
.layout-header {
  width: 100%;
  height: 86px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.htu-layout.htu-layout-has-sider {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.layout-single {
  height: 253px;
  margin-bottom: 48px;
  font-size: 14px;
  color: #fff;
}
.layout-sider {
  background: #ffffff;
  min-height: 600px;
  // margin-right: 135px;
  box-shadow: 3px 0px 5px 3px #c7c7c7;
}
.htu-layout {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex: auto;
  flex: auto;
  background: #f5f5f5;
}
.ivu-menu {
  width: 226px !important;
  box-sizing: border-box;
}
.ivu-menu-opened > :first-child {
  background-color: #397afd;
  color: white;
}
.nav {
  height: 86px;;
  color: #4e4e4e;
  width: 100%;
  height: 86px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 43px;
  font-size: 20px;
}
.rightdiv{
  width: 194px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info {
  width: 39px;
  height: 39px;
  margin-right: 20px;
  background: url('../assets/image/xiaoxi.png') no-repeat;
  background-size: 100% 100%;
}
.names{
  width: 135px;
  height: 39px;
  line-height: 39px;
  border-radius: 5px;
  border: 1px solid #979797;
  font-size: 14px !important;
  color: #686868;
  padding-left: 50px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;

}
.headimg{
  width: 31px;
  height: 31px;
  margin-right: 20px;
  background: url('../assets/image/logo.png') no-repeat;
  background-size: 100% 100%;
  border-radius: 50% 50%;
  position: absolute;
  left: 5px;
  top: 5px;
}

.userperson .ivu-menu-submenu {
  font-size: 14px !important;
  border: 1px solid #c7c7c7 !important;
  height: 38px !important;
  line-height: 38px !important;
  padding-left: 30px !important;
}
/deep/ .ivu-menu-horizontal {
  height: 39px;
}
.userperson .ivu-menu-submenu-title {
  position: relative;
}
.userperson .ivu-menu-submenu:hover > :first-child {
  border-bottom: none;
}
.userperson .ivu-menu-opened > :first-child {
  background-color: transparent !important;
  color: #686868;
}
.htu-layout-header {
  background: #ffffff;
  // padding: 30px 43px 21px 37px;
  line-height: 12px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.layout-content {
  background: #f5f5f5;
  min-height: 640px;
  padding-top: 1.77%;
  padding-left: 6.98%;
  width: 1318px;
  color: #4e4e4e;
}
.htu-breadcrumb {
  color: #4e4e4e;
  font-size: 20px;
  line-height: 28px;
}
.htu-breadcrumb-item-separator {
  margin: 0 8px;
  color: #dcdee2;
}

#logo {
  width: 226px;
  height: 122px;
  background-image: url(../assets//image/logo.png);
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: 100% 100%;
}
.htu-layout-content {
  border-radius: 8px 8px 0px 0px;
  // background-color: #fff;
}

// 用户信息对话框
.userinfo_dark {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(9, 9, 9, 0.5029);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 906px;
    height: 538px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    display: flex;
    overflow: hidden;
    .left {
      width: 429px;
      height: 600px;
      background: url('~@/assets/image/user_info.png');
      background-size: 100% 100%;
      transform: translateX(-3px);
      text-align: center;
      padding: 120px 99px 0 89px;
      .image {
        img {
          width: 126px;
          height: 126px;
        }
        p {
          font-weight: 500;
          font-size: 28px;
          color: #fff;
          margin: 10px 0 97px 0;
        }
      }
      button {
        border: none;
        outline: none;
        width: 196px;
        height: 38px;
        background: rgba(255, 255, 255, 0.49);
        border-radius: 8px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
      .text,
      .version {
        font-size: 10px;
        color: #fff;
      }
      .text {
        margin: 20px 0 9px 0;
      }
    }
    .right {
      padding: 64px 47px 0 66px;
      position: relative;
      .user_close {
        width: 28px;
        height: 28px;
        position: absolute;
        top: 18px;
        right: 18px;
        cursor: pointer;
      }
      .item {
        display: flex;
        height: 40px;
        line-height: 40px;
        margin-bottom: 14px;
        position: relative;
        div {
          color: #a0a3a4;
        }
        label {
          width: 114px;
          text-align: left;
          display: inline-block;
        }
        input {
          background: rgba(245, 245, 245, 1);
          border-radius: 8px;
          outline: none;
          border: none;
          padding: 6px 12px 9px 18px;
          color: #4e4e4e;
        }
        .success,
        .error {
          width: 28px;
          height: 28px;
          position: absolute;
          top: 6px;
          right: 12px;
          cursor: pointer;
        }
      }
      button {
        position: absolute;
        outline: none;
        border: none;
        width: 83px;
        height: 44px;
        cursor: pointer;
        background: linear-gradient(
          131deg,
          rgba(8, 83, 243, 1) 0%,
          rgba(68, 131, 255, 1) 100%
        );
        border-radius: 8px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        right: 47px;
        bottom: 48px;
      }
    }
  }
}
</style>
