import axios from 'axios'

// 创建axios实例
const request = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    //baseURL: 'http://127.0.0.1:801/wx/',
    // 超时
    timeout: 2000,
    // 设置Content-Type，规定了前后端的交互使用json
    headers: {'Content-Type': 'application/json;charset=utf-8'}
})

//请求拦截
request.interceptors.request.use((config)=>{
    config.url = "/wx" + config.url;
    //拿到token
    const token = localStorage.getItem("token");
    if(token){
        config.headers!.token = token;
    }
    return config;
},error => {
    return Promise.reject(error);
})

//响应拦截
request.interceptors.response.use((response)=>{
    return response
},(error)=>{
    //异常提示
    console.log("响应异常",error)
})
export default request