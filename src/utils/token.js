import axios from 'axios';

// token相关配置
const TOKEN_CONFIG = {
    tokenUrl: '/api/jadp/auth/session/thirdSystem',
    tokenKey: 'access-token',
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
            localStorage.setItem(TOKEN_CONFIG.tokenKey, response.data.token);
            // localStorage.setItem('access_token', response.data.token);

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
 * 获取存储的token
 */
export const getStoredToken = () => {
    return localStorage.getItem(TOKEN_CONFIG.tokenKey);
    //  return   localStorage.setItem('access_token', response.data.token);

};

/**
 * 清除token
 */
export const clearToken = () => {
    localStorage.removeItem(TOKEN_CONFIG.tokenKey);
    // return  localStorage.removeItem('access_token');

};

/**
 * 检查token是否存在
 */
export const hasToken = () => {
    return !!getStoredToken();
};