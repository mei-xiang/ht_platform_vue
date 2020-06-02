import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

const state = {
    //存放的键值对就是所要管理的状态
    userInfo:null,
    menuList:[],
    dictType:{}
}

const getters = {   //实时监听state值的变化(最新状态)
    getUserInfo: function (state) {
        if (!state.userInfo) {
          state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
        }
        return state.userInfo
    },
    getDictType(state){  
       return state.dictType
    },
    getmenuList(state){  
        return state.menuList
     },

};
const mutations = {
   
    setUserInfo (state, value) {
        state.userInfo = value
        localStorage.setItem('userInfo', JSON.stringify(value))
    },
    setMenuList(state,value){
        state.menuList = value
    },
    setDictType(state,value){
        state.menuList = value
    },
    $_removeStorage (state) {
        state.userInfo = null
        localStorage.removeItem('userInfo')
    }
  
}

//创建VueX对象
const store = new Vuex.Store({
    state,
    getters,
    mutations
});
export default store
