// import AbnormalDialog from './AbnormalDialog.vue'

// const obj = {}

// obj.install = function (Vue) {
//   const dialogContrustor = Vue.extend(AbnormalDialog)

//   const abnormalDialog = new dialogContrustor()

//   abnormalDialog.$mount(document.createElement('div'))

//   document.body.appendChild(abnormalDialog.$el)

//   // 将异常对话框组件对象 挂载到Vue原型
//   Vue.prototype.$abnormalDialog = abnormalDialog
// }

// export default obj

import Vue from "vue";
import AbnormalDialog from "./AbnormalDialog.vue";

let dialogConstructor = Vue.extend(AbnormalDialog);

let theDialog = function(text) {
  return new Promise((resolve, reject) => {
    //promise封装，confirm执行resolve，cancel执行reject
    let dialogDom = new dialogConstructor({
      el: document.createElement("div")
    });
    document.body.appendChild(dialogDom.$el); //new一个对象，然后插入body里面
    // dialogDom.text = text
    dialogDom.text = Object.assign({}, dialogDom.text, text); //为了使dialog的扩展性更强，这个采用对象的方式传入，所有的字段都可以根据需求自定义
    dialogDom.confirm = function() {
      // console.log("点击的confirm");
      dialogDom.isShow = false;
      resolve("确认");
    };
    dialogDom.cancel = function() {
      // console.log("点击的cancel");
      dialogDom.isShow = false;
      reject("取消");
    };

    if (dialogDom.text.type == 3) {
      setTimeout(() => {
        dialogDom.isShow = false;
      }, 2000);
    }
  });
};

export default theDialog;
