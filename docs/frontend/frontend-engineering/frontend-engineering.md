# 前端工程化



https://github.com/kuitos/kuitos.github.io/issues/29

grunt gulp roolup webpack fis

https://github.com/fouber/blog/issues/10



https://medium.com/@craigmiller160/how-to-fully-optimize-webpack-4-tree-shaking-405e1c76038







## [何谓工程化](https://zhuanlan.zhihu.com/p/24575395)

所谓工程化，即是面向某个产品需求的技术架构与项目组织，工程化的根本目标即是以尽可能快的速度实现可信赖的产品。尽可能短的时间包括开发速度、部署速度与重构速度，而可信赖又在于产品的可测试性、可变性以及Bug的重现与定位。

- 开发速度：开发速度是最为直观、明显的工程化衡量指标，也是其他部门与程序员、程序员之间的核心矛盾。绝大部分优秀的工程化方案首要解决的就是开发速度，不过笔者一直也会强调一句话，磨刀不误砍材工，我们在追寻局部速度最快的同时不能忽略整体最优，初期单纯的追求速度而带来的技术负债会为以后阶段造成不可弥补的损害。
- 部署速度：笔者在日常工作中，最长对测试或者产品经理说的一句话就是，我本地改好了，还没有推送到线上测试环境呢。在DevOps概念深入人心，各种CI工具流行的今天，自动化编译与部署帮我们省去了很多的麻烦。但是部署速度仍然是不可忽视的重要衡量指标，特别是以NPM为代表的难以捉摸的包管理工具与不知道什么时候会抽个风的服务器都会对我们的编译部署过程造成很大的威胁，往往项目依赖数目的增多、结构划分的混乱也会加大部署速度的不可控性。
- 重构速度：听产品经理说我们的需求又要变了，听技术Leader说最近又出了新的技术栈，甩现在的十万八千里。
- 可测试性：现在很多团队都会提倡测试驱动开发，这对于提升代码质量有非常重要的意义。而工程方案的选项也会对代码的可测试性造成很大的影响，可能没有无法测试的代码，但是我们要尽量减少代码的测试代价，鼓励程序员能够更加积极地主动地写测试代码。
- 可变性：程序员说：这个需求没法改啊！
- Bug的重现与定位：没有不出Bug的程序，特别是在初期需求不明确的情况下，Bug的出现是必然而无法避免的，优秀的工程化方案应该考虑如何能更快速地辅助程序员定位Bug。

软件工程化关注的是**性能、稳定性、可用性、可维护性**等方面，一切以这些为目标的工作都是"前端工程化"。

至于模块化、组件化、XX 打包方案、制定自动化流程、制定开发规范，这些都是"术"。可能现在是这样，过两年又变了。并且每个项目自身特点不同，所有这些"术"都不应该成为衡量一个项目是否做了"前端工程化"的标准。

至于性能、稳定性、可用性、可维护性这些才是开发者需要持续关注的问题。



作者：Roscoe
链接：https://www.zhihu.com/question/24558375/answer/297579737
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



## webpack优化

webpack在一线开发中的优化

## 一 、开启多核压缩 [uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)

To begin, you'll need to install `uglifyjs-webpack-plugin`:

```
$ npm install uglifyjs-webpack-plugin --save-dev
```

Then add the plugin to your `webpack` config. For example:

**webpack.config.js**

```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
 
module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
```

配置项

### `parallel`

类型：`Boolean|Number` 默认：`false`

使用多进程并行运行来提高构建速度。默认并发运行数：`os.cpus().length - 1`。

> ℹ️并行化可以显着加速您的构建，因此**强烈建议**。

#### `Boolean`

启用/禁用多进程并行运行。

**webpack.config.js**

```js
const os = require('os')   //引入os
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
       // parallel: true,    //默认系统核数减一
          parallel： os.cpus().length  //配置为cpu数
      }),
    ],
  },
};
```

