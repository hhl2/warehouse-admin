import axios from 'axios';
// import { getToken, getStoredToken, hasToken, clearToken } from './token'; // 已注释：禁用token获取
import { ElMessage } from 'element-plus'

// 从 config.json 加载配置
let configLoaded = false;
let apiBaseURL = '/'; // 默认值

// 异步加载配置
export const loadConfig = async () => {
  if (configLoaded) return apiBaseURL;

  try {
    const response = await fetch('/config.json');
    const config = await response.json();
    apiBaseURL = config.apiBaseURL || '/';
    configLoaded = true;
    console.log('✅ API 地址已从 config.json 加载:', apiBaseURL);

    // 更新所有 axios 实例的 baseURL
    serviceWithToken.defaults.baseURL = apiBaseURL;
    serviceWithoutToken.defaults.baseURL = apiBaseURL;

    return apiBaseURL;
  } catch (error) {
    console.warn('⚠️ 加载 config.json 失败，使用默认配置:', error);
    configLoaded = true;
    return apiBaseURL;
  }
};

// 基础配置
const baseConfig = {
  baseURL: apiBaseURL, // 将从 config.json 动态加载
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'ctp-t-code': 'dwglptgyl',
    'Access-Control-Allow-Origin': '*'
  },
  // withCredentials: true
};

// 错误处理函数
const handleRequestError = (error, config) => {
  const { response, code, message } = error;

  // 超时错误
  if (code === 'ECONNABORTED' || message?.includes('timeout')) {
    console.warn('请求超时:', config?.url);
    ElMessage.warning('网络请求超时，请检查网络连接或稍后重试');
    return {
      code: -1,
      message: '网络请求超时，请检查网络连接或稍后重试',
      success: false,
      data: null
    };
  }

  // 网络错误
  if (!response) {
    console.warn('网络连接错误:', config?.url);
    ElMessage.warning('网络连接失败，请检查网络设置');
    return {
      code: -2,
      message: '网络连接失败，请检查网络设置',
      success: false,
      data: null
    };
  }

  const { status, data } = response;

  // 根据不同状态码处理
  switch (status) {
    case 400:
      ElMessage.warning(data?.message || '请求参数错误');
      return {
        code: 400,
        message: data?.message || '请求参数错误',
        success: false,
        data: null
      };
    case 401:
      ElMessage.warning('登录已过期，请重新登录');
      return {
        code: 401,
        message: '登录已过期，请重新登录',
        success: false,
        data: null
      };
    case 403:
      ElMessage.warning('没有权限访问该资源');
      return {
        code: 403,
        message: '没有权限访问该资源',
        success: false,
        data: null
      };
    case 404:
      ElMessage.warning('请求的资源不存在');
      return {
        code: 404,
        message: '请求的资源不存在',
        success: false,
        data: null
      };
    case 500:
    case 502:
    case 503:
      ElMessage.error('服务器繁忙，请稍后重试');
      return {
        code: status,
        message: '服务器繁忙，请稍后重试',
        success: false,
        data: null
      };
    default:
      ElMessage.error(data?.message || '网络请求失败');
      return {
        code: status || -1,
        message: data?.message || '网络请求失败',
        success: false,
        data: null
      };
  }
};

// ==================== 需要Token的实例 ====================
const serviceWithToken = axios.create(baseConfig);

// Token相关变量
let isRefreshing = false;
let retryRequests = [];

const executeRetryRequests = (token) => {
  retryRequests.forEach(cb => cb(token));
  retryRequests = [];
};

// 请求拦截器 - 带Token
serviceWithToken.interceptors.request.use(
  async (config) => {
    // 添加请求时间戳用于调试
    config._requestStartTime = Date.now();

    // ========== 已注释：禁用token获取逻辑 ==========
    // // 排除token获取接口本身
    // if (!config.url.includes('/auth/session/thirdSystem')) {
    //   let token = getStoredToken();

    //   if (!token && !isRefreshing) {
    //     try {
    //       console.log('首次获取token...');
    //       token = await getToken();
    //     } catch (error) {
    //       console.error('初始获取token失败:', error);
    //       // 不reject，继续请求，让后端返回401
    //     }
    //   }

    //   if (token) {
    //     config.headers['access-token'] = token;
    //     console.log('请求携带token:', token.substring(0, 20) + '...');
    //   }
    // }

    return config;
  },
  error => {
    console.error('请求拦截器错误:', error);
    // 返回友好的错误信息，而不是reject
    return Promise.resolve({
      data: {
        code: -1,
        message: '请求配置错误',
        success: false,
        data: null
      }
    });
  }
);

// 响应拦截器 - 带Token
serviceWithToken.interceptors.response.use(
  (response) => {
    const requestTime = Date.now() - response.config._requestStartTime;
    console.log(`请求成功: ${response.config.url} (${requestTime}ms)`);

    // 如果后端返回的数据格式正确，直接返回
    if (response.data && typeof response.data === 'object') {
      return response.data;
    }

    // 数据格式异常，返回默认成功格式
    return {
      code: 0,
      message: '请求成功',
      success: true,
      data: response.data
    };
  },
  async (error) => {
    const originalRequest = error.config;

    // ========== 已注释：禁用401 token刷新逻辑 ==========
    // // 401 token 刷新逻辑
    // if (error.response?.status === 401 &&
    //   !originalRequest?.url?.includes('/auth/session/thirdSystem') &&
    //   !originalRequest?._retry) {

    //   console.log('检测到401错误，尝试刷新token...');

    //   if (isRefreshing) {
    //     console.log('token刷新中，加入重试队列');
    //     return new Promise((resolve) => {
    //       retryRequests.push((token) => {
    //         originalRequest.headers['access-token'] = token;
    //         resolve(serviceWithToken(originalRequest));
    //       });
    //     });
    //   }

    //   originalRequest._retry = true;
    //   isRefreshing = true;

    //   try {
    //     console.log('开始刷新token...');
    //     const newToken = await getToken();
    //     isRefreshing = false;

    //     console.log('token刷新成功，重试原请求');
    //     originalRequest.headers['access-token'] = newToken;
    //     executeRetryRequests(newToken);

    //     return serviceWithToken(originalRequest);
    //   } catch (refreshError) {
    //     isRefreshing = false;
    //     clearToken();
    //     console.error('刷新token失败:', refreshError);
    //     // 返回友好的错误信息，而不是reject
    //     // return handleRequestError(error, originalRequest);
    //   }
    // }

    // 其他错误，返回友好的错误信息
    // return handleRequestError(error, originalRequest);
  }
);

// ==================== 不需要Token的实例 ====================
const serviceWithoutToken = axios.create(baseConfig);

// 不需要Token的响应拦截器（只返回数据）
serviceWithoutToken.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('无Token请求错误:', error);
    // 返回友好的错误信息，而不是reject
    return handleRequestError(error, error.config);
  }
);

// 导出两个实例
export { serviceWithToken, serviceWithoutToken };

// 默认导出带Token的实例（保持向后兼容）
export default serviceWithToken;