---
title: Next.js 配置接口跨域代理转发
date: "2019-11-11T22:20:03.284Z"
description: ""
---

使用 create-next-app 创建的 Next.js 项目配置接口跨域代理转发需要用到 custom server 功能。
先安装好 express 和 http-proxy-middleware

```shell script
yarn add express http-proxy-middleware
```

在项目根目录下新建 server.js 文件，写入以下代码

```javascript
// server.js
const next = require("next");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const devProxy = {
    "/api": {
        target: "http://localhost:8000", // 端口自己配置合适的
        pathRewrite: {
            "^/api": "/"
        },
        changeOrigin: true
    }
};

const port = Number.parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({
    dev
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    if (dev && devProxy) {
        Object.keys(devProxy).forEach(function (context) {
            server.use(createProxyMiddleware(context, devProxy[context]));
        });
    }

    server.all("*", (req, res) => {
        handle(req, res);
    });

    server.listen(port, err => {
        if (err) {
            throw err;
        }
        console.log(`> Ready on http://localhost:${port}`);
    });
}).catch(err => {
    console.log("An error occurred, unable to start the server");
    console.log(err);
});

```

相应地修改 package.json

```text
"scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
},
```

如下，所有接口以 `/api` 开头即可。

```javascript
const { data } = await axios.post('/api/users/', options);
```
