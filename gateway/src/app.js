const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const {
  createProxyMiddleware
} = require('http-proxy-middleware');

const { productService } = require('./config/services');

const app = express();

app.use(helmet());

app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'api-gateway'
  });
});

app.use(
  '/api',
  createProxyMiddleware({
    target: productService,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  })
);

module.exports = app;