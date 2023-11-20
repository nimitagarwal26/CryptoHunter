const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.coingecko.com', // Replace with the API server URL
      changeOrigin: true,
    })
  );
};
