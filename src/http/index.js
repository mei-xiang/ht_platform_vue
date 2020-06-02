import Vue from 'vue'
import axios from 'axios';
import QS from 'qs';

// const CancelToken = axios.CancelToken

// axios.defaults.timeout = 5000;
var instance = axios.create({ timeout: 1000 * 5});
instance.defaults.headers.post['Content-Type'] = 'text/plain'



// const removePending = (key, isRequest = false) => {
//   if (pending[key] && isRequest) {
//     pending[key]('取消重复请求')
//   }
//   delete pending[key]
// }
// const getRequestIdentify = (config, isReuest = false) => {
//   let url = config.url
//   if (isReuest) {
//     url = config.baseURL + config.url.substring(1, config.url.length)
//   }
//   return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
// }



//http request 拦截器
instance.interceptors.request.use(
  config => {
    // config.data = JSON.stringify(config.data);
    //  // 拦截重复请求(即当前正在进行的相同请求)
    // let requestData = getRequestIdentify(config, true)
    // removePending(requestData, true)
    // config.cancelToken = new CancelToken((c) => {
    //   pending[requestData] = c
    // })
    window.vm.$loadDialog.show();
    // 开启加载中提示框
    // Vue.VueComponent.$loadDialog.show();
    // config.headers['Content-Type'] = 'text/plain';
    config.headers['Content-Type'] = 'application/json';
    // 分子公司事业部
    if(config.params){
        if(config.params.hasCompanyId){
            config.headers['companyIds'] = config.params.hasCompanyIdList
        }
    }
    let token = sessionStorage.getItem('token');
    if(token){
      config.headers.Authorization = "bearer " + token.slice(1,token.length-1)
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//响应拦截器即异常处理
instance.interceptors.response.use(response => {
    // 关闭加载中提示框
    window.vm.$loadDialog.hide();
    if (response.status === 200) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response);
    }

}, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
            console.log('错误请求')
          break;
        case 401:
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                  redirect: router.currentRoute.fullPath
              }
          });
        }, 1000);
        break;
          break;
        case 403:
          console.log('拒绝访问')
          break;
        case 404:
          console.log('网络请求不存在')
          break;
        case 405:
          console.log('请求方法未允许')
          break;
        case 408:
          console.log('请求超时')
          break;
        case 500:
          console.log('服务器端出错')
          break;
        case 501:
          console.log('网络未实现')
          break;
        case 502:
          console.log('网络错误')
          break;
        case 503:
          console.log('服务不可用')
          break;
        case 504:
          console.log('网络超时')
          break;
        case 505:
          console.log('http版本不支持该请求')
          break;
        default:
          console.log(`连接错误${err.response.status}`)
      }
    } else {
      console.log('连接到服务器失败')
       // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // if (!window.navigator.onLine) {
      //     store.commit('changeNetwork', false);
      // } else {
      //     return Promise.reject(error);
      // }

    }
    return Promise.resolve(err.response)
})

export default instance;
