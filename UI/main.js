const express = require('express');
require('dotenv').config({path: 'conf.env'});
const app = express();
app.use(express.static('public'));

const {createProxyMiddleware} = require('http-proxy-middleware');
const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
    console.log(`API requests will be proxied to: ${apiProxyTarget}`);
    app.use('/graphql', createProxyMiddleware({ target: apiProxyTarget }));
}

const port = process.env.UI_PORT;
app.listen(port, function () {
    console.log(`App started on port ${port}`);
});

