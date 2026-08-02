import axios from "axios";
import { ElMessage } from "element-plus";
//创建axios实例
//VITE_SERVE 为空时退化为纯前端部署（baseURL 仅保留 /v1 前缀，由前端代理/网关处理）
const baseURL = import.meta.env.VITE_SERVE
  ? import.meta.env.VITE_SERVE + import.meta.env.VITE_APP_BASE_API
  : import.meta.env.VITE_APP_BASE_API
const request = axios.create({
    baseURL,
    timeout: 5000
});

//请求拦截器
request.interceptors.request.use(config => {
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    const data = response.data
    if (data && data.code === 401) {
        //登录过期
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('TOKEN', '')
        }
        if (typeof location !== 'undefined') {
            location.reload()
        }
    }
    return data;
}, (error) => {
    if (error.code === 'ERR_CANCELED') {
        //请求被取消，正常拒绝
        return Promise.reject(error);
    }
    //处理网络错误
    let msg = '';
    if (error.code === 'ERR_NETWORK') {
        msg = '网络连接异常，请检查网络';
    } else if (!error.response) {
        msg = '网络请求失败，请稍后重试';
    } else {
        const status = error.response.status;
        switch (status) {
            case 401:
                msg = "登录过期";
                break;
            case 403:
                msg = '无权访问';
                break;
            case 404:
                msg = "请求地址错误";
                break;
            case 500:
                msg = "服务器出现问题";
                break;
            default:
                msg = "无网络";
        }
    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;