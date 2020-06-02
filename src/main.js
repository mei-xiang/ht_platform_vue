// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import '@/doc/styles/iview.css';
import './assets/css/admin.css'
import './assets/css/common.css'

import './assets/iconfont/iconfont.css'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
  zIndex: 9999,
  //隐藏不需要的工具栏
  navbar: false,
  toolbar: false,
  button: false,
})

import Format from "@/components/Format/Format"
import GlobalDataUtils from "@/utils/main"


import 'lib-flexible/flexible'

import Storage from '../src/utils/storage'

import ViewUI from './index'
import Print from 'vue-print-nb'


import LoadDialog from './components/loadDialog/index' // 海豚loading加载
import AbnormalDialog from './components/abnormal-dialog/index' // 异常状态对话框

import api from './http/api/index'

Vue.use(ViewUI)
Vue.use(LoadDialog)
Vue.use(Print);


Vue.prototype.Format = Format;
Vue.prototype.LoadDialog = LoadDialog;
Vue.prototype.GlobalDataUtils = GlobalDataUtils;
Vue.prototype.$Storage = Storage;
Vue.config.productionTip = false
Vue.prototype.$abnormalDialog = AbnormalDialog
Vue.prototype.$api = api;


//未登录拦截
// router.beforeEach((to, from, next) => {
//   ViewUI.LoadingBar.start();
//   if (sessionStorage.getItem('token')) {
//     next();
//   }
//   else {
//     // 增加未登录弹窗提示
//       next({
//           path: '/login',
//           query: {redirect: to.fullPath}
//       })
//   }
// })

// router.afterEach(route => {
//   ViewUI.LoadingBar.finish();
// });

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
