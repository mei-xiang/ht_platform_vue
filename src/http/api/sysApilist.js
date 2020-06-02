import base from './base'; // 导入接口域名列表
import axios from '@/http/index'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const sysApilist = {    
   // 退出
    logout(){
        return axios.get(`${base.sq}/tenantauthserver/api/oauth/token`);    
    },
    // 侧边导航栏  
    navMenu(){
        return axios.get(`${base.sq}/platformauthserver/api/member`);    
    },
    // 其他接口…………
}

export default sysApilist;

