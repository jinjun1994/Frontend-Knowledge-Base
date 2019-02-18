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

## 异步编程全传

各种技术方案的涌现是为了解决实践中遇到的各种问题，本文将从这个角度带你梳理并掌握异步编程的核心内容。

首先对单线程异步的原理进行解读，接着按照发展历程分析JavaScript异步解决方案，详述Callback、Promise、Generator、Async/Await的特性和使用原理。

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



### 数组的创建

------

数组的创建有三种方式：构造函数方式、字面量方式、ES6新增的Array.of()方法创建。

- 构造函数方式：

  ```javascript
  let arr = new Array(); // 创建一个空数组
  let arr = new Array(10); // 创建长度为10的数组
  let arr = new Array('a'); // 创建包含一个字符串元素a的数组
  let arr = new Array(10, 'a'); // 创建包含10和字符串a两个元素的数组 
  ```

  > 小结：
  >  1.new 关键字是可省略的
  >  2.当只传一个number类型参数时，创建的是参数指定长度的数组。**即构造函数形式创建数组，不能创建只包含一个number类型元素的数组**

- 字面量方式：

  ```javascript
  let arr = [10, 'a'];  // 字面量方式，即直接给数组赋值
  ```

- Array.of()方法（ES6新增）：
   方法的作用是将一组值（即传进来的参数）转换为数组。
   该方法的作用非常类似 Array 构造器，但在使用单个数值参数的时候并不会导致特殊结果。 Array.of() 方法总会创建一个包含所有传入参数的数组，而不管参数的数量与类型。

  ```javascript
  let arr = Array.of(3); 
  console.log(arr); // [3]
  // 参数可以是各种类型
  let arr1 = Array.of(1, 'a', true, null, undefined, {name: "zhangsan"}, [45]);
  console.log(arr1); // [ 1, 'a', true, null, undefined, { name: 'zhangsan' }, [ 45 ] ]
  
  ```

- Array.from() 方法(es6新增)

  从一个类似数组或可迭代对象中创建一个新的数组实例。

  语法： `Array.from(arrayLike[, mapFn[, thisArg]])`

  参数

  - `arrayLike`

    想要转换成数组的伪数组对象或可迭代对象。

  - `mapFn (可选参数)`

    如果指定了该参数，新数组中的每个元素会执行该回调函数。

  - `thisArg (可选参数)`

    可选参数，执行回调函数 `mapFn` 时 `this` 对象。

  返回值：一个新的数组实例

  ````javascript
  // Array from a String
  Array.from('foo'); 
  // ["f", "o", "o"]
  
  //Array from a Set
  let s = new Set(['foo', window]); 
  Array.from(s); 
  // ["foo", window]
  
  // Array from a Map
  let m = new Map([[1, 2], [2, 4], [4, 8]]);
  Array.from(m); 
  // [[1, 2], [2, 4], [4, 8]]
  
  // Array from an Array-like object (arguments)
  function f() {
    return Array.from(arguments);
  }
  f(1, 2, 3);
  // [1, 2, 3]
  
  // 在Array.from中使用箭头函数
  Array.from([1, 2, 3], x => x + x);  
  // [2, 4, 6]
  ````


### 数组的检测

------

两种较为准确的检测方法：

- 利用对象的toString方法：
   Object.prototype.toString.call([]) === "[object Array]";  // true

- Array.isArray():
   Array.isArray([1, 2, 3]);  // true

  ````javascript
  let _isArray;
  if (Array.isArray) {
    _isArray = Array.isArray;
  } else {
    _isArray = x => Object.prototype.toString.call(x) === '[object Array]';
  }
  
  export const isArray = _isArray;
  ````


### 数组的属性

------

- length属性：

   作用： 

  - 设置或返回数组的长度
  - 可用来增加和删除数组项

  ```javascript
  let arr = [1, 2];  
  arr.length = 1;  
  console.log(arr); // [1]  
  arr.length = 3;    
  console.log(arr); // [1, , ] 
  ```

