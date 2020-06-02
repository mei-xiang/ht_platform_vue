
/**
 * 公司模块路由
 */
export default
[
   {
    path: '/login',
    name: 'login',
    component: resolve=>(require(["@/pages/login"],resolve))
   }

]