

[#用于加快JavaScript开发的Visual Studio代码设置和扩展](http://tilomitra.com/vs-code-settings-and-extensions-for-faster-javascript-development/)

## docker

[docker命令速查](https://www.w3xue.com/manual/docker/)

 [Docker 在前端开发中的实践](https://yugasun.com/post/docker-practice-in-frontend.html)

<http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html>Docker 入门教程

[Dockerize Vue.js App](https://cn.vuejs.org/v2/cookbook/dockerize-vuejs-app.html)



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



```bash
 docker  run --name workUbuntu --mount type=bind,source=~/work/workUbuntu,target=/work -p work/ubuntu
```



```bash
docker run -d \
  -p 8080:80\
  -it \
  --name devtest \
  --mount type=bind,source="$(pwd)"/target,target=/app \
  work/ubuntu
```

```bash
docker run -p 8080:80 -it --name devtest  --mount type=bind,source="$(pwd)"/target,target=/app work/ubuntu //bin/bash
```

windows 加 winpty

```bash
winpty docker run -p 8080:80 -it --name devtest  --mount type=bind,source="$(pwd)"/target,target=/app work/ubuntu //bin/bash
```



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

安装 zsh

安装wget





`winpty docker container exec -it 7add9d080c23 /bin/bash                                                                                                                 `

进入正在运行容器

git bash 使用双斜杆

`winpty docker container exec -it 7add9d080c23 //bin/bash                                                                                                                 `

开启容器

docker container start id

`docker container rm id`

删除 容器

可以同时输入多个id







npm 工具 ：

git open

http serve

