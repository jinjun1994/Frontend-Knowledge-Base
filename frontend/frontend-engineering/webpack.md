---
{
author: jinjun,
title: webpack速查,
date: 2019/03/10,
}
---





webpack 是一个模块打包工具

模块化<https://webpack.js.org/concepts/modules>

[模块化语法](https://webpack.js.org/api/module-methods)、[变量](https://webpack.js.org/api/module-variables)



## webpack的正确安装姿势

安装最新node.js LTS版本

[http://nodejs.org](http://nodejs.org/)

查看node版本

````node
node -v
````

创建文件夹 

````
mkdir webpack-demo
````

初始化项目

````
npm init 
npm init -y // 默认配置
````

直接全部回车

生成package.json

````json
{
  "name": "webpack-demo",   // name不能为webpack,否则不能安装webpack
  "version": "1.0.0",
  "description": "",
   "private": true, // 添加私有
  "main": "index.js",   // 对外暴露，删除
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack-cli": "^3.2.3"
  }
}
````

全局安装webpack

我们使用 npm 或者 yarn 来安装 webpack，可以作为一个全局的命令来使用：

```
npm install webpack webpack-cli -g 

# 或者
yarn global add webpack webpack-cli

# 然后就可以全局执行命令了
webpack --help
```

卸载 全局webpack

`npm uninstall webpack -g                                                    `

项目内安装

```
npm install webpack webpack-cli -D  
npm install webpack webpack-cli --save-dev //等价上面
**#** 或者
yarn add webpack -D

# 项目内运行
npx webpack -v
```

安装指定版本 webpack

 npm install webpack@4.0.0  -D  

查看一个包版本号

`npm info webpack`

## 使用webpack的配置文件

项目文件夹创建webpack.config.js，否则会使用模式配置

创建src目录，在其中新建index.js 

````js
const path = require('path')       // 引入node核心模块path
module.exports = {
    entry: './src/index.js',  // 打包入口
    output: {             // 输出位置
        filename:  'bundle.js',     // 输出文件名
        path: path.resolve(__dirname, 'dist')  
        // 调用path模块resolve方法  __dirname表示文件所在目录路径,输出在该目录下dist目录
    }
}
````

使用其他配置文件名运行webpack

`npx webpack --config webpackconfig.js`

运行webpack

`npx webpack`

修改webpack运行命令

````json
{
  "scripts": {
    "bundle": "webpack"  // 先寻找项目中的webpack，没有则使用全局
  },
}
````

此时 使用 `npm run bundle` 运行webpack

运行后生成 ./dist/bundle.js

在dist目录下新建index.html，引入index.js就可以正常使用

小知识： webpack-cli为webpack命令行工具

webpack官方使用指南<https://webpack.js.org/guides/getting-started>

### 浅析webpack打包输出内容

![](https://img.dubiqc.com/201903/09075642.png)

打包输出信息：

hash为本次打包唯一hash值

version为打包使用webpack版本

time为打包耗时

built at 为打包时间

asset为输出文件名

 size为文件大小

 chunks为文件及其依赖文件唯一id值

chunks name为文件对应名字

main的由来：配置文件中使用了简写，为entryp配置的main

```js
 entry: './src/index.js',  // 打包入口
 // 等价于
 entry： {
 main:'./src/index.js'
 }
```

`Entrypoint main = bundle.js                                                             `

表示打包入口为 main入口，即bundle.js

````js
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
````

警告表示 没有指定打包模式

默认模式为：

````js
// webpack.config.js
module.exports = {
    mode: 'production' // 默认为production，输出代码会压缩，设置为development,代码不会压缩
}
````

## 什么是loader

如何学习，配置项目太多，loaders和plugins特别多，是记不住所有配置的。掌握核心知识，业务场景使用中遇到问题再去查看相关文档。

webpack 中提供一种处理多种文件格式的机制，便是使用 loader。我们可以把 loader 理解为是一个转换器，负责把某种文件格式的内容转换成 webpack 可以支持打包的模块。

默认识别js文件，其他格式文件需要loader。

下载一个图片命名为1.jpg到src目录

在./src/index.js中引入图片

````
import img from './1.jpg'
conslole.log(img)
````

安装 [file-loader](https://webpack.js.org/loaders/file-loader)

配置loader

````js
const path = require('path')       // 引入node核心模块path
module.exports = {
    mode: 'production',
    entry: './src/index.js',  // 打包入口
    module: {                         // 配置loader
        rules:[{
            test: /\.jpg$/,
            use: {
                loader: 'file-loader'
            }
        }]
    },
    output: {             // 输出位置
        filename:  'bundle.js',     // 输出文件名
        path: path.resolve(__dirname, 'dist')   // 调用path模块resolve方法  __dirname表示文件所在目录路径
    }
}
````

运行 npm run bundle

file-load 会将1.jpg改名复制到src下，并在js文件中返回文件地址

理论上file-load 可以配置任何静态文件

我们将图片输出到html

改写index.js

````javascript
import img from './1.jpg'

console.log(img)
let  img1 = new Image()
img1.src = img

let root = document.getElementById('root')
root.append(img1) 
````

改写/dist/index.html

````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="root"></div>
</body>
<script src="./bundle.js"></script>
</html>
````

浏览器打开index.html可以看见图片出现了

![](https://img.dubiqc.com/201903/09090735.png-sign)

开发vue时会引入vue文件如下

````js
import header from './header.vue'
````

webpack同样不能识别，需要安装配置[vue-loader](https://vue-loader.vuejs.org/zh/)

配置教程查看<https://vue-loader.vuejs.org/zh/guide/#vue-cli>

## 使用loader打包静态资源（图片篇）

使用占位符配置打包输出图片名

````js
const path = require('path')       
module.exports = {
    mode: 'production',
    entry: './src/index.js',  
    module: {
        rules:[{
            test: /\.jpg$/,
            use: {
                loader: 'file-loader',
                options: {
                    //placeholder 占位符
                    name: '[name].[ext]'  // 原图片名字.原后缀
                }
            }
        }]
    },
    output: {             
        filename:  'bundle.js',    
        path: path.resolve(__dirname, 'dist')  
    }
}
````

更多占位符查看[file-load文档](https://webpack.js.org/loaders/file-loader)

<https://github.com/webpack/loader-utils#interpolatename>

### placeholders

### `[ext]`

类型：`String` 默认：`file.extname`

目标文件/资源的文件扩展名。

### `[hash]` 

类型：`String` 默认：`'md5'`

指定生成文件内容哈希值的哈希方法。 查看下面的 [Hashes](https://github.com/webpack-contrib/file-loader#hashes)。

### `[N]` 

类型：`String` 默认：`undefined`

当前文件名按照查询参数 regExp 匹配后，获得到第 N 个匹配结果

### `[name]` 

类型：`String` 默认：`file.basename`

文件/资源的基本名称。

### `[path]` 

类型：`String` 默认：`file.dirname`

资源相对于 webpack/config context 的路径。

### Hashes

Custom hashes can be used by specifying a hash with the following format: `[<hashType>:hash:<digestType>:<length>]`.

### `digestType`

类型：`String` 默认：`'hex'`

The [digest](https://en.wikipedia.org/wiki/Cryptographic_hash_function) that the hash function should use. Valid values include: base26, base32, base36, base49, base52, base58, base62, base64, and hex.

### `hashType` 

类型：`String` 默认：`'md5'`

The type of hash that the has function should use. Valid values include: md5, sha1, sha256, and sha512.

### `length` 

类型：`Number` 默认：`9999`

Users may also specify a length for the computed hash.

### Examples

The following examples show how one might use `file-loader` and what the result would be.

```js
// bundle file
import png from 'image.png'
// webpack.config.js
{
  loader: 'file-loader',
  options: {
    name: 'dirname/[hash].[ext]'
  }
}
# result
dirname/0dcbbaa701328ae351f.png
```

------

```js
// webpack.config.js
{
  loader: 'file-loader',
  options: {
    name: '[sha512:hash:base64:7].[ext]'
  }
}
# result
gdyb21L.png
```

------

```js
// bundle file
import png from 'path/to/file.png'
// webpack.config.js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]?[hash]'
  }
}
# result
path/to/file.png?e43b20c069c4a01867c31e98cbce33c9
```

添加打包图片种类，配置图片输出目录

````js
   module: {
        rules:[{
            test: /\.(jpg|png|gif)$/,   // 添加图片种类
            use: {
                loader: 'file-loader',
                options: {
                    //placeholder 占位符
                    name: '[name]_[hash].[ext]'，
                    outputPath: 'images/'  // 打包到dist目录下images文件夹
                }
            }
        }]
    },
````

更多配置查看file-loader文档

### url-loader

类似file-loader ，多了limit配置项

安装 `npm i url-loader -D`

配置limit: 2048 

如果图片大于2048bytes则打包到 images文件夹下

小于则生成base64插入html，减少网络请求提高性能

````js
   module: {
        rules:[{
            test: /\.(jpg|png|gif)$/,   // 添加图片种类
            use: {
                loader: 'url-loader', // 改用url-loader
                options: {
                    //placeholder 占位符
                    name: '[name]_[hash].[ext]'，
                    outputPath: 'images/',  // 打包到dist目录下images文件夹
                    limmit: 2048
                }
            }
        }]
    },
````

![](https://img.dubiqc.com/201903/09095118.png-sign)

阅读[file-loader文档](https://webpack.js.org/loaders/file-loader) [中文](https://www.webpackjs.com/loaders/file-loader/)

 [url-loader文档](https://webpack.js.org/loaders/url-loader)  [中文](https://www.webpackjs.com/loaders/url-loader/)

## 使用loader打包静态资源（样式篇上）

[本节完整代码](https://github.com/jinjun1994/example/tree/master/webpack4/02-03%20%E4%BD%BF%E7%94%A8%20Loader%20%E6%89%93%E5%8C%85%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%EF%BC%88%E6%A0%B7%E5%BC%8F%E7%AF%87%20-%20%E4%B8%8A%EF%BC%89/02-03/lesson)

安装 [css-loader](https://webpack.js.org/loaders/css-loader) [style-loader](https://webpack.js.org/loaders/style-loader) 处理css文件

```
npm i css-loader style-loader -D
```

css-loader处理文件依赖 style-loader挂载css到html

配置文件

````js
const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		},{
			test: /\.css$/,
			use: [
				'style-loader',   // loader执行顺序从下到上，从右到左
				'css-loader', 
			]
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
````

index.js

````js
import avatar from './avatar.jpg';
import style from './index.scss';


createAvatar();

var img = new Image();
img.src = avatar; 
img.classList.add(style.avatar);  添加样式

var root = document.getElementById('root');
root.append(img);
````





安装[scss-loader](https://webpack.js.org/loaders/sass-loader)处理scss

```bash
npm install sass-loader node-sass  -D
```

配置文件

````js
const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		},{
			test: /\.scss$/,
			use: [
				'style-loader', 
				'css-loader', 
				'sass-loader',   
			]
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
````

 loader执行顺序从下到上，从右到左，打包scss首先使用sass-loader翻译，将css给到css-loader，最后给到style-loader挂载到页面

使用[postcss-loader](https://webpack.js.org/loaders/postcss-loader)  自动添加浏览器前缀

安装

```bash
npm i -D postcss-loader
```

安装插件

```
npm i -D autoprefixer
```

 创建配置文件

**postcss.config.js**

```js
module.exports = {
  plugins: [requre('autoprefixer')]
}
```

````js
{
			test: /\.scss$/,
			use: [
				'style-loader',   
				'css-loader', 
				'sass-loader',
				'postcss-loader'
			]
		}
````



 loader执行顺序从下到上，从右到左，打包 ,首先postcss使用autoprefixer插件，再使用sass-loader翻译，将css给到css-loader，最后给到style-loader挂载到页面

## 使用loader打包静态资源（样式篇下）

### css module

[css module完整代码](https://github.com/jinjun1994/example/tree/master/webpack4/02-04%20%E4%BD%BF%E7%94%A8%20Loader%20%E6%89%93%E5%8C%85%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%EF%BC%88%E6%A0%B7%E5%BC%8F%E7%AF%87%EF%BC%89/css-modules/lesson)

配置css-loader常用配置项

````js
{
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2,
						modules: true
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}
````

importLoaders: 2 

从js引入scss1文件，scss1中@import scss2，scss2文件不会再走 sass-loader和postcss-loader，直接进入css-loader

配置 importLoaders: 2 确保scss文件 都执行'sass-loader','postcss-loader'

modules: true 



开启css模块化使css只在模块中有效避免全局污染

修改代码

````js
// index.js
import avatar from './avatar.jpg';
import style from './index.scss';
import createAvatar from './createAvatar';

createAvatar();

var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);    // 添加模块前缀

var root = document.getElementById('root');
root.append(img);
````

### iconfont

[完整代码](https://github.com/jinjun1994/example/tree/master/webpack4/02-04%20%E4%BD%BF%E7%94%A8%20Loader%20%E6%89%93%E5%8C%85%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%EF%BC%88%E6%A0%B7%E5%BC%8F%E7%AF%87%EF%BC%89/font/lesson)

在[阿里巴巴矢量图库]([https://www.iconfont.cn](https://www.iconfont.cn/))生成字体文件

本文用到字体[地址](https://github.com/jinjun1994/example/tree/master/webpack4/02-04%20%E4%BD%BF%E7%94%A8%20Loader%20%E6%89%93%E5%8C%85%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%EF%BC%88%E6%A0%B7%E5%BC%8F%E7%AF%87%EF%BC%89/inconfont/font_936922_gumrsanrref)

配置 file-loader打包字体文件

````js
module: {
		rules: [ {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}]
	},
````

作业：

阅读下列文档

[postcss-load](https://webpack.js.org/loaders/postcss-loader)  [scss-loader](https://webpack.js.org/loaders/scss-loader) [style-loader](https://webpack.js.org/loaders/style-loader) [css-loader](https://webpack.js.org/loaders/css-loader) [file-loader](https://webpack.js.org/loaders/file-loader)

[文件资源管理](https://webpack.js.org/guides/asset-management)

## 使用plugins使打包更便捷

[完整代码](https://github.com/jinjun1994/example/tree/master/webpack4/02-05%20%E4%BD%BF%E7%94%A8%20plugins%20%E8%AE%A9%E6%89%93%E5%8C%85%E6%9B%B4%E4%BE%BF%E6%8D%B7/02-05/lesson)

之前我们 /dist 目录下index.html文件是手动添加，现在配置自动生成



### [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin)

 Installation

```bash
npm install --save-dev html-webpack-plugin
```

配置

````js
/ webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');  //引入插件
var path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({           // 实例化插件
		template: 'src/index.html'          // 配置模板
	})]   
};
````

该插件在打包结束后自动生成html文件，并把打包生成的js自动引入该html文件，配置template可以指定html模板，

plugin可以在webpack运行到某个时刻的时候，帮你做有一些事情，很像生命周期函数

### clean-webpack-plugin

实现打包时清除上次打包文件功能

安装

```bash
npm i clean-webpack-plugin -D
```

````js
/ webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');  //引入html-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 引入clean-webpack-plugin

var path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({           // 实例化插件
		template: 'src/index.html'          // 配置模板
	}), new CleanWebpackPlugin(['dist'])]   // 实例化插件，配置清除目录dist
};
````

打包流程：运行 npm run bundle后

首先清除dist目录 ，在打包，最后运行html-webpack-plugin

官网[plugin](https://webpack.js.org/plugins)

plugin很多，业务场景遇到某些需求搜索配置，再看文档使用即可

## entry与output的基础配置

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/02-06%20Entry%20%E4%B8%8E%20Output%20%E7%9A%84%E5%9F%BA%E7%A1%80%E9%85%8D%E7%BD%AE/02-06/lesson)

### entry

````js
entry: './src/index.js' 
// 等价于
entry: {
		main: './src/index.js'
	},
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'     // 删除这行，则会打包输出 main.js
  },
````

打包多次

````js
entry: {
		main: './src/index.js',
		sub: './src/index.js'
	},
  output: {
    publicPath: 'http://cnd.com.cn'  // 配置cdn地址
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'     // 需要使用占位符,[name]表示entry的key值
  },
````

会输出 main.js sub.js 

[publiPath文档](https://webpack.js.org/configuration/output#outputpublicpath)

html-webpack-plugin 会注入 main.js,sub.js

````html
<script type="text/javascript" src="http://cdn.com.cn/main.js"></script>
<script type="text/javascript" src="http://cdn.com.cn/sub.js"></script>
````

作业：

查看[output文档](https://webpack.js.org/configuration/output)

[entry](https://webpack.js.org/configuration/entry-context)

[output management](https://webpack.js.org/guides/output-management)

[html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin)

<https://github.com/jantimon/html-webpack-plugin#options>

## sourceMap的配置

我们先关闭sourceMap

````js
module.exports = {
	mode: 'development',
	devtool: 'none',
````

在index.js输入 `consele.log('hellow word')`

打包打开html控制台会报错

![](https://img.dubiqc.com/201903/10013350.png)

开启sourceMap

````js
module.exports = {
	mode: 'development',
	devtool: 'source-map',
````



打包打开html报错如下

![](https://img.dubiqc.com/201903/10014041.png)

sourceMap 他是一个映射关系，目标代码和源代码的映射，他知道dist目录下main.js文件 96行，实际上对应src目录下index.js第一行

````js
module.exports = {
	mode: 'development',
	// development devtool: 'cheap-module-eval-source-map',  
	// production devtool: 'cheap-module-source-map',
	devtool: 'cheap-module-eval-source-map',
````

[devtool文档](https://webpack.js.org/configuration/devtool)

[中文文档](https://www.webpackjs.com/configuration/devtool/)

配置sourceMap实际上配置devtool

![](https://img.dubiqc.com/201903/10014833.png-sign)

### 品质说明(quality)

`打包后的代码` - 将所有生成的代码视为一大块代码。你看不到相互分离的模块。

`生成后的代码` - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 生成的代码。示例：你会看到类似 `var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();`，而不是 `import {test} from "module"; test();`。

`转换过的代码` - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 转换前、loader 转译后的代码。示例：你会看到类似 `import {test} from "module"; var A = function(_test) { ... }(test);`，而不是 `import {test} from "module"; class A extends test {}`。

`原始源代码` - 每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码，正如编写它时。这取决于 loader 支持。

`无源代码内容` - source map 中不包含源代码内容。浏览器通常会尝试从 web 服务器或文件系统加载源代码。你必须确保正确设置 [`output.devtoolModuleFilenameTemplate`](https://www.webpackjs.com/configuration/output/#output-devtoolmodulefilenametemplate)，以匹配源代码的 url。

`（仅限行）` - source map 被简化为每行一个映射。这通常意味着每个语句只有一个映射（假设你使用这种方式）。这会妨碍你在语句级别上调试执行，也会妨碍你在每行的一些列上设置断点。与压缩后的代码组合后，映射关系是不可能实现的，因为压缩工具通常只会输出一行。

### 对于开发环境

以下选项非常适合开发环境：

`eval` - 每个模块都使用 `eval()` 执行，并且都有 `//@ sourceURL`。此选项会非常快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码（没有从 loader 中获取 source map），所以不能正确的显示行数。

`eval-source-map` - 每个模块使用 `eval()` 执行，并且 source map 转换为 DataUrl 后添加到 `eval()` 中。初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。

`cheap-eval-source-map` - 类似 `eval-source-map`，每个模块使用 `eval()` 执行。这是 "cheap(低开销)" 的 source map，因为它没有生成列映射(column mapping)，只是映射行数。它会忽略源自 loader 的 source map，并且仅显示转译后的代码，就像 `eval` devtool。

`cheap-module-eval-source-map` - 类似 `cheap-eval-source-map`，并且，在这种情况下，源自 loader 的 source map 会得到更好的处理结果。然而，loader source map 会被简化为每行一个映射(mapping)。

说明：

添加 inline 会将要映射关系文件加载到js文件中，而不是生成.map文件

添加cheap只精确到行，只管业务代码自己写的代码，不管loader的，例如cheap-eval-source-map，添加module则管loader，第三方模块等的错误

eval 则不打包map文件，直接用eval输出错误映射，效率最快，但是较复杂代码不全面

开发环境下建议使用

```js
module.exports = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
```

放到生产环境

````js
module.exports = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
````



sourceMap原理

##  使用 WebpackDevServer 提升开发效率

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/02-08%20%E4%BD%BF%E7%94%A8%20WebpackDevServer%20%E6%8F%90%E5%8D%87%E5%BC%80%E5%8F%91%E6%95%88%E7%8E%87/02-08/lesson)

实现文件更新自动打包

### 方法一

修改script文件

````json
  // package.json

  "scripts": {
    "watch": "webpack --watch",        // 监控打包文件变化，自动打包
  }
````



### 方法二：webpackdevServer    

配置devServer    vue-cli 3 react新版都使用

````js
// webpack.config.js
...
	devServer: {
		contentBase: './dist',  // 服务器启动目录
		open: true,             // 启动时自动打开浏览器，访问服务器地址
		port: 8080             // 服务器端口 默认8080
	}
...    
````

````json
  // package.json

  "scripts": {
    "watch": "webpack --watch",        
    "start": "webpack-dev-server",       // 添加 devServe启动命令
  }
````

安装 devServer

```bash
npm i webpack-dev-server -D
```

启动

```bash
npm run start
```

扩展知识：devserver可以配置跨域

[文档](https://webpack.js.org/configuration/dev-server#devserverproxy)

````js
// webpack.config.js
...
	devServer: {
		contentBase: './dist',  // 服务器启动目录
		open: true,             // 启动时自动打开浏览器，访问服务器地址
		port: 8080 ,            // 服务器端口 默认8080
        proxy: {
      '/api': 'http://localhost:3000'
       }
	}
...    
````

dist目录会放到内存中，加快速度

### 方法三：middleware

老版本devServer不稳定，vue等脚手架使用 node server

安装 koa 或express快速搭建服务器，及webpack-dev-middleware中间件监控webpack文件变化

```
npm i express webpack-dev-middleware -D
```

修改package.json

````json
  // package.json

  "scripts": {
    "server": "node server.js"   // 启动命令
  }
````

修改webpack配置

````js
output: {
        piblicPath: '/',             // 添加这行确保路径正确
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
````

新建server.js

````js
const express = require('express');    // 引入 express
const webpack = require('webpack');  // 引入webpack
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js'); // 引入webpack配置文件
// 在node中直接使用webpack
// 在命令行里使用webpack
const complier = webpack(config);  // webpack编译器，运行一次就会打包代码一次

const app = express();  //创建应用

app.use(webpackDevMiddleware(complier, {
     piblicPath: config.output.piblicPath  //使用之前配置的路径
})); // 使用编译器中间件，

app.listen(3000, () => {
	console.log('server is running');
});
````

运行 `npm run server`即可

没有devserver智能，比如不能自动刷新，需要配置很多东西才能达到前者效果，知道有这个方法即可

[命令行使用webpack](https://webpack.js.org/api/cli#usage-with-config-file)

[node中使用webpack](https://webpack.js.org/api/node)

作业阅读文档

 [Development](https://webpack.js.org/guides/development)

 [DevServer](https://webpack.js.org/configuration/dev-server)

[devtool](https://webpack.js.org/configuration/devtool)

##   Hot Module Replacement 热模块更新

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/02-09%20Hot%20Module%20Replacement%20%E7%83%AD%E6%A8%A1%E5%9D%97%E6%9B%B4%E6%96%B0/02-09/lesson)

简写为 HMR

首先添加css支持

````js
// webpack.config.js

	module: {
		rules: [ {
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,           // 添加css文件支持
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},

````

修改index.js

````js
import './style.css';
 var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

 btn.onclick = function() {
	var div = document.createElement('div');
	div.innerHTML = 'item';
	document.body.appendChild(div);
 }
````

添加 style.css

````css
div:nth-of-type(odd) {
	background: yellow;   // 偶数变色
}
````

启动 devserver  `npm run start`

效果,点击生成div，偶数为黄色

![](https://img.dubiqc.com/201903/10041005.png-sign)

然而当我们修改css代码

```css
div:nth-of-type(odd) {
	background: blue;   // 偶数变色
}
```

devServer会自动刷新浏览器，item会消失，需要重新点击生成item才能看到效果

HMR就是模块热替换功能,会在应用程序运行过程中替换、添加或删除模块，而无需重新加载页面。这使得你可以在独立模块变更后，无需刷新整个页面，就可以更新这些模块，极大地加速了开发时间。



配置

````js
const webpack = require('webpack');  // 引入webpack，为webpack插件
...
devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,     // 开启HRM功能
		hotOnly: true  //即使HRM未生效也不刷新浏览器
	},
...
plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist']),
		new webpack.HotModuleReplacementPlugin()    // 添加HRM插件
	],
````

配置成功，重启命令 `npm run start`

此时我们修改css代码，html页面上的item不会消失，实时更新

 HRM对js的作用

我们先关闭HRM功能，注释掉配置文件即可

````js
	//	hot: true,     // 开启HRM功能
	//	hotOnly: true  //即使HRM未生效也不刷新浏览器
	//	new webpack.HotModuleReplacementPlugin()    // 添加HRM插件
````





修改index.js

````js
import counter from './counter';
import number from './number';

counter();
number();
````

添加counter.js

````js
function counter() {
	var div = document.createElement('div');
	div.setAttribute('id', 'counter');
	div.innerHTML = 1;
	div.onclick = function() {
		div.innerHTML = parseInt(div.innerHTML, 10) + 1
	}
	document.body.appendChild(div);
}

export default counter;
````

添加number.js

````js
function number() {
	var div = document.createElement('div');
	div.setAttribute('id', 'number');
	div.innerHTML = 3000;
	document.body.appendChild(div);
}

export default number;
````

![](https://img.dubiqc.com/201903/10043101.png-sign)

当我们点击第一个div数字会+1

我们修改number.js 的`div.innerHTML = 3000;`改为其他数字，发现第一个div会重置为1

我们需要实现修改number.js不会影响第一个div

这就是HRM的功能。

我们删除刚才的注释，重新开启HRM功能。

此时我们更改number.js 的`div.innerHTML = 3000;`为其他数字，但是发现，此时第一个div不会重置为1，但是第二个dicv数字仍为3000，我们需要添加一点代码

当number变化时，number重新执行一次，counter不变

````js
import counter from './counter';
import number from './number';

counter();
number();

if(module.hot) {                  // 如果HRM开启 
	module.hot.accept('./number', () => {    
		document.body.removeChild(document.getElementById('number')); //删除div
		number();  // 重新执行number
	})
}
````

`module.hot.accept` 方法接受第一个参数，依赖的文件名，如果number文件发生变化，就会执行后面的函数

这样我们就实现了js中HRM功能

为什么css不需要写这段代码，其实是css-loader已经写好了

vue-loader也会写好 react是babel preset

[参考文章](https://juejin.im/post/5b363b576fb9a00e6f660f45#comment)

作业

[HRM指南](https://webpack.js.org/guides/hot-module-replacement) [中文](https://www.webpackjs.com/guides/hot-module-replacement/)

[HRMapi](https://webpack.js.org/api/hot-module-replacement)[中文](https://www.webpackjs.com/api/hot-module-replacement/)

[HRM概念](https://webpack.js.org/concepts/hot-module-replacement)[中文](https://www.webpackjs.com/concepts/hot-module-replacement/)

## 使用 Babel 处理 ES6 语法

[所有代码](https://github.com/jinjun1994/example/tree/master/webpack4/02-10%20Webpack%E4%B8%AD%E4%BD%BF%E7%94%A8babel%E8%A7%A3%E6%9E%90ES6%E8%AF%AD%E6%B3%95/02-10/lesson)

[bable官网](https://babeljs.io/)

打开官网 点击[set up](https://babeljs.io/setup#installation) 选择webpack

 Installation

```
npm install --save-dev babel-loader @babel/core
```

配置js

````bash
// webpack.config.js
module: {
  rules: [
    { test: /\.js$/,          // 匹配js
    exclude: /node_modules/,  // 不转换此目录下，第三方一般已经转换过了
    loader: "babel-loader" }   
  ]
}
````

添加配置文件

```shell
npm install @babel/preset-env --save-dev  // 语法转换
```



```json
module: {
  rules: [
    { test: /\.js$/,          // 匹配js
    exclude: /node_modules/,  // 不转换此目录下，第三方一般已经转换过了
    loader: "babel-loader",
    options:{
        presets: ['@babel/preset-env'] 
  }
}
```

低版本浏览器缺失的特性需要腻子 [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill)

安装

```sh
npm install --save @babel/polyfill
```

在业务代码最顶部引入即可

````js
import "@babel/polyfill";  // useBuiltIns: 'usage' 开启不需要这行
````

这样会全部引入，非常大

修改配置文件，只使用用到的特性 [文档](https://babeljs.io/docs/en/usage)

````JS
module: {
  rules: [
    { test: /\.js$/,          // 匹配js
    exclude: /node_modules/,  // 不转换此目录下，第三方一般已经转换过了
    loader: "babel-loader",
    options:{
        presets: [['@babel/preset-env', {
    	targets: {
        chrome: "67",            //兼容大于chrome67
       },
     	useBuiltIns: 'usage'    // 只打包用到的特性腻子脚本，配置这个不需要引入
      }]]
     }
    }   
  ]
}
````

业务代码 配置上面两处即可

但是组件等库代码需要使用[babel-plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)

会以闭包的形式，不会污染全局

安装

```shell
npm install --save-dev @babel/plugin-transform-runtime
```

```shell
npm install --save @babel/runtime-corejs2
```

配置

````js
// webpack.config.js
module: {
  rules: [
    { test: /\.js$/,          // 匹配js
    exclude: /node_modules/,  // 不转换此目录下，第三方一般已经转换过了
    loader: "babel-loader",
    options:{
	"plugins": [["@babel/plugin-transform-runtime", { 
		"corejs": 2,         // 改为2 需要runtime-corejs2支持
        "helpers": true,
        "regenerator": true,
       "useESModules": false
	}]]
  }
    }   
  ]
}
````

可以单独创建Babel配置文件  .babelrc,将webpack.config.js中的options删除，移到文件中

````js
{
	"plugins": [["@babel/plugin-transform-runtime", {
		"corejs": 2,
    "helpers": true,
    "regenerator": true,
    "useESModules": false
	}]]
}
````



## Webpack 实现对React框架代码的打包

[所有代码](https://github.com/jinjun1994/example/tree/master/webpack4/02-11%20Webpack%20%E5%AE%9E%E7%8E%B0%E5%AF%B9React%E6%A1%86%E6%9E%B6%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%93%E5%8C%85/02-11/lesson)

首先按上节配置业务代码中的Babel

创建.babelrc文件

```json
{
	presets: [
		[
			"@babel/preset-env", {    
				targets: {
					chrome: "67",
				},
				useBuiltIns: 'usage'
			}
		],
		"@babel/preset-react"  // 转换react代码  从下到上执行，不能更换顺序
	]
}
```

业务代码中引入腻子 

```js
// index.js
import "@babel/polyfill";  	// 配置 useBuiltIns: 'usage' 时不需要引入
```

还需要安装[react转换器](https://babeljs.io/docs/en/babel-preset-react)

```bash
npm install --save-dev @babel/preset-react
```



安装 react

```
npm i react react-dom --save
```



书写react代码

```js
import "@babel/polyfill";

import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
	render() {
		return <div>Hello World</div>
	}
}

ReactDom.render(<App />, document.getElementById('root'));
```

##  Tree Shaking 概念详解

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/03-01%20Tree%20Shaking%20%E6%A6%82%E5%BF%B5%E8%AF%A6%E8%A7%A3/03-01/lesson)

```js
// math.js
export const add = (a, b) => {
	console.log( a + b );
}

export const minus = (a, b) => {
	console.log( a - b );
}
```

```js
// index.js
// Tree Shaking 只支持 ES Module

import { add } from './math.js';
add(1, 2);
```

从math.js引入add，却同时打包了minus函数

实现按需引入，webpack2.0提供了tree shaking 摇树

Tree Shaking 只支持 ES Module，因为es 静态引入，commont.js为动态引入

配置方法：

mode: 'development'默认没有tree shaking

```js
// webpack.config.js
   mode: 'development',
   plugins: ...
   ...
	optimization: {        // 在plugins下面配置开启
		usedExports: true  
	}
```

```json
// package.json
{
  "sideEffects": false
}
```

 "sideEffects": false

如果开启tree shaking 不导入内容的模块，例如

```
import "@babel/polyfill"  // 会在window下绑定全面变量 promise等
```

会被抖掉，

需要设置 

```json
// package.json
{
  "sideEffects": ["@babel/polyfill"]   //这样就不会抖掉该模块，值为false，则全部开启
}
```

一般会设置

```json
// package.json
{
  "sideEffects": ["*.css"]   //这样就不会抖掉该模块，值为false，则全部开启
}
```

mode: 'development' 模式下不会实际删除代码，只加了备注需要的代码，方便调试

改为mode: 'production' ，会自动启动tree shaking，甚至不需要配置  optimization

但是仍需要配置 sideEffects，切换模式记得更改devtool模式

[中文文档](https://webpack.docschina.org/guides/tree-shaking/)



## 深度tree shakiing

[代码地址](https://github.com/jinjun1994/example/tree/master/webpack4/%E6%B7%B1%E5%BA%A6treeshaking)

### 什么是Tree-shaking

所谓Tree-shaking就是‘摇’的意思，作用是把项目中没必要的模块全部抖掉，用于在不同的模块之间消除无用的代码，可列为性能优化的范畴。

Tree-shaking早期由rollup实现，后来webpack2也实现了Tree-shaking的功能，但是至今还不是很完备。至于为什么不完备，可以看一下[百度外卖的Tree-shaking原理](https://juejin.im/post/5a4dc842518825698e7279a9)

### Tree-shading原理

Tree-shaking的本质用于消除项目一些不必要的代码。早在编译原理中就有提到DCE(dead code eliminnation)，作用是消除不可能执行的代码，它的工作是使用编辑器判断出某些代码是不可能执行的，然后清除。

Tree-shaking同样的也是消除项目中不必要的代码，但是和DCE又有略不相同。可以说是DCE的一种实现，它的主要工作是应用于模块间，在打包过程中抽出有用的部分，用于完成DCE。

Tree-shaking是依赖ES6模块静态分析的，ES6 module的特点如下：

1. 只能作为模块顶层的语句出现
2. import 的模块名只能是字符串常量
3. import binding 是 immutable的

依赖关系确定，与运行时无关，静态分析。正式因为ES6 module的这些特点，才让Tree-shaking更加流行。

主要特点还是依赖于ES6的静态分析，在编译时确定模块。如果是require，在运行时确定模块，那么将无法去分析模块是否可用，只有在编译时分析，才不会影响运行时的状态。

### Webpack4的Tree-shaking

webpack从第2版本就开始支持Tree-shaking的功能，但是至今也并不能实现的那么完美。凡是具有副作用的模块，webpack的Tree-shaking就歇菜了。

#### 副作用

副作用在我们项目中，也同样是频繁的出现。知道函数式编程的朋友都会知道这个名词。所谓模块(这里模块可称为一个函数)具有副作用，就是说这个模块是不纯的。这里可以引入纯函数的概念。

> 对于相同的输入就有相同的输出，不依赖外部环境，也不改变外部环境。

符合上述就可以称为纯函数，不符合就是不纯的，是具有副作用的，是可能对外界造成影响的。

webpack自身的Tree-shaking不能分析副作用的模块。以lodash-es这个模块来举个例子

```
//test.js
import _ from "lodash-es";

const func1 = function(value){
    return _.isArray(value);
}
const func2 = function(value){
    return value=null;
}

export {
    func1,
    func2,
}
//index.js
import {func2} from './test.js'
func2()
复制代码
```

上述代码在test.js中引入lodash-es,在func1中使用了loadsh，并且这里不符合纯函数的概念，它是具有副作用的。func2是一个纯函数。

在index.js中只引入了func2，并且使用了func2，可见整个代码的执行是和func1是没有任何关系的。我们通过生产环境打包一下试试看(Tree-shaking只在生产环境生效)



![img](https://user-gold-cdn.xitu.io/2019/2/15/168eeff584fcb43d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

 main.js 91.7KB，可见这个结果是符合我们的预期的，因为func1函数的副作用，webpack自身的Tree-shaking并没有检测到这里有没必要的模块。解决办法还是用的，webpack的插件系统是很强大的。

webpack没有深度js treeshaking 没有css tree shaking，scope内分析不了， 类、函数以及模块等等， treeshaking不能shaking到函数scoop内东西， 使用插件 将scoop抓出来 使webpack tree shaking增效，



### webpack-deep-scope-plugin

webpack-deep-scope-plugin是一位中国同胞(学生)在Google夏令营，在导师Tobias带领下写的一个webpack插件。

这个插件主要用于填充webpack自身Tree-shaking的不足，通过作用域分析来消除无用的代码。





// webpack-scope-plugin  https://github.com/vincentdchan/webpack-deep-scope-analysis-plugin  https://diverse.space/2018/05/better-tree-shaking-with-scope-analysis





[webpack 如何通过作用域分析消除无用代码](https://diverse.space/2018/05/better-tree-shaking-with-scope-analysis)

Posted at 2018-05-25

> GSoC 2018 中，我的项目就在于给 webpack 实现深作用域分析（Deep Scope Analysis），主要还是为了改进 webpack 的 tree-shaking 工作。

### 前言

JS 的 tree-shaking 一直是前端开发中的痛点，大家都在想尽办法减少打包的代码体积。Tree shaking 是一个帮助在不同模块之间消除无用代码的 feature。在编译原理中，我们把这项技术叫做 DCE(dead code elimination)。但是 DCE 和 tree shaking 有些许不同，按照 Tobias 的说法，tree shaking 主要应用于于模块（module）之间，用于帮助进行 DCE（webpack 的 DEC 通过 uglify 完成），rollup 的作者也曾经提到， tree shaking 是打包的过程中抽取有用的部分，别的部分像树叶一样落下，所以叫 tree shaking。

[项目地址](https://github.com/vincentdchan/webpack-deep-scope-analysis-plugin)

### 从前

webpack 本身的 tree shaking 比较简单，主要是找一个 import 进来的变量是否在这个模块内出现过，非常简单粗暴。但是这种方式往往作用不大，因为一般人不会去 import 一个没有用到的变量。比较多的情况是可能曾经引用过，但是忘了删掉。现在的编辑器和 lint 工具都会提示你去删掉无用的变量，所以 webpack 本身的 tree shaking 功能是不够强大的。

```javascript
import { isNumber, isNull } from 'lodash-es';


export fun1() {
  // do nothing
}


export isNull(...args) {
  return isNull(...args);
}
```

在上面的例子中，变量 *isNumber* 并没有被引用到，所以会被消去。

### 开端

在今年年初，webpack 项目下面有一个 [issue](https://github.com/webpack/webpack/issues/6264) 提到了 webpack 打包了多余的代码和模块。但是这也为优化 tree-shaking 提供了一个思路，就是找到作用域之间的关系，来进行优化。

![img](https://user-images.githubusercontent.com/3199950/34681428-28df7576-f49c-11e7-942d-12caa6e905b8.png)

在上面的例子中，其实 *function2* 和整个 *external2* 都可以被消去，因为 *function2*并没有被 *entry* 引用到。但是目前 webpack 的机制不能做到这一点。借助于 webpack 强大的插件极致，我的插件就可以帮助 webpack 做到。

### 我的插件做了什么

插件包括了一个作用域分析器，可以分析一个模块里面的作用域，从此我们可以得到不同作用域之间变量的引用关系。当我们知道一个作用域是否会被使用，就可以因此而推断出这个作用域做引用的其他作用域是否也会被使用。这就是作用域分析器帮助消除无用代码的原理。

### 什么是作用域

下面的代码列举了 JS 中会**新建**一个作用域的代码：

```javascript
// module scope start


// Block


{ // <- scope start
} // <- scope end


// Class


class Foo { // <- scope start


} // <- scope end


// If else


if (true) { // <- scope start
   
} /* <- scope end */ else { // <- scope start
  
} // <- scope end


// For


for (;;) { // <- scope start
} // <- scope end


// Catch


try {


} catch (e) { // <- scope start


} // <- scope end


// Function


function() { // <- scope start
} // <- scope end


// Scope


switch() { // <- scope start
} // <- scope end


// module scope end
```

对于 ES6 模块来说，module scope 是最底层的作用域。而对于一个模块来说，**只有 class 和 function 的作用域是可以导出到其他模块的**。所以在这张需要遍历的图里面，并不是所有的作用域都可以被当作一个独立的遍历结点，像 if-else 作用域其实是归属于父作用域的。

### 插件的工作原理

在我们去分析作用域之间的引用关系之前，我们先需要去分析代码的作用域。代码的作用域分析建立在 AST(Abstract Syntax Tree) 之上。在这里，我借助了一个叫 [escope](https://github.com/estools/escope) 的工具。

解析完之后，其实就是图的深度遍历，找到那些作用域是会被使用到了，哪些是可以消去的。

![img](https://diverse.space/images/tree-shaking.png)

因为这个插件可以从导出的作用域之间分析出这些导出的作用域和导入变量之间的关系，也就是说。只要知道哪些导出作用域被使用的到，那么就知道哪些导入变量被引用，那些没有被引用。

另一方面，webpack 本身是可以分析出模块之间的变量引用关系的，从 webpack 我可以得知一个模块哪些导出变量是被用到的，这是 webpack 4 的新 feature。所以我的插件 tap 上了 webpack 相应的 hook，获取这个模块中会被其他模块引用的导出变量，返回给 webpack 哪些引入的变量被用到，这样 webpack 就可以根据我的插件的信息进行更完善的 tree-shaking。

### Edge cases

实际上，JavaScript 的分析有很多 Edge cases 会导致代码不会被消去，这里列举一些比较常见的：

同时提供一个 [Demo](https://vincentdchan.github.io/webpack-deep-scope-demo/) 来给大家尝试。

### 根作用域的引用

```javascript
import { isNull } from 'lodash-es';


export function scope(...args) {
  return isNull(...args);
}


console.log(scope(null));
```

在根作用域引用到的作用域不会被消除。

### 给变量重新赋值 👎

```javascript
import { isNull } from 'lodash-es';


var fun = 1;


fun = function scope(...args) {
  return isNull(...args);
}


export { fun }
```

因为缺少[数据流分析](https://en.wikipedia.org/wiki/Data-flow_analysis)，对变量重新赋值的作用域不会被消去。在上面的例子中，因为对 *fun* 变量进行了重新赋值，所以 *isNull* 无论如何都会被引入。

### 纯函数调用 👍

```javascript
// copy from rambda/es/allPass.js
import _curry1 from './internal/_curry1';
import curryN from './curryN';
import max from './max';
import pluck from './pluck';


var allPass = /*#__PURE__*/_curry1(function allPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }
      idx += 1;
    }
    return true;
  });
});
export default allPass;
```

如果一个匿名函数被包在一个函数调用中，那么其实这个插件是无法分析的，像上面的例子。但是如果加上了 PURE 注释的话，这个插件会把这个函数调用当作一个独立的域，所以在上述的例子中，tree-shaking 是会生效的。

### 实际使用的过程中应该注意什么

深作用域分析原理很简单，实现起来也不复杂，但是真的要使用再实际项目的过程中，却有很多要注意的地方：

**一、必须使用 ES6 的 import/export 模块机制。**

其实整个深作用域分析都是基于 ES6 模块完成的，也就是说深作用域分析无法分析 CommonJS 和 AMD 等等模块规范。这个时候，就要求项目中引用的模块都遵循 ES6 的规范，比如使用 lodash-es 代替 lodash。另外就是要注意 babel-loader 和 TypeScript 的设置，是否会把代码转换到 ES5 语法，导致深作用域分析失效。

**二、学会使用 PURE 注释。**

由于 JS 语法的复杂程度，webpack 没有打算给 JS 实现数据流分析，所以插件是无法知道一个函数调用是否具有副作用的。所以对于一些导出模块，如果是纯的函数调用，则需要加上 `/*@__PURE__*/`注释来表明这个函数是 pure 的，这是 [Uglify](https://github.com/mishoo/UglifyJS2) 使用的方法。当然也可以使用相关的 babel 插件进行批量添加。

### 总结

其实我这插件的实现是归根于 ES6 中良好的 import/export 语法的设计的。相信很多前端大佬都提到，就是模块的设计一定要合理。tree shaking 再强大它也只是一个编译器的工具，如果模块设计不合理，它一样会在打包的时候引入很多无用的代码。一个合理设计的模块一定能借助 tree shaking 机制只引入它需要的代码。

## Develoment 和 Production 模式的区分打包

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/03-02%20Develoment%20%E5%92%8C%20Production%20%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%8C%BA%E5%88%86%E6%89%93%E5%8C%85/03-02/lesson)

Develoment  sourcemap详细 

Production   sourcemap详细  代码压缩

更换mode不方便，可以创建三个个配置文件，webpack.prod.js  、webpack.dev.js以及webpack.common.js

分别为生产环境配置文件、开发、以及公共配置文件

安装  `npm i webpack-merge -d`

```js
// webpack.pord.js
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map'
}

module.exports = merge(commonConfig, prodConfig);
```

```js
// webpack.dev.js
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		usedExports: true
	}
}

module.exports = merge(commonConfig, devConfig);
```

```js
// webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: 'babel-loader',
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}, {
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		})
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	}
}
```

修改运行命令

```js
// package.json
{
  "scripts": {
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js"
  }
}
```



##  Webpack 和 Code Splitting

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/03-03%20Webpack%20%E5%92%8C%20Code%20Splitting/03-03/lesson)

代码分割

举例

安装 `npm i lodash --save`

使用

```js
// index.js
import _ from 'lodash';
console.log(_.jion(['a','b','c'],'***'))
// 此处省略十万行业务逻辑

```

![](https://img.dubiqc.com/201903/10080938.png)

这样会带来一个问题 打包文件会非常大，加载时间长；第二个问题，lodash文件一般不会变，但是会一块打包

解决问题：

![](https://img.dubiqc.com/201903/11153853.png-sign)

添加入口文件配置

```js
	entry: {
		main: './src/index.js',
        lodash: './src/lodash.js'
	},
```

```js
// index.js
// import _ from 'lodash';  删除
console.log(_.jion(['a','b','c'],'***'))
// 此处省略十万行业务逻辑
```

```js
// lodash.js
 import _ from 'lodash'; 
 window._=_
```

上面的方法是手动不够智能 webpack可以用插件自动分割代码

恢复index.js

```js
// index.js
import _ from 'lodash';
console.log(_.jion(['a','b','c'],'***'))
// 此处省略十万行业务逻辑

```

配置

```js
// webpack.common.js
  optimization: {
		splitChunks: {      //代码分割
			chunks: 'all'
		}
	}
```

这样就完成了同步代码分割

### 异步代码分割

安装 异步引入语法转换器 `npm i babel-plugin-dynamic-import-webpack -D`

配置babelrc

```json
{
	presets: [
		[
			"@babel/preset-env", {
				targets: {
					chrome: "67",
				},
				useBuiltIns: 'usage'
			}
		],
		"@babel/preset-react"
	],
	plugins: ["dynamic-import-webpack"]  // 添加
}
```

动态导入

```js
// index.js
function getComponent() {
	return import('lodash').then(({ default: _ }) => {
		var element = document.createElement('div');
		element.innerHTML = _.join(['Dell', 'Lee'], '-');
		return element;
	})
}

getComponent().then(element => {
	document.body.appendChild(element);
});

// 代码分割，和webpack无关
// webpack中实现代码分割，两种方式
// 1. 同步代码： 只需要在webpack.common.js中做optimization的配置即可
// 2. 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中
```

## SplitChunksPlugin 配置参数详解

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/03-04%20SplitChunksPlugin%20%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3/03-04/lesson)

代码分割底层使用SplitChunksPlugin

[`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin/) 插件可以将公共的依赖模块提取到已有的 entry chunk 中，或者提取到一个新生成的 chunk。

### 更改打包文件名

更换使用官方异步引入[语法转换器](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)

```
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

配置

```json
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

修改文件名写法

```js
 // index.js 
function getComponent() {
 	return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
 		var element = document.createElement('div');
		element.innerHTML = _.join(['Dell', 'Lee'], '-');
 		return element;
 	})
 }

 getComponent().then(element => {
 	document.body.appendChild(element);
 });
 //使用魔法注释  /* webpackChunkName:"lodash" */ 'lodash'
```

这样打包的名字为： vendors~lodash.js

配置[split-chunks-plugin](https://webpack.js.org/plugins/split-chunks-plugin)

```js
// webpack.common.js
  optimization: {
		splitChunks: {      //代码分割
			chunks: 'all',
            cacheGroups: {
                vendors: false,
                default:false
            }
		}
	}
```

配置完 打包名字为 loadsh.js

同步异步代码分割都会被splitChunks配置影响

如果不配置会使用默认配置

```JS
splitChunks: {  }
```

等价于

```JS
// webpack.common.js

module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',   // 只对异步引入代码生效 all ：都分割。同步会进入cacheGroups流程
      minSize: 30000,   //大于30kb才分割 ，同步代码往下走cacheGroups流程
      maxSize: 0,       //二次代码分割临界值，一般不配置
      minChunks: 1,    //最小Chunks引入次数
      maxAsyncRequests: 5,  // 最大并行请求数量
      maxInitialRequests: 3,  // 入口处最大并行请求数
      automaticNameDelimiter: '~', // 组合文件连接符
      name: true,   //cacheGroups文件名有效
      cacheGroups: {
        vendors: {                           // 文件组
          test: /[\\/]node_modules[\\/]/,   // node模块
          priority: -10，                   //组匹配优先级
          filename: 'vendors.js',     
        },
        default: {                          //不属于node模块
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,       // 忽略已打包文件
          filename: 'common.js'
        }
      }
    }
  }
};
```

完整配置阅读[split-chunks-plugin](https://webpack.js.org/plugins/split-chunks-plugin)

##  Lazy Loading 懒加载，Chunk 是什么？

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/03-05%20Lazy%20Loading%20%E6%87%92%E5%8A%A0%E8%BD%BD%EF%BC%8CChunk%20%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F/03-05/lesson)

动态导入模块，导入函数执行以后才加载

```js
// idex.js
function getComponent() {
 	return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
 		var element = document.createElement('div');
		element.innerHTML = _.join(['Dell', 'Lee'], '-');
 		return element;
 	})
 }


// 等价于上面 async写法
async function getComponent() {
	const { default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash');
	const element = document.createElement('div');
	element.innerHTML = _.join(['Dell', 'Lee'], '-');
	return element;
}

document.addEventListener('click', () =>{
	getComponent().then(element => {
		document.body.appendChild(element);
	});
})

```



Chunk 是什么，打包后生成 的文件，每个都是一个chunk



许多框架和类库对于如何用它们自己的方式来实现（懒加载）都有自己的建议。这里有一些例子：

- React: [Code Splitting and Lazy Loading](https://reacttraining.com/react-router/web/guides/code-splitting)
- Vue: [Lazy Load in Vue using Webpack's code splitting](https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/)
- AngularJS: [AngularJS + Webpack = lazyLoad](https://medium.com/@var_bin/angularjs-webpack-lazyload-bb7977f390dd) by [@var_bincom](https://twitter.com/var_bincom)

[vue动态组件 & 异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)

##  打包分析，Preloading,  Prefetching

### 打包分析

<https://github.com/webpack/analyse>

配置方法

```json
// package.json
"dev-build": "webpack --profile --json > stats.json --config ./build/webpack.dev.js",
```

根目录会生成stats.json打包分析文件

进入<http://webpack.github.io/analyse/>

上次分析文件

其他分析工具<https://webpack.js.org/guides/code-splitting#bundle-analysis>

用的较多[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

### 代码覆盖率

 [Chrome DevTools 代码覆盖率功能详解](https://segmentfault.com/a/1190000009013738)

快捷键 crtl + shift +p  输入coverage

Coverage 顾名思义就是代码覆盖率的意思。Coverage 功能使用动态分析（Dynamic Analysis）法来收集代码运行时的覆盖率，让开发者能够窥探他的代码到底有多大比例在发光发热。动态分析是指在应用运行状态下收集代码执行数据的过程，换句话说，覆盖率数据就是在代码执行过程中通过标记收集到的。

代码覆盖率比缓存更为重要，因为缓存第二次才会用到，提高代码覆盖率会提高首次加载时间。

提高代码覆盖率我们需要加页面加载时不需要的代码动态引入，例如登录模块代码，点击登录按钮后才会用到，我们可以在用户点击时加载代码，但是如果点击时才加载登录代码，可能因为网络延迟导致卡顿，所以我们可以使用prefetch和preload。

<link rel="prefetch">是一种告诉浏览器**获取一项可能被**下一页访问**所需要的资源**方式。这意味着资源将以较低优先级地获取（因为浏览器知道当前页面所需要的资源，要比我们猜测在下一页访问所需资源更重要）。这意味着prefetch的主要用途是加速下一页访问速度，而不是当前页面的速度。

Preload是为当前页面服务的，它有一个 as 属性，这可以让浏览器做到很多subresource和prefetch做不到的事情：

- **浏览器可以设置正确的资源优先级**，使得资源可以被正确地加载，重要的资源不再会被延迟，不再被不重要的资源阻塞。
- 浏览器会保证请求对应正确的内容安全策略（[Content-Security-Policy](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) ）指令，不会发起非法请求。
- 浏览器会基于资源类型发送正确的 Accept 首部。（比如获取图片时指定对“image/webp”的支持）
- 浏览器知道资源的类型，所以可以稍后决定资源是否在后续请求中保持可重用。

Preload的另外一个不同是，它有onload事件（至少在Chrome中，对另外两种 rel 取值并没作用）。

Preload**不阻塞window的onload事件**，除非该资源是被一个阻塞该事件的资源请求的。

将这些特性结合在一起，我们可以做到一些新的事情。

加载较晚发现的资源

preload最基本的使用方式是**提前加载较晚发现的资源**。虽然大部分基于标签的资源会被浏览器内部的预加载器（[preloader](http://calendar.perfplanet.com/2013/big-bad-preloader/)）提早发现，但并非所有资源都是基于标签的。有些资源是隐藏在CSS和JavaScript中的，浏览器不知道页面即将需要这些资源，而等到发现它们时已经为时已晚。所以在有些情况，这些资源延缓了首屏渲染，或是延缓了页面关键部分的加载。

查看本站可以看到body结束前的三个defer脚本在页面head做了preload

![](https://img.dubiqc.com/201903/11003137.png)

![](https://img.dubiqc.com/201903/11003254.png)

还可以配合[instant.page](https://instant.page/) ，instant.page使用*即时预加载* - 它在用户点击之前*预先*加载页面。因为鼠标悬停和点击之间有几百毫秒延迟，移动设备上，手指触摸到释放也会有延迟。

或者使用 [GoogleChromeLabs/quicklink](GoogleChromeLabs/quicklink) 这个项目：它由 Google 公司著名开发者 Addy Osmani 发起，实现了：**在空闲时间预获取页面可视区域内的链接，加快后续加载速度。** 

我已经将instant.page已发布到npm [click-prefetch](https://www.npmjs.com/package/click-prefetch)

click-prefetch npm 模块使用

```bash
npm i click-prefetch
```

vue动态引入

```js
 mounted () {
  window.addEventListener('load', () => {
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName:"click-prefetch"*/ 
    'click-prefetch').then(({default: func}) => {
		func();
	})
  });
  }
```

普通引入

```js
// index.js
import  clickPrefetch from 'click-prefetch'

window.addEventListener('load', () => {
  clickPrefetch()
  });
```



### 预取/预加载模块(prefetch/preload module)

webpack v4.6.0+ 添加了预取和预加载的支持。

在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器：

- prefetch(预取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资源

下面这个 prefetch 的简单示例中，有一个 `HomePage` 组件，其内部渲染一个 `LoginButton` 组件，然后在点击后按需加载 `LoginModal` 组件。

**LoginButton.js**

```js
//...
import(/* webpackPrefetch: true */ 'LoginModal');
```

这会生成 `<link rel="prefetch" href="login-modal-chunk.js">` 并追加到页面头部，指示着浏览器在闲置时间预取 `login-modal-chunk.js` 文件。

> 只要父 chunk 完成加载，webpack 就会添加 prefetch hint(预取提示)。

与 prefetch 指令相比，preload 指令有许多不同之处：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

下面这个简单的 preload 示例中，有一个 `Component`，依赖于一个较大的 library，所以应该将其分离到一个独立的 chunk 中。

我们假想这里的图表组件 `ChartComponent` 组件需要依赖体积巨大的 `ChartingLibrary` 库。它会在渲染时显示一个 `LoadingIndicator(加载进度条)` 组件，然后立即按需导入 `ChartingLibrary`：

**ChartComponent.js**

```js
//...
import(/* webpackPreload: true */ 'ChartingLibrary');
```

在页面中使用 `ChartComponent` 时，在请求 ChartComponent.js 的同时，还会通过 `<link rel="preload">` 请求 charting-library-chunk。假定 page-chunk 体积很小，很快就被加载好，页面此时就会显示 `LoadingIndicator(加载进度条)` ，等到 `charting-library-chunk` 请求完成，LoadingIndicator 组件才消失。启动仅需要很少的加载时间，因为只进行单次往返，而不是两次往返。尤其是在高延迟环境下。



### 代码演示

```js
// index.js
document.addEventListener('click', () =>{
	import(/* webpackPrefetch: true */ './click.js').then(({default: func}) => {
		func();
	})
});
```

```js
// click.js
function handleClick() {
	const element = document.createElement('div');
	element.innerHTML = 'Dell Lee';
	document.body.appendChild(element);
}

export default handleClick;
```

动态引入click.js

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/03-06%20%E6%89%93%E5%8C%85%E5%88%86%E6%9E%90%EF%BC%8CPreloading%2C%20%20Prefetching/03-06/lesson)

[import文档包含魔法注释](https://webpack.docschina.org/api/module-methods/#import-)

参考文章

[Preload有什么好处](http://www.alloyteam.com/2016/05/preload-what-is-it-good-for-part1/)

 [Code Splitting with Vue.js And Webpack](https://juejin.im/post/5a372d956fb9a045204c4ff1)

 [异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)

## css文件的代码分割

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/03-07%20CSS%20%E6%96%87%E4%BB%B6%E7%9A%84%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2/03-07/lesson)

小知识

```js
	output: {
		filename: '[name].js',                  // 入口文件名
		chunkFilename: '[name].chunk.js',       // chunk文件名
		path: path.resolve(__dirname, '../dist')
	}
```

### MiniCssExtractPlugin

css分割插件
webpack默认不打包css文件，使用css in js

MiniCssExtractPlugin 暂不支持HRM因此要在生产环境中使用

另外压缩css需要[Optimize CSS Assets Webpack Plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)

安装

```bash
npm install --save-dev mini-css-extract-plugin
npm install --save-dev optimize-css-assets-webpack-plugin
```

修改生产环境配置

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  // 添加插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");//添加插件
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');


const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules:[{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader,    //修改loader
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,   //修改loader
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]  //实例化压缩插件
	},
	plugins: [
		new MiniCssExtractPlugin({                     // 实例化插件
			filename: '[name].css',                    //直接引入页面的css名字
			chunkFilename: '[name].chunk.css'          //
		})
	]
}

module.exports = merge(commonConfig, prodConfig);
```



修改开发环境配置 ，添加cssloader配置

```js
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
}

module.exports = merge(commonConfig, devConfig);
```





修改公共配置  删除css配置

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js',
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: 'babel-loader',
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		})
	],
	optimization: {
		usedExports: true,
		splitChunks: {
      chunks: 'all'
    }
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, '../dist')
	}
}
```



因为开启tree shaking，要配置package.json ，防止删除css

```js
  "sideEffects": [
    "*.css"
  ],
```



高级特性，查看[文档](https://webpack.js.org/plugins/mini-css-extract-plugin)

 使用预加载或内联CSS

在单个文件中提取所有CSS

 媒体查询插件

如果您想从提取的CSS中提取媒体查询（因此移动用户不再需要加载桌面或平板电脑特定的CSS），您应该使用以下插件之一：

- [媒体查询插件](https://github.com/SassNinja/media-query-plugin)
- [媒体查询拆分插件](https://github.com/mike-diamond/media-query-splitting-plugin)

## webpack与浏览器缓存

小知识：

```js
performance: false,  //关闭性能警告 ，超出200kb控制台会警告
 cacheGroups: {
      	vendors: {
      		test: /[\\/]node_modules[\\/]/,
      		priority: -10,
      		name: 'vendors',                     //修改node模块打包文件名
      	}
      }
```

打包后的服务器文件会在用户浏览器生产缓存，因此要修改生产环境output，根据内容产生hash值，内容不变就不会变

```js
output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js'
	}
```

这样代码变化重新上线，用户只需要下载变更打代码部分即可

老版本webpack需要额外配置

```js
	optimization: {
		runtimeChunk: {
			name: 'runtime'  
		}
    }
```

因为老版本webpack处理业务代码和库代码关系的manifest代码可能会变化，配置runtimeChunk会把这部分代码抽离出来

## shimming

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/03-09%20Shimming%20%E7%9A%84%E4%BD%9C%E7%94%A8/03-09/lesson)

垫片

模块化各模块之间的变量不能互相使用，可以使用ProvidePlugin插件自动加载，而不必模块`import`或`require`它们无处不在。

配置plugin

```js
const webpack = require('webpack');

new webpack.ProvidePlugin({
  identifier: 'module1',
  // ...
});
```

要么

```js
const webpack = require('webpack');
new webpack.ProvidePlugin({
  identifier: ['module1', 'property1'],
  // ...
});
```

无论何时`identifier`在模块中遇到自由变量，`module`都会自动加载，并`identifier`用加载的导出填充`module`（或者`property`为了支持命名导出）。

> 要导入ES2015模块的默认导出，必须指定模块的默认属性。

模块中的this默认为这个模块，要想改成window可以使用插件

安装

```
npm i imports-loader -D
```

配置

```js
// webpack.common.js
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}, {
				loader: 'imports-loader?this=>window'   //添加loader
			}]
		}
```

作业

阅读[文档](https://webpack.js.org/guides)

## 环境变量的使用

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/03-10%20%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95/03-10/lesson)

使用环境变量修改

可以配置环境变量使用不同配置文件

```json
// package.json
  "scripts": {
    "dev-build": "webpack --config ./build/webpack.common.js",
    "dev": "webpack-dev-server --config ./build/webpack.common.js",
    "build": "webpack --env.production --config ./build/webpack.common.js"
  }
```

```js
// webpack.common.js
module.exports = (env) => {
	if(env && env.production) {
		return merge(commonConfig, prodConfig);
	}else {
		return merge(commonConfig, devConfig);
	}
}
```

想要消除 [开发环境](https://webpack.docschina.org/guides/development) 和 [生产环境](https://webpack.docschina.org/guides/production) 之间的 `webpack.config.js` 差异，你可能需要环境变量(environment variable)。

webpack 命令行 [环境配置](https://webpack.docschina.org/api/cli/#environment-options) 的 `--env` 参数，可以允许你传入任意数量的环境变量。而在 `webpack.config.js` 中可以访问到这些环境变量。例如，`--env.production` 或 `--env.NODE_ENV=local`（`NODE_ENV` 通常约定用于定义环境类型，查看 [这里](https://dzone.com/articles/what-you-should-know-about-node-env)）。

```bash
webpack --env.NODE_ENV=local --env.production --progress
```

> 如果设置 `env` 变量，却没有赋值，`--env.production` 默认表示将 `--env.production` 设置为 `true`。还有许多其他可以使用的语法。更多详细信息，请查看 [webpack CLI](https://webpack.docschina.org/api/cli/#environment-options) 文档。

对于我们的 webpack 配置，有一个必须要修改之处。通常，`module.exports` 指向配置对象。要使用 `env` 变量，你必须将 `module.exports` 转换成一个函数：

**webpack.config.js**

```js
const path = require('path');

module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
};
```

vue-cli等默认配置了环境变量

```js
// vue.config.js
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/'
}

```

## library的打包

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/04-01%20Library%E7%9A%84%E6%89%93%E5%8C%85/04-01/library)

打包库步骤：

创建文件夹 library

初始化 npm init 

创建库文件

```js
// index.js
import * as math from './math';
import * as string from './string';

export default { math, string }
```

```js
// math.js
export function add(a, b) {
	return a + b;
}

export function minus(a, b) {
	return a - b;
}

export function multiply(a, b) {
	return a * b;
}

export function division(a, b) {
	return a / b;
}
```

```js
// string.js
import _ from 'lodash';

export function join(a, b) {
	return _.join([a, b], ' ');
}
```

安装webpack 

```
npm i webpack webpack-cli -D
```

创建webpack配置文件

```js
const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	externals: 'lodash',        // 见下文
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'library.js',
		library: 'root',     // 支持scrpit引入，全局变量挂到root
		libraryTarget: 'umd'   //支持 es commonjs等模块引入语法
	}
}
```

其他组合配置

```js
		library: 'library',     // 支持scrpit引入，全局变量挂到this
		libraryTarget: 'this'   //不支持 es common.js require.js等模块引入语法
```

```js
		library: 'library',     // 支持scrpit引入，全局变量挂到window 浏览器环境
		libraryTarget: 'window'   //不支持 es common.js require.js等模块引入语法
```

```js
		library: 'library',     // 支持scrpit引入，全局变量挂到global node环境
		libraryTarget: 'global'   //不支持 es common.js require.js等模块引入语法
```

es10规范规定globalThis也可以使用

### 库引用其他库怎么办

例如应用了lodash配置

```js
externals: 'lodash',        
```

`externals` 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。此功能通常对 **library 开发人员**来说是最有用的，然而也会有各种各样的应用程序用到它。

> **用户(consumer)**，在这里是指，引用了「使用 webpack 打包的 library」的所有终端用户的应用程序(end user application)。

### `externals`

```
string` `object` `function` `regex
```

**防止**将某些 `import` 的包(package)**打包**到 bundle 中，而是在运行时(runtime)再去从外部获取这些*扩展依赖(external dependencies)*。

例如，从 CDN 引入 [jQuery](https://jquery.com/)，而不是把它打包：

**index.html**

```html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
```

**webpack.config.js**

```javascript
module.exports = {
  //...
  externals: {
    jquery: 'jQuery'
  }
};
```

这样就剥离了那些不需要改动的依赖模块，换句话，下面展示的代码还可以正常运行：

```javascript
import $ from 'jquery';

$('.my-element').animate(/* ... */);
```

具有外部依赖(external dependency)的 bundle 可以在各种模块上下文(module context)中使用，例如 [CommonJS, AMD, 全局变量和 ES2015 模块](https://webpack.docschina.org/concepts/modules)。外部 library 可能是以下任何一种形式：

- **root**：可以通过一个全局变量访问 library（例如，通过 script 标签）。
- **commonjs**：可以将 library 作为一个 CommonJS 模块访问。
- **commonjs2**：和上面的类似，但导出的是 `module.exports.default`.
- **amd**：类似于 `commonjs`，但使用 AMD 模块系统。

可以接受各种语法……

[完整配置查看文档](https://webpack.docschina.org/configuration/externals/)

### 如何让别人使用库

修改main为打包生的文件

```JSON
// package.json
  "main": "./dist/library.js",
```

最后是发布

查看本站[发布教程](/frontend/node/node.html#npm)

##  PWA 的打包配置

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/04-02%20PWA%20%E7%9A%84%E6%89%93%E5%8C%85%E9%85%8D%E7%BD%AE/04-02/lesson)

安装 http-server 模拟服务器

```bash
npm i http-server -D
```

修改package.json

```json
 "scripts": {
    "start": "http-server dist",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js"
  },
```

打包后运行 `npm run start` 会在dist文件夹下模拟一台服务器

打开127.0.0.1可以访问

如果我们 按`ctrl +c`停止服务器，网页就不能访问了

但是pwa即使服务器挂掉，本地页面缓存还能访问

实现这种技术可以使用插件 ，底层实现是serviceworker 

```
npm i workbox-webpack-plugin -D
```

配置生产环境即可，本地开发不用pwa

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');  // 引入插件
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules:[{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader, 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		}),
		new WorkboxPlugin.GenerateSW({     // 实例化插件
			clientsClaim: true,            
			skipWaiting: true
		})
	],
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js'
	}
}

module.exports = merge(commonConfig, prodConfig);
```

配置成功，运行npm run build打包

会发现打包文件 多了service-worker 和precache-manifest

 可以理解为另类的缓存

此时pwa还不能正常使用，需要在业务代码中启用

```js
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
			.then(registration => {
				console.log('service-worker registed');
			}).catch(error => {
				console.log('service-worker register error');
			})
	})
}
```

重新打包 

启动本地服务器npm run start

再关掉服务器，发现网站还能访问

pwa配置还有很多可以自行查看文档

本站已配置PWA，您可以关掉网络测试，依然可以访问

[pwa](https://lavas.baidu.com/pwa)

##  TypeScript 的打包配置

[全部代码](https://github.com/jinjun1994/example/tree/master/webpack4/04-03%20TypeScript%20%E7%9A%84%E6%89%93%E5%8C%85%E9%85%8D%E7%BD%AE/type-script/type-script)

ts代码

```typescript
import * as _ from 'lodash';

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
  	return _.join(["Hello,", ' ', this.greeting], '');
  }
}

let greeter = new Greeter("world");

alert(greeter.greet());
```



安装 ts-loader typrscript

```
npm i ts-loader typescript -D
```



```js
const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.tsx',   //ts文件入口
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',      // 配置loader
			exclude: /node_modules/    // 引入文件来自node模块不处理
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

tsconfig.json

```json
{
	"compilerOpitons": {
		"outDir": "./dist",  //输出目录
		"module": "es6",     //模块引入方式
		"target": "es5",    // 转为什么形式
		"allowJs": true,    // 允许引入js模块文件
	}
}
```

识别loadsh方法错误调用还需要安装

```
npm i @type/lodash -D
```

引入相应库都有安装type工具

<https://github.com/DefinitelyTyped/DefinitelyTyped>

使用工具[搜索](https://microsoft.github.io/TypeSearch/)