const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080', // Substitua pela URL do seu servidor backend
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: { '^/api': '' },
    })
  );
};
