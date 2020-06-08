
### npm 工具 ：

git open

http serve

node-windows

## js

https://github.com/jwilber/roughViz 手绘图表库

https://vime-js.com/integrations/svelte **[Vime：一种新的，现代的网络媒体/视频播放器](https://javascriptweekly.com/link/87035/web)**

[GLTFJSX 1.0：将GLTF转换为JSX组件](https://javascriptweekly.com/link/83676/web) —将GLTF（GL传输格式）文件（用于3D模型和场景）转换为可重复使用的[ Three.js](https://javascriptweekly.com/link/83677/web)组件。

[EPANET-JS：用JavaScript建模供水网络](https://javascriptweekly.com/link/82965/web)

[图形代码：将JavaScript代码可视化为网络图](https://javascriptweekly.com/link/82264/web) 

https://github.com/nextapps-de/flexsearch 全文搜索

https://www.babylonjs.com/  [Babylon.js 4.0 ：（非常）强大的WebGL图形引擎](https://javascriptweekly.com/link/81897/web)

[OpenLayers](https://openlayers.org/)是一个高性能，功能丰富的库，用于在Web上创建交互式地图。

[WebGLStudio.js：浏览器中的3D图形编辑器](https://javascriptweekly.com/link/80719/web) -并不是什么*新鲜事物，*但它的作者说它已经成熟，可以扩展并可以在生产中使用（尽管离1.0版本还有一点距离）。

[litegraph.js：图形节点引擎和编辑器](https://javascriptweekly.com/link/80712/web) -如果您需要创建一个在线系统供用户创建和操作图形或互连“节点”（例如图形，音频或数据管道），这将非常有用

### css

[CSS animation library](http://kristofferandreasen.github.io/wickedCSS/examples.html)

https://css-doodle.com/ css 绘制图案

https://neumorphism.io/#55b9f3

https://csslayout.io/



[#用于加快JavaScript开发的Visual Studio代码设置和扩展](http://tilomitra.com/vs-code-settings-and-extensions-for-faster-javascript-development/)

docker 

 [Docker 在前端开发中的实践](https://yugasun.com/post/docker-practice-in-frontend.html)

<http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html>Docker 入门教程

### 2.下载并运行 Ubuntu 镜像

本文以 最新版本为例，直接拉取 Docker Hub 镜像到本地：

```shell
docker pull ubuntu
```

指定版本为： `docker pull ubuntu:14.04`

运行成功后，查看是否拉取成功：

````
docker images
````

`                                                                                                                                                                              `

```bash
winpty docker container run -p 8000:3000 -it ubuntu
```

直接使用docker run 运行ubuntu的镜像时会出现 the input device is not a TTY.  If you are using mintty, try prefixing the command with 'winpty' 的错误，前面加上winpty即可，即winpty docker run ---



```
apt-get update
```

```
apt-get install vim bash-completion zsh git curl
```

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

安装成功后直接运行一下命令：

```
nvm install stable
```

一般该命令会安装当前最新稳定版本的 nodejs, 安装成功后检查一下：

`node -v`







`winpty docker container exec -it 7add9d080c23 /bin/bash                                                                                                                 `

进容器

git bash 使用双斜杆

`winpty docker container exec -it 7add9d080c23 //bin/bash                                                                                                                 `



`docker container rm id`

删除 容器

可以同时输入多个id


