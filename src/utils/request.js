import axios from 'axios';
import { getToken, getStoredToken, hasToken, clearToken } from './token'; // 已注释：禁用token获取
import { ElMessage } from 'element-plus'

// 从外部传入配置
let configLoaded = false;
let apiBaseURL = '/'; // 默认值
let globalParams = {}; // 全局参数
export let globalConfig = {}; // 存储完整配置对象

// 由 App.vue 负责网络请求后，调用此方法注入配置
export const setConfig = (config) => {
  if (configLoaded) return;
  globalConfig = config; // 保存完整配置

  apiBaseURL = config.apiBaseURL || '/';
  globalParams = config.globalParams || {};
  configLoaded = true;
  console.log('✅ axios 已接收并应用全局配置:', { apiBaseURL, globalParams });

  // 更新所有 axios 实例的 baseURL
  serviceWithToken.defaults.baseURL = apiBaseURL;
  serviceWithoutToken.defaults.baseURL = apiBaseURL;
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

// 错误处理函数 (已根据用户要求注释内容)
const handleRequestError = (error, config) => {
  /*
  const { response, code, message } = error;
  if (code === 'ECONNABORTED' || message?.includes('timeout')) {
    ElMessage.warning('网络请求超时');
  }
  if (!response) {
    ElMessage.error('网络连接失败');
  }
  */
  return Promise.reject(error);
};

// ==================== 需要Token的实例 ====================
const serviceWithToken = axios.create(baseConfig);

// Token相关变量
let isRefreshing = false;
let tokenPromise = null; // 用于存储正在获取 token 的 promise
let retryRequests = []; // 重试队列

const executeRetryRequests = (token) => {
  retryRequests.forEach(cb => cb(token));
  retryRequests = [];
};

// 请求拦截器 - 带Token
serviceWithToken.interceptors.request.use(
  async (config) => {
    config._requestStartTime = Date.now();

    // 排除 token 获取接口本身
    if (!config.url.includes('/auth/session/thirdSystem')) {
      let token = getStoredToken();

      // 如果没有 token，则发起获取 token 的请求
      if (!token) {
        console.log(`[Request] 无Token, 准备获取: ${config.url}`);
        if (!isRefreshing) {
          isRefreshing = true;
          tokenPromise = getToken().then(res => {
            isRefreshing = false;
            return res;
          }).catch(err => {
            isRefreshing = false;
            throw err;
          });
        }

        try {
          token = await tokenPromise;
          console.log('[Request] Token 获取成功，继续业务请求');
        } catch (err) {
          console.error('[Request] Token 获取失败，业务请求可能受限');
        }
      }

      if (token) {
        config.headers['access-token'] = token;
      }
    }

    // ========== 注入全局参数 ==========
    // 增加 skipGlobalParams 参数，用于按需跳过全局参数注入
    if (!config.skipGlobalParams && globalParams && Object.keys(globalParams).length > 0) {
      if (config.method?.toLowerCase() === 'get' || config.method?.toLowerCase() === 'delete') {
        config.params = { ...globalParams, ...config.params };
      } else {
        // 如果是 POST/PUT 且没有 data，初始化为一个对象
        if (!config.data) config.data = {};
        // 只有当 data 是对象时才进行合并
        if (typeof config.data === 'object' && !(config.data instanceof FormData)) {
          config.data = { ...globalParams, ...config.data };
        }
      }
    }

    return config;
  },
  error => {
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器 - 带Token
serviceWithToken.interceptors.response.use(
  async (response) => {
    const requestTime = Date.now() - response.config._requestStartTime;
    console.log(`请求成功: ${response.config.url} (${requestTime}ms)`);

    // 如果 HTTP 状态为 200，但业务 code 为 500，且未被标记过重试
    if (response.data && response.data.code === 500 && !response.config._retry) {
      console.warn('检测到业务状态码 500，尝试刷新 token...', response.config.url);

      const originalRequest = response.config;
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          retryRequests.push((token) => {
            originalRequest.headers['access-token'] = token;
            resolve(serviceWithToken(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        console.log('开始刷新token (来自 500)...');
        const newToken = await getToken();
        isRefreshing = false;

        executeRetryRequests(newToken);
        originalRequest.headers['access-token'] = newToken;
        return serviceWithToken(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        clearToken();
        console.error('刷新token失败:', refreshError);
        return response.data; // 如果刷新也失败了，就直接返回 500 吧
      }
    }

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

    // 401 token 刷新逻辑
    if (error.response?.status === 401 &&
      !originalRequest?.url?.includes('/auth/session/thirdSystem') &&
      !originalRequest?._retry) {

      console.log('检测到401错误，尝试刷新token...');

      if (isRefreshing) {
        console.log('token刷新中，加入重试队列');
        return new Promise((resolve) => {
          retryRequests.push((token) => {
            originalRequest.headers['access-token'] = token;
            resolve(serviceWithToken(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('开始刷新token (来自 401)...');
        const newToken = await getToken();
        isRefreshing = false;

        console.log('token刷新成功，重试原请求');
        originalRequest.headers['access-token'] = newToken;
        executeRetryRequests(newToken);

        return serviceWithToken(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        clearToken();
        console.error('刷新token失败:', refreshError);
        return handleRequestError(error, originalRequest);
      }
    }

    // 其他错误, 直接 reject让用户在控制台/网络面板能看到红色错误
    return handleRequestError(error, originalRequest);
  }
);

// ==================== 不需要Token的实例 ====================
const serviceWithoutToken = axios.create(baseConfig);

// 请求拦截器 - 无Token (同样注入全局参数)
serviceWithoutToken.interceptors.request.use(
  (config) => {
    if (!config.skipGlobalParams && globalParams && Object.keys(globalParams).length > 0) {
      if (config.method?.toLowerCase() === 'get' || config.method?.toLowerCase() === 'delete') {
        config.params = { ...globalParams, ...config.params };
      } else {
        if (!config.data) config.data = {};
        if (typeof config.data === 'object' && !(config.data instanceof FormData)) {
          config.data = { ...globalParams, ...config.data };
        }
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

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