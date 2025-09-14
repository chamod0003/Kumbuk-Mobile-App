const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
app.use(express.json());

// Proxy routes to microservices
app.use('/send-otp', createProxyMiddleware({ target: 'http://localhost:4002', changeOrigin: true }));
app.use('/verify-otp', createProxyMiddleware({ target: 'http://localhost:4002', changeOrigin: true }));
app.use('/register', createProxyMiddleware({ target: 'http://localhost:4003', changeOrigin: true }));

app.get('/', (req, res) => res.send('API Gateway running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway listening on port ${PORT}`));
