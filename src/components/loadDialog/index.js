import LoadDialog from "./LoadDialog.vue"

const obj = {}

obj.install = function(Vue) {
  // 创建组件构造器
  const toastContrustor = Vue.extend(LoadDialog)

  // 创建组件对象
  const loadDialog = new toastContrustor()

  // 将组件挂载到元素上
  loadDialog.$mount(document.createElement('div'))

  // 将元素添加到 body 里
  document.body.appendChild(loadDialog.$el)

  // 将组件对象挂载到Vue原型上
  Vue.prototype.$loadDialog = loadDialog
}

export default obj
