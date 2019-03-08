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

JavaScript 中有八种基本的类型。

- `number` 用于任何类型的数字：整数或者浮点数。
- `string` 用于字符串。一个字符串可以包含一个或多个字符，所以没有单独的单字符类型。
- `boolean` 用于 `true` 和 `false`。
- `null` 用于未知的值 —— 只有一个 `null` 值的独立类型。
- `undefined` 用于未定义的值 —— 只有一个 `undefined` 值的独立类型。
- `object` 用于更复杂的数据结构。
- `symbol` 用于唯一的标识符。
- `bigint` [没有精度和大小限制的整数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

## 类型判断

### typeof

`typeof` 运算符可以查看变量的类型。

- 两种形式：`typeof x` 或者 `typeof(x)`。
- 返回的类型的字符串，比如 `"string"`。
- `null` 返回 `"object"` —— 这是语言中的一个错误，实际上它并不是一个对象。

`typeof` 对于基本类型，除了 `null` 都可以显示正确的类型

```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof 999999999999999n // 'bigint'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b 没有声明，但是还会显示 undefined
typeof` 对于对象，除了函数都会显示 `object
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

### instanceof

`instanceof` 操作符用于检测对象是否属于某个 class，同时，检测过程中也会将继承关系考虑在内。

用法：

```javascript
obj instanceof Class
```

如果 `obj` 隶属于 `Class` 类（或者是 `Class` 类的衍生类），表达式将返回 `true`。

举例说明：

```javascript
class Rabbit {}
let rabbit = new Rabbit();

// rabbit 是 Rabbit 类的实例对象吗?
alert( rabbit instanceof Rabbit ); // true
```

使用构造函数结果也是一样的：

```javascript
// 构造函数而非 class
function Rabbit() {}

alert( new Rabbit() instanceof Rabbit ); // true
```

内置类型 `Array`：

```javascript
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

`arr` 同时还隶属于 `Object` 类。因为从原型上来讲，`Array` 是继承自 `Object` 类的。

`instanceof` 在检测中会将原型链考虑在内，此外，还能借助静态方法 `Symbol.hasInstance` 来改善检测效果。

`obj instanceof Class` 语句的大致执行过程如下：

1. 如果提供了静态方法 `Symbol.hasInstance`，那就直接用这个方法进行检测：

   ```javascript
   // 假设具有 canEat 属性的对象为动物类
   class Animal {
     static [Symbol.hasInstance](obj) {
       if (obj.canEat) return true;
     }
   }
   
   let obj = { canEat: true };
   alert(obj instanceof Animal); // 返回 true：调用 Animal[Symbol.hasInstance](obj)
   ```

2. 大部分的类是没有 `Symbol.hasInstance` 方法的，这时会检查 `Class.prototype` 是否与 `obj` 的原型链中的任何一个原型相等。

   简而言之，是这么比较的：

   ```javascript
   obj.__proto__ === Class.prototype
   obj.__proto__.__proto__ === Class.prototype
   obj.__proto__.__proto__.__proto__ === Class.prototype
   ...
   ```

   在上一个例子中有 `Rabbit.prototype === rabbit.__proto__` 成立，所以结果是显然的。

   再比如下面一个继承的例子，`rabbit` 对象同时也是父类的一个实例：

   ```javascript
   class Animal {}
   class Rabbit extends Animal {}
   
   let rabbit = new Rabbit();
   alert(rabbit instanceof Animal); // true
   // rabbit.__proto__ === Rabbit.prototype
   // rabbit.__proto__.__proto__ === Animal.prototype (match!)
   ```

下图展示了 `rabbit instanceof Animal` 的执行过程中，`Animal.prototype` 是如何参与比较的：

![](https://img.dubiqc.com/201903/07113616.png)

这里还要提到一个方法 [objA.isPrototypeOf(objB)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/object/isPrototypeOf)，如果 `objA` 处在 `objB` 的原型链中，调用结果为 `true`。所以，`obj instanceof Class` 也可以被视作为是调用 `Class.prototype.isPrototypeOf(obj)`。

虽然有点奇葩，其实 `Class` 的构造器自身是不参与检测的！检测过程只和原型链以及 `Class.prototype` 有关。

所以，当 `prototype` 改变时，会产生意想不到的结果。

就像这样：

```javascript
function Rabbit() {}
let rabbit = new Rabbit();

// 修改其 prototype
Rabbit.prototype = {};

// ...再也不是只兔子了！
alert( rabbit instanceof Rabbit ); // false
```

所以，为了谨慎起见，最好避免修改 `prototype`。

###  Object.prototype.toString

按照 [规范](https://tc39.github.io/ecma262/#sec-object.prototype.tostring) 上所讲，内置的 `toString` 方法可以从对象中提取出来，以其他值作为上下文（context）对象进行调用，调用结果取决于传入的上下文对象。

- 如果传入的是 number 类型，返回 `[object Number]`
- 如果传入的是 boolean 类型，返回 `[object Boolean]`
- 如果传入 `null`，返回 `[object Null]`
- 传入 `undefined`，返回 `[object Undefined]`
- 传入数组，返回 `[object Array]`
- …等等（例如一些自定义类型）

````javascript
let s = Object.prototype.toString;
// toString 的内部算法会检查 this 对象，返回对应的结果。

console.log( s.call(123) ); // [object Number]
console.log( s.call(null) ); // [object Null]
console.log( s.call(alert) ); // [object Function]
console.log( s.call(123n) ); // [object BigInt]
console.log( s.call([]) ); // [object Array]
console.log( s.call({}) ); // [object Object]
console.log( s.call(true) ); // [object Boolean]
console.log( s.call(Symbol()) ); // [object Symbol]
````

### Symbol.toStringTag

对象的 `toString` 方法可以使用 `Symbol.toStringTag` 这个特殊的对象属性进行自定义输出。

举例说明：

```javascript
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

大部分和环境相关的对象也有这个属性。以下输出可能因浏览器不同而异：

```javascript
// 环境相关对象和类的 toStringTag：
alert( window[Symbol.toStringTag]); // window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

输出结果和 `Symbol.toStringTag`（前提是这个属性存在）一样，只不过被包裹进了 `[object ...]` 里。

这样一来，我们手头上就有了个“磕了药似的 typeof”，不仅能检测基本数据类型，就是内置对象类型也不在话下，更可贵的是还支持自定义。

所以，如果希望以字符串的形式获取内置对象类型信息，而不仅仅只是检测类型的话，可以用这个方法来替代 `instanceof`。

### 总结

下面，来总结下大家学到的类型检测方式：

|               | 用于                                                         | 返回       |
| ------------- | ------------------------------------------------------------ | ---------- |
| `typeof`      | 基本数据类型                                                 | string     |
| `{}.toString` | 基本数据类型、内置对象以及包含 `Symbol.toStringTag` 属性的对象 | string     |
| `instanceof`  | 任意对象                                                     | true/false |

看样子，`{}.toString` 基本就是一增强版 `typeof`。

`instanceof` 在涉及多层类结构的场合中比较实用，这种情况下需要将类的继承关系考虑在内。

## 类型转换

### ToBoolean

转换为 boolean 类型是最为简单的一个。

逻辑操作或显式调用 `Boolean(value)` 会触发 boolean 类型转换。

转换规则如下：

- 假值，JavaScript只有六个假值 `0`、空的字符串、`null`、`undefined` 和 `NaN`、 `false`。
- 其他值变成 `true`。

注意：0 包括 0 、+0、 -0、0n、-0n

[ES10](https://juejin.im/post/5c7c8e125188256365101c34#heading-19)

## 运行机制

生命周期

页面构建过程

事件处理

## 数据类型

数组

对象



## 函数

函数定义、参数

### 隐式函数参数

函数调用时还会传递两个隐式的参数：arguments和this。

arguments参数是传递给函数的所有参数集合。无论是否有明确定义对应的形参，通过它我们都可以访问到函数的所有参数。

当调用函数时，除了显式提供的参数外，this参数也会默认地传递给函数。this参数是面向对象JavaScript编程的一个重要组成部分，代表函数调用相关联的对象。因此，通常称之为函数上下文。

### 函数调用与this

函数的调用方式对函数内代码的执行有很大的影响，主要体现在this参数以及函数上下文是如何建立的。

我们可以通过4种方式调用一个函数，每种方式之间有一些细微差别。

-  作为一个函数(function)——skulk()，直接被调用。 
-  作为一个方法(method)——ninja.skulk()，关联在一个对象上，实现面向对象编程。 
-  作为一个构造函数(constructor)——new Ninja()，实例化一个新的对象。 
-  通过函数的apply或者call方法——skulk.apply(ninja)或者skulk.call(ninja)。 

````javascript
function skulk(name) {}
function Ninja(name) {}

skulk('Hattori');
(function(who){ return who; })('Hattori'); 　　←---　作为函数调用

var ninja = {
　skulk: function() {}
};

ninja.skulk('Hattori'); 　　←---　作为ninja对象的一个方法调用

ninja = new Ninja('Hattori'); 　　←---　作为构造函数调用

skulk.call(ninja, 'Hattori'); 　　←---　通过call方法调用

skulk.apply(ninja, ['Hattori']); 　　←---　通过apply方法调用
````

除了call和apply的方式外，函数调用的操作符都是函数表达式之后加一对圆括号。

#### **作为函数直接被调用**

这里我们说的函数“作为一个函数”被调用是为了区别于其他的调用方式：方法、构造函数和apply/call。如果一个函数没有作为方法、构造函数或者通过apply和call调用的话，我们就称之为作为函数被直接调用。

通过()运算符调用一个函数，且被执行的函数表达式不是作为一个对象的属性存在时，就属于这种调用类型。（当执行的函数表达式是一个对象属性时，属于接下来将要讨论的方法调用类型）这里有一些简单的示例：

```javascript
function ninja() {}; 
ninja();　　←---　函数定义作为函数被调用  

var samurai = function(){}; 
samurai();　　←---　函数表达式作为函数被调用 
(function(){})()　　←---　会被立即调用的函数表达式，作为函数被调用
```

当以这种方式调用时，函数上下文（this关键字的值）有两种可能性：在非严格模式下，它将是全局上下文（window对象），而在严格模式下，它将是undefined。

#### 作为方法被调用

[详见对象方法与this](/frontend/JavaScript/object.html#对象方法与this)

当一个函数被赋值给一个对象的属性，并且通过对象属性引用的方式调用函数时，函数会作为对象的方法被调用。示例如下：

````javascript
var ninja = {};
ninja.skulk = function(){};
ninja.skulk();
````

这种情况下函数被称为方法，如果你有面向对象编程的经历，一定会联想到是否可以在方法内部通过this访问到对象主体。这种情况下同样适用。**当函数作为某个对象的方法被调用时，该对象会成为函数的上下文，并且在函数内部可以通过参数访问到**。这也是JavaScript实现面向对象编程的主要方式之一。（构造函数是另外一种方式，我们很快就会提到）





箭头函数 

箭头函数不会创建自己的`this,它只会从自己的作用域链的上一层继承this`。

闭包、作用域

## 对象、类和继承

面向对象与原型 继承 class 

模块化



## 开发者工具devtools

## 编程思想

控制反转

中间件













