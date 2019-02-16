---
{
author: jinjun,
title: 基础知识,
date: 2018/11/21,
lang: en-US,
meta: [{name: description,
      content: hello},
    {name: keywords,
    content: super duper SEO}]
}
---

[[toc]]

## 闭包







什么时候将作用域规则应用与子程序？

### 闭包究竟是什么？

历史背景：闭包这个概念第一次出现在1964年的《The Computer Journal》上，由**彼得·约翰·兰丁** （**Peter John Landin**）在《The mechanical evaluation of expressions》一文中提出了applicative expression（应用表达式）和closure（闭包）的概念。 





文中AE的概念定义如下：

> We are, therefore, interested in a class of expressions about any one of which it is appropriate to ask the following questions:
> Q1. Is it an identifier? If so, what identifier?
> Q2. Is it a λ-expression? If so, what identifier or identifiers constitute its bound variable part and in what arrangement? Also what is the expression constituting its λ-body?
> Q3. Is it an operator/operand combination? If so, what is the expression constituting its operator? Also what is the expression constituting its operand?
> We call these expressions applicative expressions (AEs).

简单翻译

> 这样，我们对于能够适合提问以下问题的一类特性表达式感兴趣：
> Q1. 它是否是标识符？ 如果是的话，是什么标识符？
> Q2. 它是否是λ表达式？ 如果是的话，哪个或者哪些的标识符构成了它的绑定变量部分，范围是什么？还有是什么表达式构成了它的λ-body？
> Q3. 它是否是操作符/操作数的组合？如果是的话，构成它的操作符的表达式是什么？还有构成它的操作数的表达式又是什么？
> 我们称这一类表达式为“适用表达式”（AE）。

在AE的基础上，闭包定义为

> Also we represent the value of a λ-expression by a bundle of information called a "closure", comprising the λ-expression and the environment relative to which it was evaluated. We must therefore arrange that such a bundle is correctly interpreted whenever it has to be applied to some argument. More precisely:
> a closure has an environment part which is a list whose two items are:
> (1) an environment
> (2) an identifier or list of identifiers
> and a control part which consists of a list whose sole item is an AE.

翻译如下

> 此外，我们把带有一系列信息的λ表达式称作"闭包"，其中包括λ表达式和它执行时的相关连的环境。于是我们要确保无论当它被用于什么参数时，这些信息都能够被正确解析。更精确地：
> 闭包包含环境部分，它是个只有两项的list，这两项分别是：
> (1)环境
> (2)一个标识符或者标识符列表
> 以及控制部分，他是个只有一项的list，唯一的项是个AE

在1975年，Scheme最早实现了闭包。

60年代，因为受到函数式思维影响，计算机软件领域的"表达式"一般是包括λ表达式，也就是函数式语言中的函数的。所以这个闭包的定义在80年代后被更多过程式语言借鉴，其中包括C语言的static全局变量机制、C++的成员函数、JavaScript的局部函数。对于过程式语言中，因为很少有函数以外的"表达式"，所以闭包这个概念更多被用于指函数。

在JavaScript中，我们称函数对象为闭包。根据ECMA-262规范，JavaScript的函数包含一个[[scope]]属性。[[scope]]指向scope chain（ECMA-262v3）或者Lexical Environment（ECMA-262v5）。这对应于闭包的环境部分，[[scope]]中可访问的属性列表即是标识符列表，对象本身的引用则对应于环境。控制部分即是函数对象本身了。



`闭包` 是指有权访问另一个函数作用域中的变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量

闭包的缺点就是常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

闭包是`javascript`语言的一大特点，主要应用闭包场合主要是为了：设计私有的方法和变量。

一般函数执行完毕后，局部活动对象就被销毁，内存中仅仅保存全局作用域。但闭包的情况不同，**闭包**会使变量始终保存在内存中，如果不当使用会增大内存消耗。 



### 闭包的应用

闭包可以用优雅的方式来处理一些棘手的问题，有些程序员声称没有闭包简直就活不下去了。这虽然有些夸张，却从侧面说明闭包有着强大的功能。下面列举了一些闭包应用。

### 加强模块化

闭包有益于模块化编程，它能以简单的方式开发较小的模块，从而提高开发速度和程序的可复用性。和没有使用闭包的程序相比，使用闭包可将模块划分得更小。比如我们要计算一个数组中所有数字的和，这只需要循环遍历数组，把遍历到的数字加起来就行了。如果现在要计算所有元素的积呢？要打印所有的元素呢？解决这些问题都要对数组进行遍历，如果是在不支持闭包的语言中，我们不得不一次又一次重复地写循环语句。而这在支持闭包的语言中是不必要的，比如对数组求和的操作在 Ruby 中可以这样做：

##### 清单 10. 加强模块化

`nums = [10,3,22,34,17]``sum = 0``nums.each{|n| sum += n}``print sum`

