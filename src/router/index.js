import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Layout from '@/components/layout'


//各个板块的路由
import sys from './sys'
import bpms from './bpms'


Vue.use(Router)

export default new Router({
  mode:'history',
  // base:"/wf/",
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve=>(require(["@/pages/login"],resolve))
    },
    {
      path: '/',redirect: '/page/userWorkBench',
      component: resolve=>(require(["@/pages/userWorkBench"],resolve))
    },
    {
      path: '/page',
      name: 'Layout',
      component: resolve=>(require(["@/components/layout"],resolve)),
      children: [
          {
            path: '/page/userWorkBench',
            name: 'userWorkBench',
            meta: {
              title: '首页'
            },
            component: resolve=>(require(["@/pages/userWorkBench"],resolve))
          },
            ...bpms,
            ...sys,
      ]
    },
  ]
})
