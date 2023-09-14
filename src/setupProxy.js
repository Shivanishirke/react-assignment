const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/API',
    createProxyMiddleware({
//       target: env.REACT_APP_BASE_URL,
         target: 'https://testffc.nimapinfotech.com',
      changeOrigin: true,
    })
  );
};