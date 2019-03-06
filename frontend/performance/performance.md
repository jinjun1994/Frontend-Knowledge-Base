# 性能优化

http2

图片 2.1 Firefox支持webp

https://segmentfault.com/a/1190000000490328

https://www.zhangxinxu.com/wordpress/2015/11/css3-will-change-improve-paint/

[在1分钟内让您的网站的页面“即时”](https://javascriptweekly.com/link/59516/web) - 这是一个整洁的小项目，而且非常简单。在您的pag上添加一小段JavaScript，以便当人们将鼠标悬停在他们打算下一步的[位置](https://javascriptweekly.com/link/59517/web)时[，在您的网站上](https://javascriptweekly.com/link/59517/web)添加[即时预取链接](https://javascriptweekly.com/link/59517/web)。如果您想直接使用代码，它是[开源的](https://javascriptweekly.com/link/59518/web)。

### 2.defer和async 区别

当浏览器碰到 `script` 脚本的时候：

1.```` <script src="script.js"></script>````

2. ````<script async src="script.js"></script>````

3. ````<script defer src="myscript.js"></script>````

然后从实用角度来说呢，首先把所有脚本都丢到 `</body>` 之前是最佳实践，因为对于旧浏览器来说这是唯一的优化选择，此法可保证非脚本的其他一切元素能够以最快的速度得到加载和解析。

接着，我们来看一张图咯：

![请输入图片描述](http://segmentfault.com/img/bVcQV0)

蓝色线代表网络读取，红色线代表执行时间，这俩都是针对脚本的；绿色线代表 HTML 解析。

此图告诉我们以下几个要点：

1. *defer* 和 *async* 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
2. 它俩的差别在于脚本下载完之后何时执行，显然 *defer* 是最接近我们对于应用脚本加载和执行的要求的
3. 关于 *defer*，此图未尽之处在于它是按照加载顺序执行脚本的，这一点要善加利用
4. *async* 则是一个乱序执行的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行
5. 仔细想想，*async* 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics