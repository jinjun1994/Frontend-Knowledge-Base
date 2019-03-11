# 三大框架

## 现代前端框架概论



现在前端框架非常多了，如果让我们回答 “为什么要用前端框架” 这个问题，你觉得是下面这些原因吗？

- 组件化。
- 拥有强大的开源社区。
- 拥有大量第三方库解决大部分问题。
- 拥有大量现成的第三方组件。
- 拥有浏览器拓展/工具帮助快速 debug。
- 友好的支持单页应用。

不，这些都不是根本原因，最多算前端框架的营销手段。作者给出的最根本原因是：

**解决 UI 与状态同步的难题。**

作者假设了一个没有前端框架的项目，就像 Jquery 时代，我们需要手动同步状态与 UI。就像下面的代码：

```
addAddress(address) {
  // state logic
  const id = String(Dat.now())
  this.state = this.state.concat({ address, id })

  // UI logic
  this.updateHelp()

  const li = document.createElement('li')
  const span = document.createElement('span')
  const del = document.createElement('a')
  span.innerText = address
  del.innerText = 'delete'
  del.setAttribute('data-delete-id', id)

  this.ul.appendChild(li)
  li.appendChild(del)
  li.appendChild(span)
  this.items[id] = li
}
```

首先更新效率是个问题，最大问题还是同步问题。试想多次与服务器交互，在同步过程中漏执行了一步，会导致之后的 UI 与状态逐渐脱节。

因为我们只能一步步同步状态与 UI，却无法保证每个瞬间 UI 与状态是完全同步的，任何一个疏忽都会导致 UI 与状态脱节，而我们除了不断检查 UI 与数据是否对应，毫无办法。

所以现代框架最重要的帮助是保持 UI 与状态的同步。

### 如何做到

有两种思路：

1. 组件级重渲染：比如 React，当状态改版后，映射出改变后的虚拟 DOM，最终改变当前组件映射的真实 DOM，这个过程被称为 reconciliation。
2. 监听修改：比如 Angluar 和 Vue.js，状态改变直接触发对应 DOM 节点中 value 值的变化。

这里稍微说明下，React 虽然是整体渲染，但在虚拟 DOM 作用下，效率不比 observable 低。observable 在值不能完整映射 UI 时，也需要做更大范围的 rerender。另外，Vue.js 与 Angluar 也早已采用了虚拟 DOM。

这三个框架已经融会贯通，作者提到的两种思路现在已经是一种混合技术了。

### 那 web components 呢？

