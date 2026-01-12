// 用于本地运行 dist 文件夹，并提供代理功能
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 8080;

// 后端服务器地址 - 可以随时修改这里
const TARGET = 'http://10.151.223.203:8010';

// 代理配置选项
const proxyOptions = {
    target: TARGET,
    changeOrigin: true,
    logLevel: 'debug'
};

// 代理多个路径 - 不使用 pathRewrite，保持原始路径
app.use('/api', createProxyMiddleware(proxyOptions));
app.use('/gmp', createProxyMiddleware(proxyOptions));
app.use('/data.Info', createProxyMiddleware(proxyOptions));
app.use('/dljcboot', createProxyMiddleware(proxyOptions));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist')));

// SPA 路由支持
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ 服务器运行在 http://localhost:${PORT}`);
    console.log(`✅ 代理后端地址: ${TARGET}`);
    console.log(`📝 代理路径: /api, /gmp, /data.Info, /dljcboot`);
    console.log(`� 修改后端地址: 编辑 serve.js 第10行的 TARGET 变量`);
});
