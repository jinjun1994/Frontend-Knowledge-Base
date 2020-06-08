[What I wish I knew about React](https://bitsofco.de/what-i-wish-i-knew-about-react/?utm_source=wweb.dev)

对于具有跨平台能力的 React 体系来说，分包可以将抽象逻辑与平台实现分开。

react 包即是抽象逻辑，它包含了 React 的主干逻辑。例如组件实现、更新调度等。

react-dom 顾名思义就是一种针对 dom 的平台实现，主要用于在 web 端进行渲染。

而声名在外的 react-native 则是原生应用实现，可以通过 react-native 内部的相应机制与操作系统进行通信来调用原生控件进行渲染。

这是一个**依赖倒置**原则的典型应用，**高层模块不应依赖底层模块的具体实现**。简单来说，就是我们只需要将组件按一定的形式编写好，而最终 render 函数是以怎样的机制将 JSX 渲染到页面上的，我们不需要关心，只要这个机制同样遵循我编写组件所依赖的规则就好——这个规则就是 react。