大家经常会拿 React, Angluar, Vue.js 与 [web components](https://www.webcomponents.org/) 做比较，可 web components 最大的问题就是，没有解决 UI 与状态同步。

web components 只提供了模版语法，自定义标签解决 html 的问题，并没有给出一套状态与 UI 同步的方法。

所以就算使用 web components，我们可能还需要一个框架做 UI 同步，比如 Vue.js 或者 [stenciljs](https://stenciljs.com/)。

作者还提供了一段简短的 UI 状态同步实例，这里略过。

最后给出了四点总结：

- **现代 js 框架主要在解决 UI 与状态同步的问题。**
- 仅使用原生 js 难以写出复杂、高效、又容易维护的 UI 代码。
- Web components 没有解决这个主要问题。
- 虽然使用虚拟 DOM 库很容易造一个解决问题的框架，但不建议你真的这么做！

## 3 精读

作者的核心观点是，现代前端框架主要解决 UI 与状态同步的问题，这是毫无疑问的，也提到了包括 web components 也依然没有解决这个问题。

这可能是 web 开发最核心的问题了。

最初开发者的精力都在前端标准化上，诞生了一系列解决标准化问题的库，最有知名度的是 jquery。当前端进入 react 时代后，可以看到精力从解决标准化到解决 web 规范与实践的冲突，这个冲突正是作者说的问题。

### 前端三剑客

问题就出现在 html、js、css 三者分离上。

html、css、js 各是一套独立的体系，但 js 又能同时控制 html 与 css，**那为了解决同步问题，最好将控制权全部交给 js**。

这样 web components 的问题也就好理解了，web components 解决的是 html 问题，注定与 js 无关。

html 官方规范估计很难出现现代框架的设计了，因为官方设计中前端三剑客是相互分离的方案，为了解决现阶段前端框架的问题，html 必须由 js 完全接管，这几乎就是 jsx，或者支持 template 语法的 html，可这与最初网页设计思路是违背的。

html 是独立的，甚至可以不依赖 js 运行，这天然导致了 UI 与状态同步这个难题。

### 为什么一定要用 js

html 不依赖 js 的设计可能已经跟不上前端发展步伐了，也许 jsx 或者 template 才是真正的未来。

诚然，html 现在的设计可以在不支持 js 的浏览器执行，但就在最近，所有现代浏览器都支持了 service worker，它是凌驾于 html 执行时机之上的 js 脚本，甚至可以拦截 html 请求。一个不支持 js 的浏览器，可能也无法支持 service worker，禁用 js 的坚持可能只剩下安全性保护。

而实际上现代 web 页面都使用了 js 完全主导网页渲染，所以这已经从技术问题上升到了社会问题，如今禁用 js 的浏览器还有多少网页可以正常访问？除了某些超大型网站对禁用 js 状态做了特殊优化以外，现在几乎没有前端项目会考虑禁用 js 的情况了，因为我们不会假设 React、Angluar、Vue.js 框架代码无法运行。

### 所以为什么不融合 html 与 js 呢？

既然事实上 UI 已经与 js 绑定了，那 w3c 为何不将 jsx 或者 template 列为标准呢？也许为了向前兼容，规范永远也迈不出这一步吧。

幸运的是，这并不妨碍现代前端框架的大量普及，而且势不可挡。

## 4 总结

也许 UI 与状态同步的问题是前端发展的最大阻力，虽然现代化框架已经解决了这个问题，但 w3c 标准却一直无法往这个方向发力，导致 web 的下一个发展方向难以依靠标准规范来推动。前端日新月异的发展，很大一部分是规范的发展带来的，而现在我们进入了一个由工业化领导的时代，规范很可能永远也跟不上来，随之而来的是工业化社区也难以做进一步突破。

前端不仅是 web，或者也许下一个突破并不在 web，而是 ar/vr 或者下一个人机交互场景。同样，web 也不仅是前端三剑客，如果认为 React、Angluar、Vue.js 带来的工业化规范就是新的规范，前端才有动力向后发展，比如基于虚拟 DOM 的新框架、新语言。

所以笔者推导出现代前端开发的本质，是将 js、html 的平行关系变成了 js 包含 html 的关系，正如上面所说，这可能背离了 w3c 的初衷，但这就是现在的潮流。

最后总结一下观点：

1. 也是原作者的，**现代 js 框架主要在解决 UI 与状态同步的问题。**
2. 传统的前端三剑客正面临着进一步发展乏力的危机。
3. 现代前端框架正在告诉我们新的三剑客：js（虚拟 dom、虚拟 css）。

## mvvm



##  生命周期

## scort

## 组件通信

## 事件

## shaddom

## webcomponent

[## 不吹不黑聊聊前端框架](https://juejin.im/entry/5a064a716fb9a045117099ad)

css 解决方案

<https://juejin.im/post/5b39e63ae51d4562aa017c81#heading-5>

<https://juejin.im/post/5b39e63ae51d4562aa017c81>

[css module vue](https://juejin.im/post/5ac5fd7f5188257cc20d854e#heading-14) 

 [React Fiber架构](https://zhuanlan.zhihu.com/p/37095662)

[**那么前端框架到底解决了什么问题？**](https://zhuanlan.zhihu.com/p/45510072)

[Dan Abramov](https://overreacted.io/)

 [250行实现一个简单的MVVM](https://zhuanlan.zhihu.com/p/24475845)

 [双向绑定的简单实现--构建利用Proxy和Reflect实现的微框架(基于ES6)](https://zhuanlan.zhihu.com/p/25558715)

## [深入理解Proxy 及 使用Proxy实现vue数据双向绑定](https://www.cnblogs.com/tugenhua0707/p/10306793.html)

## 单向数据流

<https://segmentfault.com/a/1190000012861862>nexttick vue

 [Vue源码详解之nextTick：MutationObserver只是浮云，microtask才是核心！](https://github.com/Ma63d/vue-analysis/issues/6)

<https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js>