另一个老牌 多核插件[webpack-parallel-uglify-plugin](https://www.npmjs.com/package/webpack-parallel-uglify-plugin)

## 二、监控你的面板 ：速度测量插件 [speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin)

这个插件非常重要 
  ![](https://img.dubiqc.com/201903/12065359.png-sign)

## Install

```
npm install --save-dev speed-measure-webpack-plugin
```

or

```
yarn add -D speed-measure-webpack-plugin
```

## Requirements

SMP requires at least **Node v6**. But otherwise, accepts **all webpack** versions (1, 2, 3, and 4).

## Usage

Change your webpack config from

```
const webpackConfig = {
  plugins: [
    new MyPlugin(),
    new MyOtherPlugin()
  ]
}
```

to

```
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
 
const smp = new SpeedMeasurePlugin();
 
const webpackConfig = smp.wrap({
  plugins: [
    new MyPlugin(),
    new MyOtherPlugin()
  ]
});
```

and you're done! SMP will now be printing timing output to the console by default.

Check out the [examples folder](https://github.com/stephencookdev/speed-measure-webpack-plugin/blob/HEAD/examples) for some more examples.



## 三、开启通知面板 [webpack-build-notifier](https://www.npmjs.com/package/webpack-build-notifier)


  ```js
// webpack.config.js
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
 
module.exports = {
  // ... snip ...
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",      // 通知面板标题
      logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true                 // 成功消息是否开启
    })
  ],
  // ... snip ...
}
  ```



## 四、开启打包进度 [progress-bar-webpack-plugin](https://www.npmjs.com/package/progress-bar-webpack-plugin)

![](https://img.dubiqc.com/201903/13170029.png)

### Installation

```
npm i -D progress-bar-webpack-plugin
```

### Usage

Include the following in your Webpack config.

```
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
 
...
 
plugins: [
  new ProgressBarPlugin()
]
```



## 五、开发面版更清晰 [webpack-dashboard](https://www.npmjs.com/package/webpack-dashboard)

Webpack dev服务器的CLI仪表板

### 这是怎么回事？

使用webpack时，特别是对于开发服务器，您可能习惯于看到如下内容：

![](https://img.dubiqc.com/201903/13165951.png-sign)

这很酷，但它主要是噪音和滚动，而不是超级有用。这个插件改变了这一点。现在当你运行你的开发服务器时，你基本上在NASA工作：

![](https://img.dubiqc.com/201903/13170007.png-sign)

### 安装

```
npm install webpack-dashboard --save-dev
```

### 使用

**webpack-dashboard@^2.1.1需要Node 8或更高版本。**以前的版本支持到节点6。



First, import the plugin and add it to your webpack config, or apply it to your compiler:

```
// Import the plugin:
var DashboardPlugin = require("webpack-dashboard/plugin");
 
// If you aren't using express, add it to your webpack configs plugins section:
plugins: [new DashboardPlugin()];
 
// If you are using an express based dev server, add it with compiler.apply
compiler.apply(new DashboardPlugin());
```

If using a custom port, the port number must be included in the options object here, as well as passed using the -p flag in the call to webpack-dashboard. See how below:

```
plugins: [new DashboardPlugin({ port: 3001 })];
```

在最新版本中，您可以运行您的应用程序，并`webpack-dashboard`独立运行（通过安装`npm install webpack-dashboard -g`）或从您的运行webpack-dashboard `package.json`。因此，如果您的dev服务器启动脚本先前看起来像：

```
"scripts": {
    "dev": "node index.js"
}
```

您可以将其更改为：

```
"scripts": {
    "dev": "webpack-dashboard -- node index.js"
}
```

现在你可以像平常一样运行你的启动脚本



## 六、开启窗口标题 [node-bash-title](https://www.npmjs.com/package/node-bash-title)

一个NodeJS库，用于更改BASH shell的标题。在开发中有用：命名您的bash屏幕并显示错误或信息消息。你甚至可以使用uni-code🍻

![screeenshot](https://cloud.githubusercontent.com/assets/582533/20051424/3caa15b6-a4cf-11e6-8ce3-642523998a04.png)

## Install

```bash
  npm install node-bash-title --save
```

or

```bash
  yarn add node-bash-title
```

## Usage (in Node)

```js
  const setTitle = require('node-bash-title');
  setTitle('🍻  Server');
```

## Usage (in NPM scripts)

```json
 "scripts": {
    "start": "set-bash-title server && node server/app.js"
  },
```

## Keywords

七、窗口打印更直接



上线阶段：

## 一、es6不需要编译吗

let a =6

会编译为

```js
try{
    throw 6
}catch(a){
    
}
```

try 两个缺点会被垃圾回收，作用域链延长

解决方法：

```html
<script type="module" src="./main.js"></script>
<script nomodule src="./main.es5.js"></script>
```

配置webpack根据生成不同版本文件

再配置webpack html-plugin自动注入script

### 垫片使用：Polyfill.io - 自动化的 JavaScript Polyfill 服务

Polyfill.io 通过分析请求头信息中的 UserAgent 实现自动加载浏览器所需的 polyfills。

Polyfill.io 有一份[默认功能列表](https://polyfill.io/v2/docs/features/#default-sets)，包括了最常见的 polyfills：`document.querySelector`、`Element.classList`、ES5 新增的 `Array` 方法、`Date.now`、ES6 中的 `Object.assign`、`Promise` 等。

你也可以通过传递 `features` 参数来自定义功能列表：

```html
<!-- 加载 Promise&fetch -->
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Promise,fetch"></script>
<!-- 加载所有 ES5&ES6 新特性 -->
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=es5,es6"></script>
```

Polyfill.io 还提供了其他 API，具体请查阅[官方文档](https://polyfill.io/v2/docs/api)：

提高稳定性 可以自己写一套，使用can i use 第三方接口判断ua是否需要垫片



## 前端缓存小负载

将文件放到local storage

a.js => a.***.js

a.***js=> 实际代码

使用插件 [webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin),生成资源清单

 [vue+webpack集成bowl.js实现localStorage本地缓存](http://shmy.tech/2017/01/19/vue-webpck-bowl/)

 [bowl.js](https://elemefe.github.io/bowl/#/zh-cn?id=bowljs)

[localStorage的黑科技-js和css缓存机制](https://www.jianshu.com/p/0fa0bf842bbb)


相关文章

3真正的loading

```
// webpack.config.js

const loading = {
  html: '加载中...'
};

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      loading: loading
    })
  ]
}

// index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>构建webpack单页应用</title>
</head>
<body>
  <div id="app">
    <%= htmlWebpackPlugin.options.loading.html %>
  </div>
  
</body>
</html>
// index.js
setTimeout(()=>{
  document.getElementById('app').innerHTML=`<h1>hello</h1>`

        
},2000)
```

## 单页的性能

单页转多页

保证性能用直出，减少请求数量，**把runtime打到html里**

## 分析打包结果 

监控打包大小 ci 

- [bundlesize](https://github.com/siddharthkp/bundlesize) 控制包的大小[CI(持续集成)](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)里用的 [size-limit](https://github.com/ai/size-limit) 防止JS库臃肿。如果您不小心添加了大量依赖项，则大小限制将引发错误

[分析打包结果](https://alexkuz.github.io/webpack-chart/)<https://alexkuz.github.io/webpack-chart/>

## loader设置

test exculde include 提升速度 检测尾缀 干掉 除掉谁 ，这三个loader都设置，速度提升很快

 **把 loader 应用的文件范围缩小**

我们在使用 loader 的时候，尽可能把 loader 应用的文件范围缩小，只在最少数必须的代码模块中去使用必要的 loader，例如 node_modules 目录下的其他依赖类库文件，基本就是直接编译好可用的代码，无须再经过 loader 处理了：

```
rules: [ 
  {
    test: /\.jsx?/,
    include: [ 
      path.resolve(__dirname, 'src'), 
      // 限定只在 src 目录下的 js/jsx 文件需要经 babel-loader 处理
      // 通常我们需要 loader 处理的文件都是存放在 src 目录
    ],
    use: 'babel-loader',
  },
  // ...
],
```

如上边这个例子，如果没有配置 `include`，所有的外部依赖模块都经过 Babel 处理的话，构建速度也是会收很大影响的。

## 代码压缩JS CSS

webpack 4.x 版本运行时，mode 为 production 即会启动压缩 JS 代码的插件，而对于 webpack 3.x，使用压缩 JS 代码插件的方式也已经介绍过了。在生产环境中，压缩 JS 代码基本是一个必不可少的步骤，这样可以大大减小 JavaScript 的体积，相关内容这里不再赘述。

除了 JS 代码之外，我们一般还需要 HTML 和 CSS 文件，这两种文件也都是可以压缩的，虽然不像 JS 的压缩那么彻底（替换掉长变量等），只能移除空格换行等无用字符，但也能在一定程度上减小文件大小。在 webpack 中的配置使用也不是特别麻烦，所以我们通常也会使用。

对于 HTML 文件，之前介绍的 html-webpack-plugin 插件可以帮助我们生成需要的 HTML 并对其进行压缩：

```
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'assets/index.html', // 配置文件模板
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true // 压缩 HTML 中出现的 JS 代码
      }
    }),
  ],
}
```

如上，使用 `minify` 字段配置就可以使用 HTML 压缩，这个插件是使用 [html-minifier](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fkangax%2Fhtml-minifier%23options-quick-reference) 来实现 HTML 代码压缩的，`minify` 下的配置项直接透传给 html-minifier，配置项参考 html-minifier 文档即可。

对于 CSS 文件，我们之前介绍过用来处理 CSS 文件的 css-loader，也提供了压缩 CSS 代码的功能：

```
module.exports = {
  module: {
    rules: [
      // ...
      {
        test: /\.css/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true, // 使用 css 的压缩功能
            },
          },
        ],
      },
    ],
  }
}
```

在 css-loader 的选项中配置 `minimize` 字段为 `true` 来使用 CSS 压缩代码的功能。css-loader 是使用 [cssnano](https://link.juejin.im/?target=http%3A%2F%2Fcssnano.co%2F) 来压缩代码的，`minimize` 字段也可以配置为一个对象，来将相关配置传递给 cssnano。更多详细内容请参考 [cssnano](https://link.juejin.im/?target=http%3A%2F%2Fcssnano.co%2F) 官方文档。

 webpack-parallel-uglify-plugin  

uglifyjs-webpack-plugin 压缩js

###   [happypack](https://github.com/cisen/blog/issues/153)

提高打包速度

  ts-loader 

### DLLPlugin

[DLLPlugin](https://link.juejin.im/?target=https%3A%2F%2Fdoc.webpack-china.org%2Fplugins%2Fdll-plugin) 是 webpack 官方提供的一个插件，也是用来分离代码的，和 `optimization.splitChunks`（3.x 版本的是 CommonsChunkPlugin）有异曲同工之妙，之所以把 DLLPlugin 放到 webpack 构建性能优化这一部分，是因为它的配置相对繁琐，如果项目不涉及性能优化这一块，基本上使用 `optimization.splitChunks` 即可。

我们来看一下 DLLPlugin 如何使用，使用这个插件时需要额外的一个构建配置，用来打包公共的那一部分代码，举个例子，假设这个额外配置是 `webpack.dll.config.js`：

```
module.exports = {
  name: 'vendor',
  entry: ['lodash'], // 这个例子我们打包 lodash 作为公共类库

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "vendor.js",
    library: "vendor_[hash]" // 打包后对外暴露的类库名称
  },

  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_[hash]',
      path: path.resolve(__dirname, "dist/manifest.json"), // 使用 DLLPlugin 在打包的时候生成一个 manifest 文件
    })
  ],
}
```

然后就是我们正常的应用构建配置，在那个的基础上添加两个一个新的 `webpack.DllReferencePlugin`配置：

```
module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist/manifest.json'), 
      // 指定需要用到的 manifest 文件，
      // webpack 会根据这个 manifest 文件的信息，分析出哪些模块无需打包，直接从另外的文件暴露出来的内容中获取
    }),
  ],
}
```

在构建的时候，我们需要优先使用 `webpack.dll.config.js` 来打包，如 `webpack -c webpack.dll.config.js --mode production`，构建后生成公共代码模块的文件 `vendor.js` 和 `manifest.json`，然后再进行应用代码的构建。

你会发现构建结果的应用代码中不包含 lodash 的代码内容，这一部分代码内容会放在 `vendor.js` 这个文件中，而你的应用要正常使用的话，需要在 HTML 文件中按顺序引用这两个代码文件，如：

```
<script src="vendor.js"></script>
<script src="main.js"></script>
```

作用是不是和 `optimization.splitChunks` 很相似，但是有个区别，DLLPlugin 构建出来的内容无需每次都重新构建，后续应用代码部分变更时，你不用再执行配置为 `webpack.dll.config.js` 这一部分的构建，沿用原本的构建结果即可，所以相比 `optimization.splitChunks`，使用 DLLPlugin 时，构建速度是会有显著提高的。

但是很显然，DLLPlugin 的配置要麻烦得多，并且需要关心你公共部分代码的变化，当你升级 lodash（即你的公共部分代码的内容变更）时，要重新去执行 `webpack.dll.config.js` 这一部分的构建，不然沿用的依旧是旧的构建结果，使用上并不如 `optimization.splitChunks` 来得方便。这是一种取舍，根据项目的实际情况采用合适的做法。

还有一点需要注意的是，[html-webpack-plugin](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fjantimon%2Fhtml-webpack-plugin) 并不会自动处理 DLLPlugin 分离出来的那个公共代码文件，我们需要自己处理这一部分的内容，可以考虑使用 [add-asset-html-webpack-plugin](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FSimenB%2Fadd-asset-html-webpack-plugin)，关于这一个的使用就不讲解了，详细参考官方的说明文档：[使用 add-asset-html-webpack-plugin](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FSimenB%2Fadd-asset-html-webpack-plugin%23basic-usage)。

###  optimize-css-assets-webpack-plugin

## 分离代码文件

关于分离 CSS 文件这个主题，之前在介绍如何搭建基本的前端开发环境时有提及，在 webpack 中使用 [minicssextract-webpack-plugin](frontend/frontend-engineering/webpack.html#css文件的代码分割) 插件即可。

先简单解释一下为何要把 CSS 文件分离出来，而不是直接一起打包在 JS 中。最主要的原因是我们希望更好地利用缓存。

假设我们原本页面的静态资源都打包成一个 JS 文件，加载页面时虽然只需要加载一个 JS 文件，但是我们的代码一旦改变了，用户访问新的页面时就需要重新加载一个新的 JS 文件。有些情况下，我们只是单独修改了样式，这样也要重新加载整个应用的 JS 文件，相当不划算。

还有一种情况是我们有多个页面，它们都可以共用一部分样式（这是很常见的，CSS Reset、基础组件样式等基本都是跨页面通用），如果每个页面都单独打包一个 JS 文件，那么每次访问页面都会重复加载原本可以共享的那些 CSS 代码。如果分离开来，第二个页面就有了 CSS 文件的缓存，访问速度自然会加快。虽然对第一个页面来说多了一个请求，但是对随后的页面来说，缓存带来的速度提升相对更加可观。

因此当我们考虑更好地利用缓存来加速静态资源访问时，会尝试把一些公共资源单独分离开来，利用缓存加速，以避免重复的加载。除了公共的 CSS 文件或者图片资源等，当我们的 JS 代码文件过大的时候，也可以用代码文件拆分的办法来进行优化。

那么，如何使用 webpack 来把代码中公共使用的部分分离成为独立的文件呢？由于 webpack 4.x 和 webpack 3.x 在代码分离这一块的内容差别比较大，因而我们分别都介绍一下。

3.x 以前的版本是使用 CommonsChunkPlugin 来做代码分离的，而 webpack 4.x 则是把相关的功能包到了 `optimize.splitChunks` 中，直接使用该配置就可以实现代码分离。

我们先介绍在 webpack 4.x 中如何使用这个配置来实现代码分离。

### webpack 4.x 的 optimization

webpack 的作者推荐直接这样简单地配置：

```
module.exports = {
  // ... webpack 配置

  optimization: {
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
}
```

我们需要在 HTML 中引用两个构建出来的 JS 文件，并且 commons.js 需要在入口代码之前。下面是个简单的例子：

```
<script src="commons.js" charset="utf-8"></script>
<script src="entry.bundle.js" charset="utf-8"></script>
```

如果你使用了 html-webpack-plugin，那么对应需要的 JS 文件都会在 HTML 文件中正确引用，不用担心。如果没有使用，那么你需要从 `stats` 的 `entrypoints` 属性来获取入口应该引用哪些 JS 文件，可以参考 [Node API](https://link.juejin.im/?target=https%3A%2F%2Fdoc.webpack-china.org%2Fapi%2Fnode%2F) 了解如何从 `stats` 中获取信息，或者开发一个 plugin 来处理正确引用 JS 文件这个问题。第 15 小节会介绍如何开发 webpack plugin，plugin 提供的 API 也可以正确获取到 `stats`中的数据。

之前我们提到拆分文件是为了更好地利用缓存，分离公共类库很大程度上是为了让多页面利用缓存，从而减少下载的代码量，同时，也有代码变更时可以利用缓存减少下载代码量的好处。从这个角度出发，笔者建议将公共使用的第三方类库显式地配置为公共的部分，而不是 webpack 自己去判断处理。因为公共的第三方类库通常升级频率相对低一些，这样可以避免因公共 chunk 的频繁变更而导致缓存失效。

显式配置共享类库可以这么操作：

```
module.exports = {
  entry: {
    vendor: ["react", "lodash", "angular", ...], // 指定公共使用的第三方类库
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor", // 使用 vendor 入口作为公共部分
          enforce: true,
        },
      },
    },
  },
  // ... 其他配置
}

// 或者
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /react|angluar|lodash/, // 直接使用 test 来做路径匹配
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
      },
    },
  },
}

// 或者
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: path.resolve(__dirname, "node_modules") // 路径在 node_modules 目录下的都作为公共部分
          name: "vendor", // 使用 vendor 入口作为公共部分
          enforce: true,
        },
      },
    },
  },
}
```

上述第一种做法是显示指定哪些类库作为公共部分，第二种做法实现的功能差不多，只是利用了 `test`来做模块路径的匹配，第三种做法是把所有在 node_modules 下的模块，即作为依赖安装的，都作为公共部分。你可以针对项目情况，选择最合适的做法。

##  进一步控制 JS 大小

[按需加载](frontend/frontend-engineering/webpack.html#lazy-loading-懒加载，chunk-是什么？)

 [treeshaking](frontend/frontend-engineering/webpack.html#tree-shaking-概念详解)

## sideEffects

这是 webpack 4.x 才具备的特性：[side-effects/README.md](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack%2Fblob%2Fmaster%2Fexamples%2Fside-effects%2FREADME.md)。

我们拿 [lodash](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Flodash%2Flodash) 举个例子。有些同学可能对 [lodash](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Flodash%2Flodash) 已经蛮熟悉了，它是一个工具库，提供了大量的对字符串、数组、对象等常见数据类型的处理函数，但是有的时候我们只是使用了其中的几个函数，全部函数的实现都打包到我们的应用代码中，其实很浪费。

webpack 的 sideEffects 可以帮助解决这个问题。现在 lodash 的 [ES 版本](https://link.juejin.im/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Flodash-es) 的 `package.json` 文件中已经有 `sideEffects: false` 这个声明了，当某个模块的 `package.json` 文件中有了这个声明之后，webpack 会认为这个模块没有任何副作用，只是单纯用来对外暴露模块使用，那么在打包的时候就会做一些额外的处理。

例如你这么使用 `lodash`：

```
import { forEach, includes } from 'lodash-es'

forEach([1, 2], (item) => {
  console.log(item)
})

console.log(includes([1, 2, 3], 1))
```

由于 lodash-es 这个模块的 `package.json` 文件有 `sideEffects: false` 的声明，所以 webpack 会将上述的代码转换为以下的代码去处理：

```
import { default as forEach } from 'lodash-es/forEach'
import { default as includes } from 'lodash-es/includes'

// ... 其他代码
```

最终 webpack 不会把 lodash-es 所有的代码内容打包进来，只是打包了你用到的那两个方法，这便是 sideEffects 的作用。

## prepack

prepack-webpack-pligin

## devtool

eval 最快

## cache-loader



缓存,使用 [cache-loader](https://github.com/webpack-contrib/cache-loader) 来大大地加快 webpack 的编译速度。

###css styled-components css tree-tracking 一般用在多页,单页不要用这个，单页走的是CSS Module css-loader 处理css style-loader css查到页面

mini-css-extract-plugin CSS提取到外部，轻量级CSS提取 PS:WP4不支持extract-text-webpack-plugin，可以考虑装next版本，也可以用这个mini插件

```
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    module: {
        rules:[
            use:[
                // 把css打到js里
                // 'style-loader',
                // 把css提到外部css文件里
                {
                    loader: MiniCssExtractPlugin.loader,
                    options:{
                        publicPath:'../'
                    }
                },
                // css类名 改成modules
                {
                    loader:'css-loader'
                    // loader:'css-loader?modules&localIndetName=[name]_[local]-[hash:base64:5]'
                }
            ]
        ]
    }
```

purifycss-webpack 净化CSS,删除没有用到的CSS。要安装两个包-purifycss-webpack 和 purify-css

```
    const PurifyCSSPlugin = require('purifycss-webpack');
    plugins:[
        // 净化css
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(join(__dirname, './src/*.html')),
        })
    ]
```