这种处理方法多少有点像我们熟悉的回调函数，不过要比回调函数写法更简单，功能更强大。因为在闭包里引用环境是函数定义时的环境，所以在闭包里改变引用环境中变量的值，直接就可以反映到它定义时的上下文中，这是通常的回调函数所不能做到的。这个例子说明闭包可以使我们把模块划分得更小。

### 抽象

闭包是数据和行为的组合，这使得闭包具有较好抽象能力，下面的代码通过闭包来模拟面向对象编程。函数 make_stack 用来生成 stack 对象，它的返回值是一个闭包，这个闭包作为一个 Dispatcher，当以 “push” 或 “pop” 为参数调用时，返回一个与函数 push 或 pop 相关联的闭包，进而可以操作 data 中的数据。

##### 清单 11. 抽象

`function make_stack()` `    ``local data = {};``    ``local last = -1;` `    ``local function push(e)``        ``last = last + 1;``        ``data[last] = e;``    ``end` `    ``local function pop()``        ``if last == -1 then``            ``return nil``        ``end``        ``last = last - 1``        ``return data[last+1]``    ``end` `    ``return function (index)``        ``local tb = {push=push, pop=pop}``        ``return tb[index]``    ``end``end` `s = make_stack()` `s("push")("test0")``s("push")("test1")``s("push")("test2")``s("push")("test3")` `print(s("pop")())``print(s("pop")())``print(s("pop")())`

如果加入一些方便调用“对象方法”的语法糖，这看起来很像是面向对象的语法。当然 Lua 中有自己的面向对象语法和机制，所以几乎看不到有人写这样的 Lua 代码，但是对于 Scheme 等没有内建面向对象支持也没有内建复杂数据抽象机制的语言，使用闭包来进行抽象是非常重要的手段。

### 简化代码

我们来考虑一个常见的问题。在一个窗口上有一个按钮控件，当点击按钮时会产生事件，如果我们选择在按钮中处理这个事件，那就必须在按钮控件中保存处理这个事件时需要的各个对象的引用。另一种选择是把这个事件转发给父窗口，由父窗口来处理这个事件，或是使用监听者模式。无论哪种方式，编写代码都不太方便，甚至要借助一些工具来帮助生成事件处理的代码框架。用闭包来处理这个问题则比较方便，可以在生成按钮控件的同时就写下事件处理代码。







```javascript
var pet = function(name) {          //外部函数定义了一个变量"name"
  var getName = function() {            
    //内部函数可以访问 外部函数定义的"name"
    return name; 
console.dir(getName);
  }
  //返回这个内部函数，从而将其暴露在外部函数作用域
console.dir(getName);
  return getName;               
};
myPet = pet("Vivie");
    
myPet(); 
```

## 运行机制

生命周期

页面构建过程

事件处理

## 数据类型

数组

对象

# 异步编程全传

各种技术方案的涌现是为了解决实践中遇到的各种问题，本文将从这个角度带你梳理并掌握异步编程的核心内容。

本文首先对单线程异步的原理进行了解读，接着按照发展历程分析了JavaScript异步解决方案，详述了Callback、Promise、Generator、Async/Await的特性和使用原理。

JavaScript其中一个基本的特性就是单线程：比如，浏览器无法同时运行两个事件处理程序，行更新应用状态和文档状态根本是不可能的。之所以设计成单线程的原因就是，客户端的JavaScript函数必须不能运行太长时间：否则会导致循环事件，Web浏览器无法对用户输入作出响应。这也是为什么Ajax的API都是异步的

对于JavaScript这样单线程的东西唯一的解耦方法就是提供异步API

异步

同步













## 回调函数

异步编程的一种方法是使执行缓慢行为的函数接受额外的参数，即回调函数。该行为被启动，当它
完成时，使用结果调用回调函数。

同步的回调函数

例如，在 Node.js 和浏览器中都可用的 setTimeout 函数，等待给定的毫秒数（一秒为一千毫
秒），然后调用一个函数。



控制反转

事件驱动 

promise

rxjs



小知识

console.log是异步的吗？

WebKit的console.log由于表现出异步行为而让很多开发者惊诧
不已。在Chrome或Safari中，以下这段代码会在控制台记录
{foo:bar}。

```javascript
var obj = {}; 
console.log(obj); 
obj.foo = 'bar'; 
```

怎么会这样？WebKit的console.log并没有立即拍摄对象快照，
相反，它只存储了一个指向对象的引用，然后在代码返回事件队
列时才去拍摄快照。

Node的console.log是另一回事，它是严格同步的，因此同样的
代码输出的却为{}。

## 函数

函数定义、参数

函数调用、this、call 、apply、bind

箭头函数 

闭包、作用域

## 对象、类和继承

面向对象与原型 继承 class 

模块化

## 数组

数组去重



# 开发者工具devtools

# 编程思想

控制反转

中间件

````javascript
let _isArray;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = x => Object.prototype.toString.call(x) === '[object Array]';
}

export const isArray = _isArray;
````

# 命令行

Linux 常用命令

Windows







