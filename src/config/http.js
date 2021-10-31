/**
 * http配置
 */

import axios from 'axios';
import qs from 'qs'
import mroumter from './router'
axios.defaults.timeout = 5000;
axios.defaults.baseURL ='http://119.23.69.23:6066/his';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true
//http request 拦截器
axios.interceptors.request.use(

    config => {
        if (config.headers.a != null) {
        } else {
        config.data = JSON.stringify(config.data);
        config.headers = {
            "Content-Type": "application/json;charset=UTF-8",
        }}
        return config;
    },
        error => {
            return Promise.reject(err);
        }

);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        console.log(response)
        if(response.data.code ==404){
            // router.push({
            //   path:"/404",
            //  querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
            //
            //
            // })
            this.$message("404请求404")
        } else  if(response.data.code ==405){

        } else  if(response.data.code ==406){
            //转过去登陆觉得很法力恢复将来肯定是JFK的撒附近的刷卡积分卡扣设计开发商啊
            mroumter.push({ path: '/login' });
        }
        return response;
    },
    error => {
        if(error.status ==406){
            //转过去登陆
            console.log("error 转去登陆吧")
            $message("转去登陆吧");
        } else {
            console.log("400 error")
        }
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,   {
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

export function mdelete(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.delete(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

export  default  axios;
