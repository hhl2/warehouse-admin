import axios from 'axios';

// token相关配置
const TOKEN_CONFIG = {
    tokenUrl: '/api203/jadp/auth/session/thirdSystem',
    tokenKey: 'access-token',
    tokenTimestampKey: 'access-token-timestamp', // 存储token获取时间的key
    expirationHours: 8, // token过期时间（小时）
    authInfo: {
        // account: "qyznjcpt@qy.gd.csg.cn",
        // password: "36AAE1DFB66C734AAC7C9C658B96358F",
        // authCode: "78BDDBD09D9B41809F3803DEF16E47CF",
        // provinceCode: "03",
        // bureauCode: "0306",

        account: "zhihui@qy.csg",
        password: "0F41F9FF9C8ECAC97465A8340C45F083",
        authCode: "A928DD9A7E0E4FD3B5D96CD49202207E",
        provinceCode: "03",
        bureauCode: "0318"

    }
};

/**
 * 获取token
 */
export const getToken = async () => {
    try {
        const response = await axios.post(TOKEN_CONFIG.tokenUrl, TOKEN_CONFIG.authInfo);
        if (response.data && response.data.token) {
            // 存储token
            localStorage.setItem(TOKEN_CONFIG.tokenKey, response.data.token);
            // 存储当前时间戳
            localStorage.setItem(TOKEN_CONFIG.tokenTimestampKey, Date.now().toString());

            return response.data.token;
        } else {
            throw new Error('获取token失败：响应数据格式不正确');
        }
    } catch (error) {
        console.error('获取token失败:', error);
        throw error;
    }
};


/**
 * 检查token是否过期
 */
export const isTokenExpired = () => {
    const timestamp = localStorage.getItem(TOKEN_CONFIG.tokenTimestampKey);
    if (!timestamp) {
        return true; // 没有时间戳，认为已过期
    }

    const tokenTime = parseInt(timestamp, 10);
    const currentTime = Date.now();
    const expirationTime = TOKEN_CONFIG.expirationHours * 60 * 60 * 1000; // 转换为毫秒

    return (currentTime - tokenTime) > expirationTime;
};

/**
 * 获取存储的token（自动检查过期）
 */
export const getStoredToken = () => {
    // 检查token是否过期
    if (isTokenExpired()) {
        console.log('Token已过期，自动清除');
        clearToken();
        return null;
    }

    return localStorage.getItem(TOKEN_CONFIG.tokenKey);
};

/**
 * 清除token
 */
export const clearToken = () => {
    localStorage.removeItem(TOKEN_CONFIG.tokenKey);
    localStorage.removeItem(TOKEN_CONFIG.tokenTimestampKey);
};

/**
 * 检查token是否存在
 */
export const hasToken = () => {
    return !!getStoredToken();
};