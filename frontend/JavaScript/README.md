---
{
author: jinjun,
title: 基础知识,
date: 2019/02/10,
lang: en-US,
meta: [{name: description,
      content: hello},
    {name: keywords,
    content: super duper SEO}]
}
---

[[toc]]

## 类型

JavaScript 中有七种基本的类型。

- `number` 用于任何类型的数字：整数或者浮点数。
- `string` 用于字符串。一个字符串可以包含一个或多个字符，所以没有单独的单字符类型。
- `boolean` 用于 `true` 和 `false`。
- `null` 用于未知的值 —— 只有一个 `null` 值的独立类型。
- `undefined` 用于未定义的值 —— 只有一个 `undefined` 值的独立类型。
- `object` 用于更复杂的数据结构。
- `symbol` 用于唯一的标识符。

## 类型判断

`typeof` 运算符可以查看变量的类型。

- 两种形式：`typeof x` 或者 `typeof(x)`。
- 返回的类型的字符串，比如 `"string"`。
- `null` 返回 `"object"` —— 这是语言中的一个错误，实际上它并不是一个对象。

`typeof` 对于基本类型，除了 `null` 都可以显示正确的类型

```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b 没有声明，但是还会显示 undefined
typeof` 对于对象，除了函数都会显示 `object
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```











## 运行机制

生命周期

页面构建过程

事件处理

## 数据类型

数组

对象



## 函数

函数定义、参数

函数调用、this、call 、apply、bind

箭头函数 

闭包、作用域

## 对象、类和继承

面向对象与原型 继承 class 

模块化



## 开发者工具devtools

# 编程思想

控制反转

中间件





# 命令行

Linux 常用命令

Windows







