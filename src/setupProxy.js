/*
 * @Description: 配置反向代理
 * @Author: wanghexing
 * @Date: 2021-12-24 14:28:52
 * @LastEditors: wanghexing
 * @LastEditTime: 2021-12-24 14:53:29
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://i.maoyan.com',
      changeOrigin: true,
    })
  );
};