### 数组的方法

------

JavaScript的数组方法包括数组原型的方法、构造函数的方法（ES6新增部分）

![](<http://img.dubiqc.com/chrome_WIlkQ23Fpm.png>)

上图可知通过 Array 构造函数有 Array.from() 、Array.isArray()、Array.of()三个方法。上面已经讲过。

所有数组实例都会从 [`Array.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype) 继承属性和方法。

方法可以分为访问器方法、修改器方法以及迭代方法。

 针对每一个方法我们主要了解四个方面：**作用、参数、返回值、原数组是否改变**
 **（一）. 原型上的方法**

1. **push()：**
    作用：向数组的末尾添加一项或多项
    参数：ele1[, ele2[, ...[, elen]]]
    返回值：添加元素后数组的长度
    原数组是否改变：是

   ```
   let arr = [1, 2, 3];
   let temp = arr.push('a', 'b');
   console.log(arr, temp); // [1, 2, 3, 'a', 'b'] 5
   
   ```

2. **pop():**
    作用：删除数组最后一项
    参数：无
    返回值：删除的那一项
    原数组是否改变：是

   ```
   let arr = [1, 2, 3];
   let temp = arr.pop();
   console.log(arr, temp); // [1, 2] 3
   
   ```

3. **unshift():**
    作用：向数组开头添加一项或多项
    参数：ele1[, ele2[, ...[, elen]]]
    返回值：添加元素后数组的长度
    原数组是否改变：是

   ```
   let arr = [1, 2, 3];
   let temp = arr.unshift('a', 'b');
   console.log(arr, temp); // ['a', 'b', 1, 2, 3] 5
   
   ```

4. **shift():**
    作用：删除数组第一项
    参数：无
    返回值：删除的那一项
    原数组是否改变：是

   ```
   let arr = [1, 2, 3];  
   let temp = arr.shift();
   console.log(arr, temp); // [2, 3] 1
   
   ```

5. **splice():**
    作用：删除、插入、替换数组项
    参数：startIndex[, deleteCount[, item1[, ...[, itemN]]]]
    返回值：删除项组成的数组
    原数组是否改变：是

   ```
   let arr = [1, 2, 3];
   
   // 插入元素
   let temp = arr.splice(1, 0, 'a', 'b'); // 在索引1的位置插入元素'a'和'b' 
   console.log(arr, temp); // [1, 'a', 'b', 2, 3] []
   
   // 删除元素
   let temp1 = arr.splice(1, 2); // 删除从索引1的位置开始的2项 
   console.log(arr, temp1); // [1, 2, 3] ['a', 'b']
   
   // 替换一个元素
   let temp2 = arr.splice(1, 1, 'a'); // 将索引1的位置的元素替换为'a'
   console.log(arr, temp2); // [1, 'a', 3 ] [2]
   
   // 替换多个元素
   let temp3 = arr.splice(0, 2, 'b', 'c'); // 将索引0的位置开始的两项，替换成’b‘和’c‘
   console.log(arr, temp3); // [’b‘, 'c', 3] [1, 'a']
   
   // 只传第一个参数，则删除从第一个参数指定的位置到数组结尾的所有项
   let temp4 = arr.splice(0); //从索引0的位置开始，删除后面的所有项
   console.log(arr, temp4); // [] [’b‘, 'c', 3]
   
   ```

6. **copyWithin()**
    作用：将数组指定位置（start到end）的元素复制到当前数组的其他位置（target开始），这种复制会替换原位置的元素（ES6新增）
    参数说明：target[,start[,end]]
    参数说明：

   - target: 复制的目标位置（包括），即要被替换的元素开始的位置
   - start: 要copy的元素的开始位置，默认0
   - end: 要copy的元素的结束位置，默认为数组最后一个元素

   返回值：复制替换之后的数组
​    原数组是否改变：是

   ```
   let arr = [1, 2, 3, 4, 5];
   // 用索引0~4范围内的元素，替换索引3~4范围内的元素，因为要替换的位置只有两个，所以只将4，5替换为了1，2
   let temp = arr.copyWithin(3);
   console.log(arr, temp); //  [1, 2, 3, 1, 2] [1, 2, 3, 1, 2]
   
   let arr1 = [1, 2, 3, 4, 5];
   // 用索引2~4范围内的元素，替换索引3~4范围内的元素，因为要替换的位置只有两个，所以只将4，5替换为了3，4
   let temp1 = arr1.copyWithin(3, 2);
   console.log(arr1, temp1); // [1, 2, 3, 3, 4] [1, 2, 3, 3, 4]
   
   ```

   > 小结：
   >
   >  >  总结上述的描述，copyWithin的作用就是在**数组长度的范围内**，复制start(包括)到end(不包括)范围内的元素，然后用上述的元替换掉从target（包括）开始到数组结尾的元素，能替换多少就替换多少

7. **reverse():**
    作用：翻转原数组
    参数：无
    返回值：翻转后的数组
    原数组是否改变：是

   ```
   let arr = [1, 2, 3];
   let temp = arr.reverse();
   console.log(arr, temp); // [ 3, 2, 1 ] [ 3, 2, 1 ]
   
   ```

8. **sort():**
    作用：数组排序
    参数：compareFunction
    参数说明：

   - compareFunction返回值大于0时调换当前比对项的顺序，否则顺序不 变;
   - 参数可以不传，不传默认按照Unicode编码的顺序排列

   返回值：排序后的数组
​    原数组是否改变：是

   ```
    // 数组从小到大排序
   let arr = [1, 4, 6, 7, 8, 3, 2];
   let temp = arr.sort((a, b) => {
       return a - b;
   })
   console.log(arr, temp); // [ 1, 2, 3, 4, 6, 7, 8 ] [ 1, 2, 3, 4, 6, 7, 8 ]
   
   // 一个实用的数组排序的例子，根据对象元素的排序，排序对象在数组中的位置
   let objArr = [{id: 3, name: "lilei"},{id: 1, name: "hanmeimei"},{id: 2, name: "yimi"}];
   let tempArr = objArr.sort((a, b) => {
       // 按照id从小到大的顺序，对数组中的对象进行排序
       // 这个示例说明回调函数的形参a,b实际就是数组中当前进行比对的两个元素
       return a.id - b.id;
   }); 
   console.log(objArr); //  [{id: 1, name: 'hanmeimei'}, {id: 2, name: 'yimi'}, { id: 3, name: 'lilei' }]
   console.log(tempArr); // [{id: 1, name: 'hanmeimei'}, {id: 2, name: 'yimi'}, { id: 3, name: 'lilei'}]
   
   ```

9. **concat():**
    作用：基于当前的数组拼接数组
    参数：value1[, value2[, ...[, valueN]]
    参数说明：

   - 参数的类型可以是任意类型。
   - 不是数组类型直接按顺序拼接到数组末尾，数组类型的则将数组元素逐一取出拼接到数组末尾
   - 不传则相当于复制数组

   返回值：拼接后的数组
​    原数组是否改变：否

   ```
   let arr = [1,2];
   let temp = arr.concat('a', {id:1}, ['lilei', 'hanmeimei']);
   console.log(arr, temp); // [ 1, 2 ] [ 1, 2, 'a', { id: 1 }, 'lilei', 'hanmeimei']
   
   // 用于复制数组
   let arr = [1, 2];
   let temp = arr.concat();
   console.log(arr, temp);  // [ 1, 2 ] [ 1, 2 ]
   
   ```

10. **slice():**
     作用：基于当前数组的一项或多项创建一个新的数组
     参数：startIndex[,endIndex]
     参数说明：返回的元素包含startIndex位置的元素，但不包括endIndex位置的元素
     返回值：返回截取的元素组成的数组
     原数组是否改变：否

    ```
    let arr = [0, 1, 2, 3, 4];
    let temp = arr.slice(1,3); // 返回从索引1（包括）位置到索引3（不包括）位置之前的元素
    console.log(arr, temp); // [0, 1, 2, 3, 4] [1, 2]
    
    // 用于复制数组
    let arr = [0, 1, 2, 3, 4];
    let temp = arr.slice(0); // 返回从索引0（包括）位置到数组结尾的所有元素
    console.log(arr, temp); // [0, 1, 2, 3, 4] [0, 1, 2, 3, 4]
    
    ```

11. **indexOf():**
     作用：从数组开头查找元素在数组中的索引位置（ES5的方法）
     参数：searchElement[, fromIndex]
     返回值：searchElement在数组中的索引，没找到searchElement则返回-1
     原数组是否改变：否

    ```
    let arr = [1, 2, 3, 4, 5, 6, 2];
    // 从数组开头开始查找
    let temp = arr.indexOf(2);
    console.log(arr, temp); // [ 1, 2, 3, 4, 5, 6, 2 ] 1
    // 从指定的位置开始查找
    let temp1 = arr.indexOf(2,3); // 从索引3(包括)的位置向后查找元素2
    console.log(arr, temp1); // [ 1, 2, 3, 4, 5, 6, 2 ] 6
    
    ```

12. **lastIndexOf():**
     作用：从数组结尾查找元素在数组中的索引位置（ES5的方法）
     参数：searchElement[, fromIndex]
     返回值：searchElement在数组中的索引，没找到searchElement则返回-1 原数组是否改变：否

    ```
    let arr = [1, 2, 3, 4, 5, 6, 2];
    // 从数组末尾开始查找
    let temp = arr.lastIndexOf(2);
    console.log(arr, temp); // [ 1, 2, 3, 4, 5, 6, 2 ] 6
    // 从指定的位置开始查找
    let temp1 = arr.lastIndexOf(2,3); // 从索引3(包括)的位置向前查找元素2
    console.log(arr, temp1); // [ 1, 2, 3, 4, 5, 6, 2 ] 1
    
    ```

13. **every():**
     作用：对数组中的每一项运行给定函数，如果该函数对每一项都返回true,则返回true（ES5方法）
     参数：callback[, thisArg]
     参数说明：callback有三个参数item(当前项),index(当前项索引)，array(数组对象本身)
     返回值：true 或 false
     原数组是否改变：涉及callback，因此不确定，具体详情见下文中的原型方法的小结部分。

    ```
    let arr = [1, 2, 3, 4];
    let temp = arr.every((item, index, array) => {
        return item > 2;
    });
    console.log(arr, temp); // [ 1, 2, 3, 4 ] false
    
    // 方法的第二个参数可选，作用是设定第一个参数中的this指向，如果使用第二个参数，注意callback不能是箭头函数
    // 后面的迭代方法涉及此参数的，用法相同，不在赘述
    let arr = [1, 2, 3, 4];
    let temp = arr.every(function(item, index, array) {
        return item > this.id;
    }, {id: 2});
    console.log(arr, temp); // [ 1, 2, 3, 4 ] false
    
    ```

14. **some():**
     作用：对数组中的每一项运行给定函数，如果该函数对任意一项返回true,则返回true（ES5方法）
     参数：callback[, thisArg]
     参数说明：callback有三个参数item(当前项),index(当前项索引)，array(数组对象本身)
     返回值：true 或 false
     原数组是否改变：涉及callback，因此不确定，具体详情见下文中的原型方法的小结部分。

    ```
    let arr = [1, 2, 3, 4];
    let temp = arr.some((item, index, array) => {
        return item > 2;
    });
    console.log(arr, temp); // [ 1, 2, 3, 4 ] true
    
    ```

15. **filter():**
     作用：对数组中的每一项运行给定函数，返回该函数返回true的项组成的数组（ES5方法）
     参数：callback[, thisArg]
     参数说明：callback有三个参数item(当前项),index(当前项索引)，array(数组对象本身)
     返回值：函数返回true的项组成的数组
     原数组是否改变：涉及callback，因此不确定，具体详情见下文中的原型方法的小结部分。

    ```
    let arr = [1, 2, 3, 4];
    let temp = arr.filter((item, index, array) => {
        return item > 2;
    });
    console.log(arr, temp); // [ 1, 2, 3, 4 ] [3, 4]
    
    ```

16. **map():**
     作用：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组（ES5方法）
     参数：callback[, thisArg]
     参数说明：callback有三个参数item(当前项),index(当前项索引)，array(数组对象本身)
     返回值：函数每次调用结果组成的数组
     原数组是否改变：涉及callback，因此不确定，具体详情见下文中的原型方法的小结部分。

    ```
    let arr = [1, 2, 3, 4];
    let temp = arr.map((item, index, array) => {
        return item * item;
    });
    console.log(arr, temp); // [ 1, 2, 3, 4 ] [ 1, 4, 9, 16]
    
    ```

17. **forEach():**
     作用：对数组中的每一项运行给定函数。无返回值（ES5方法）
     参数：callback[, thisArg]
     参数说明：callback有三个参数item(当前项),index(当前项索引)，array(数组对象本身)
     返回值：无
     原数组是否改变：涉及callback，因此不确定，具体详情见下文中的原型方法的小结部分。

    ```
    let arr = [1, 2, 3, 4];
    let temp = arr.forEach((item, index, array) => {
        // 不会有返回值，但可在这里执行某些操作
        return item * item;
    });
    console.log(arr, temp); // [ 1, 2, 3, 4 ] undefined
    
    ```

    > 注意：
    >  forEach在所有项都遍历完成之前，无法像for循环一样提前终止循环

18. **reduce():**
     作用：从数组的第一项开始，逐步遍历到最后，迭代数组的所有项（ES5方法）
     参数：callback[, initialValue]
     参数说明：

    - callback迭代函数，有四个参数（prev, cur, index, array） 
      - prev 前一个值，（initialValue || 数组第一项 || 上一次迭代的结果）
      - cur 当前迭代项
      - index 当前迭代项索引
      - array 迭代的原数组
    - initialValue 迭代的基础值，不传基础值是数组第一项

    返回值：数组迭代后，整体的迭代结果
     原数组是否改变：涉及callback，因此不确定，具体详情见下文中的原型方法的小结部分。

    ```
    // 数组求和
    let arr = [1, 2, 3];
    let sum = arr.reduce((prev, cur, index, array) => {
        return prev + cur;
    });
    console.log(arr, sum); // [ 1, 2, 3 ] 6
    
    // 传initialValue 基础值的示例
    let sum1 = arr.reduce((prev, cur, index, array) => {
        return prev + cur;
    }, 10);
    // 返回的值是：10+1+2+3
    console.log(arr, sum1); // [ 1, 2, 3 ] 16
    
    ```

    > **reduce源码的实现**：
    >
    > ```
    > Array.prototype.myReduce = function(callback, initialVal){
    >    let prev = initialVal || this[0]; 
    >     for(var i = pre ? 0 : 1; i < this.length; i++){
    >         prev = callback(prev, this[i], i, this);
    >    }
    >    return prev
    > }
    > 
    > ```

19. **reduceRight():**
     作用：从数组的最后一项开始，逐步遍历到第一项，迭代数组的所有项（ES5方法）
     参数：callback[, initialValue]
     参数说明：

    - callback迭代函数，有四个参数（prev, cur, index, array） 
      - prev 前一个值，（initialValue || 数组第一项 || 上一次迭代的结果）
      - cur 当前迭代项
      - index 当前迭代项索引
      - array 迭代的原数组
    - initialValue 迭代的基础值，不传基础值是数组第一项

    返回值：数组迭代后，整体的迭代结果
     原数组是否改变：涉及callback，因此不确定，具体详情见下文中的原型方法的小结部分。

    ```
    // 拼接字符串,从后向前迭代数组进行拼接
    let arr = ['h', 'e', 'l', 'l', 'o'];
    let str = arr.reduceRight((prev, cur, index, array) => {
        return prev + cur;
    });
    console.log(arr, str); // [ 'h', 'e', 'l', 'l', 'o' ] 'olleh'
    
    ```

20. **find():**
     作用：查找数组中第一个符合条件的元素，返回该元素 (ES6新增)
     参数：callback[, thisArg]
     参数说明：参数的使用同上述的forEach、every、map、some、filter方法一致
     返回值：查找到则返回该元素，没找到返回undefined
     原数组是否改变：涉及callback，因此不确定，具体详情见下文中的原型方法的小结部分。

    ```
    let arr = [1, 2, 3, 4, 5];
    let temp = arr.find((item, index, array) => {
        return item > 2;
    })
    console.log(arr, temp); // [1, 2, 3, 4, 5] 3
    
    ```

21. **findIndex():**
     作用：查找数组中第一个符合条件的元素所在位置的索引，并返回该索引值
     参数：callback[, thisArg]
     参数说明：参数的使用同上述的forEach、every、map、some、filter方法一致
     返回值：查找到则返回该索引值，没找到返回-1
     原数组是否改变：涉及callback，因此不确定，具体详情见下文中的原型方法的小结部分。

    ```
    let arr = [1, 2, 3, 4, 5];
    let temp = arr.findIndex((item, index, array) => {
        return item > 2;
    })
    console.log(arr, temp); // [1, 2, 3, 4, 5] 2
    
    ```

22. **fill():**
     作用：用指定元素，填充数组从start(包括)到end（不包括）之间的元素，如果该区间内已经有元素，直接替换掉（ES6新增）
     参数：value[, start[, end]]
     返回值：填充后的数组
     原数组是否改变：是

    ```
    let arr = [1, 2, 3, 4, 5];
    let temp = arr.fill('a', 2, 4);
    console.log(arr, temp); // [1, 2, 'a', 'a', 5] [1, 2, 'a', 'a', 5]
    
    ```

23. **includes():**
     作用：判断数组中是否包含指定的元素（ES7新增）
     参数：searchElement[, fromIndex]
     返回值：true或false
     原数组是否改变：否

    ```
    let arr = [1, 2, 3, 4, 5];
    let temp = arr.includes(5);
    console.log(arr, temp); // [1, 2, 3, 4, 5] true
    
    // 这个方法弥补了indexOf查看元素时的一个不足，即查找NaN的误差
    let arr1 = [NaN, 'a'];
    let temp1 = arr1.includes(NaN);
    let temp2 = arr1.indexOf(NaN);
    console.log(temp1, temp2); // true -1
    
    ```

24. **toString()、toLocalString():**
     作用：调用数组每一项的toString()方法，返回的是以逗号分隔的字符串
     参数：无
     返回值：转化后的字符串
     原字数组是否改变：否

    ```
    let arr = [1, [1, 2, [4]], {name: "zhangsan"}, 3];
    let temp = arr.toString();
    console.log(arr); [ 1, [ 1, 2, [ 4 ] ], { name: 'zhangsan' }, 3 ] 
    console.log(temp); // '1,1,2,4,[object Object],3'
    
    ```

25. **join():**
     作用：将数组元素转化为字符串(调用每个元素的toString方法)，并使用指定的分隔符（默认为逗号）进行拼接，返回拼接后的字符串
     参数：分隔符，默认为逗号（，）
     返回值：拼接后的字符串
     原数组是否改变：否

    ```JavaScript
    let arr = [1, [1, 2, [4]], {name: "zhangsan"}, 3];
    let temp = arr.join();
    console.log(arr); [ 1, [ 1, 2, [ 4 ] ], { name: 'zhangsan' }, 3 ] 
    console.log(temp); // '1,1,2,4,[object Object],3'
    
    // 数组求和
    let arr1 = [1, 2, 3];
    console.log(eval(arr1.join('+'))); // 6
    
    ```

> 原型方法的总结：
>  \1. 数组的方法无外乎是对数组的增删改查、转换、迭代。增、删、改都会改变原有的数组，查、转换的方法不涉及callback参数的不会改变原数组，涉及到的则视情况而定，迭代方法因为均涉及到callback参数，因此也不确定。
>  那么为什么涉及到callback就不确定了呢？？？
>  首先如果直接在callback中操作原数组，那肯定原数组会改变。例如：
>
> ```JavaScript
> let arr = [1,2,3,4];    
> let temp = arr.forEach((item,index,array) => {  
>    // 直接通过索引操作原数组  
>    array[index] *= item;
> });  
> console.log(arr,temp); // [1, 4, 9, 16] undefined  
> 
> ```
>
> 如果不是直接操作原数组，而是操作callback的item参数的时,如果item是基本数据类型则原数组中对应的该项元素不会改变，如果是引用类型（数组，对象、函数等）则改变，因为操作引用类型的值，实质是操作该值所在存贮地址的内容，而item对应的原数组中的元素和item是同一引用地址，因此会导致原数组中对应元素改变。(小伙伴们对这里如果还是不理解，可以看下数组方法polyfill的实现，这里不再赘述)
>  \2. 所有涉及索引的方法，开始位置都是在操作范畴的，结束位置都是不包括在操作范围内的

**（二）.构造函数的方法**

- **Array.from():**
   作用：将类数组转化为数组
   参数：arrayLike[, mapFn[, thisArg]]
   参数说明：

  - arrayLike：类数组对象，可以是我们常见的nodeList、arguments、字符串、iterable对象等
  - mapFn: 对转化后的数组进行操作的回调函数
  - thisArg: 指定mapFun中的this

  返回值：转化后的数组，如果有mapFn,则返回结果是经过mapFn处理的数组
   原类数组是否改变：不使用mapFn，则类数组不改变。使用mapFn则结果同上述迭代方法中使用callback的情况一致。

  ```javascript
  let str = 'hello';
  let temp = Array.from(str);
  console.log(str, temp); // hello [ 'h', 'e', 'l', 'l', 'o' ]
  let temp1 = Array.from(str, (item, index) => {
      return item.toUpperCase();
  });
  console.log(str, temp1); // hello [ 'H', 'E', 'L', 'L', 'O' ]
  
  ```

  > 小结：
  >
  > >  Array.from() 等价于 Array.prototype.slice.call(arguments,0)

### 数组扩展运算符（ES6新增）

------

数组的扩展运算符可以将数组转化为以逗号分割的参数序列。
 几个简单使用的应用场景：

1. 将数组通过扩展运算符转化为参数序列直接传参，无需使用apply转化了

   ```
   let arr = [1, 2, 3];
   
   // apply写法
   Math.min.apply(null, arr)
   
   // 扩展运算符写法
   Math.min(...arr)
   
   ```

2. 可以用于复制和拼接数组

   ```
   let arr1 = [2, 3, 4];
   let arr2 = ['a', 'b', 'c'];
   
   // 拼接数组arr1和arr2
   console.log([...arr1, ...arr2]); // [2, 3, 4, 'a', 'b', 'c']
   
   ```

3. 可用于将字符串分解为真正的数组，

   ```
   […'hello']  // [ 'h', 'e', 'l', 'l', 'o' ]
   
   ```

### 写在最后

------

长篇大论了这么久，不是为了重复书中或者官方的使用说明。而是再分享一些学习的思路，让初学者能够更快更准的掌握JavaScript数组，让停留在会用层次的同学了解它更多。
 希望我上述的方法说明能够让你对JavaScript数组一目了然，在各个方法所阐述的几个方面的对比中，将它更轻易的记住。



参考链接：https://juejin.im/post/5acb6186518825556a72b79b




# 开发者工具devtools

# 编程思想

控制反转

中间件





# 命令行

Linux 常用命令

Windows







