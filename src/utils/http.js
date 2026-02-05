import { useUserStore } from "@/stores/userStore";
import axios from "axios";
import { ElMessage } from 'element-plus'
import router from "@/router";

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
const httpInstance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 添加请求拦截器
httpInstance.interceptors.request.use( (config) => {
    // 在发送请求之前做些什么
    // TODO 2. 携带token
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
httpInstance.interceptors.response.use( (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const userStore = useUserStore()
    // 错误的默认情况 => 只要给提示
    ElMessage.error(error.response.data.message || '服务异常')
    // TODO 5. 处理401错误
    // 错误的特殊情况 => 权限不足 或 token过期 => 拦截到登录
    if(error.response?.status === 401) {
      userStore.clearUserInfo()
      // useRouter() 必须在 Vue 组件的 setup() 函数或组合式函数中调用，此处仅为js环境
      router.push('/login')
    }
    return Promise.reject(error);
  });

export default httpInstance
export { baseURL }
