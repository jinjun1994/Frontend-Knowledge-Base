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

![](https://img.amazingtm.com/201903/07113616.png)

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

当以这种方式调用时，函数上下文（this关键字的值）**有两种可能性：在非严格模式下，它将是全局上下文（window对象），而在严格模式下，它将是undefined**。

#### 作为方法被调用

[详见对象方法与this](/frontend/JavaScript/object.html#对象方法与this)

当一个函数被赋值给一个对象的属性，并且通过对象属性引用的方式调用函数时，函数会作为对象的方法被调用。示例如下：

````javascript
var ninja = {};
ninja.skulk = function(){};
ninja.skulk();
````

这种情况下函数被称为方法，如果你有面向对象编程的经历，一定会联想到是否可以在方法内部通过this访问到对象主体。这种情况下同样适用。

**当函数作为某个对象的方法被调用时，该对象会成为函数的上下文，并且在函数内部可以通过参数访问到**。这也是JavaScript实现面向对象编程的主要方式之一。（构造函数是另外一种方式，我们很快就会提到）

#### 作为构造函数被调用

当用 new 运算符调用函数时，该函数总会返回一个对象，通常情况下，构造函数里的 this 就指向返回的这个对象，见如下代码：

````javascript
var MyClass = function(){ 
 this.name = 'sven'; 
}; 
var obj = new MyClass(); 
alert ( obj.name ); // 输出：sven 
````

但用 new 调用构造器时，还要注意一个问题，如果构造器显式地返回了一个 object 类型的对
象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的 this：

````javascript
var MyClass = function(){ 
 this.name = 'sven'; 
 return { // 显式地返回一个对象
 name: 'anne' 
 } 
}; 
var obj = new MyClass(); 
alert ( obj.name ); // 输出：anne
````

#### **使用apply和call方法调用**

JavaScript为我们提供了一种调用函数的方式，从而可以显式地指定任何对象作为函数的上下文。我们可以使用每个函数上都存在的这两种方法来完成：apply和call。

传入call 和 apply 方法的第一个参数都会被作为函数上下文，不同处在于后续的参数。apply方法只需要一个额外的参数，也就是一个包含参数值的数组；call方法则需要传入任意数量的参数值，这些参数将用作函数的实参.

#### 解决上下文问题

处理JavaScript函数上下文时可能遇到的一些问题。在回调函数中（例如事件处理器），函数上下文与预期不符，但可以使用call或apply方法绕过。还有另外两个选择：箭头函数和bind方法，在一些情况下可以更优雅地实现相同的效果。

##### **使用箭头函数绕过函数上下文**

箭头函数不会创建自己的`this,它只会从自己的作用域链的上一层继承this`。this值是在箭头函数创建时确定的。

````javascript
var foo = {
test: function(){
 (()=>console.log(this))()  // 立即调用箭头函数
}
};

foo.test(); // foo
````



箭头函数需要注意的：箭头函数没有 this 绑定，意味着**箭头函数内部的 this 值只能通过查找作用域链来确定**。
如果箭头函数被包含在一个非箭头函数内，那么 this 值就会与该函数的相等；否则，this 值就会是全局对象（在浏览器中是 window ，在 nodejs 中是 global ）。在全局代码中定义对象字面量，在字面量中定义箭头函数，那么箭头函数内的this指向全局window对象

````javascript
var foo = {
test: ()=>console.log(this) // 箭头函数
}
};

foo.test(); // windows
````

**Arrow functions VS bind**

箭头函数 `=>` 和正常函数通过 `.bind(this)` 调用有一个微妙的区别：

- `.bind(this)` 创建该函数的 “绑定版本”。
- 箭头函数 `=>` 不会创建任何绑定。该函数根本没有 `this`。在外部上下文中，`this` 的查找与普通变量搜索完全相同。

##### **使用bind方法**

所有函数均可访问bind方法，可以创建并返回一个新函数，并绑定在传入的对象上。**不管如何调用该函数，this均被设置为传入对象本身。**被绑定的函数与原始函数行为一致，函数体一致。

调用bind方法不会修改原始函数，而是创建了一个全新的函数。

#### **小结**

- 当调用函数时，除了传入在函数定义中显式声明的参数之外，同时还传入两个隐式参数：arguments与this。
  -  arguments参数是传入函数的所有参数的集合。具有length属性，表示传入参数的个数，通过arguments参数还可获取那些与函数形参不匹配的参数。在非严格模式下，arguments对象是函数参数的别名，修改arguments对象会修改函数实参，可以通过严格模式避免修改函数实参。 
  -  this表示函数上下文，即与函数调用相关联的对象。函数的定义方式和调用方式决定了this的取值。 
- 函数的调用方式有4种。
  -  作为函数调用：skulk()。 
  -  作为方法调用：ninja.skulk()。 
  -  作为构造函数调用：new Ninja()。 
  -  通过apply与call方法调用：skulk.apply(ninja)或skulk.call(ninja)。 
- 函数的调用方式影响this的取值。
  -  如果作为函数调用，在非严格模式下，this指向全局window对象；在严格模式下，this指向undefined。 
  -  作为方法调用，this通常指向调用的对。 
  -  作为构造函数调用，this指向新创建的对象。 
  -  通过call或apply调用，this指向call或apply的第一个参数。 
-  箭头函数没有单独的this值，this在箭头函数创建时确定。 
-  所有函数均可使用bind方法，创建新函数，并绑定到bind方法传入的参数上。被绑定的函数与原始函数具有一致的行为。

闭包、作用域

## 深浅拷贝

对象类型在赋值的过程中其实是复制了地址，从而会导致改变了一方其他也都被改变的情况。通常在开发中我们不希望出现这样的问题，我们可以使用浅拷贝来解决这个情况。

```
let a = {
  age: 1
}
let b = a
a.age = 2
console.log(b.age) // 2
```

### 浅拷贝

首先可以通过 `Object.assign` 。`Object.assign` 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝。

```
let a = {
  age: 1
}
let b = Object.assign({}, a)
a.age = 2
console.log(b.age) // 1
```

另外我们还可以通过展开运算符 `...` 来实现浅拷贝

```
let a = {
  age: 1
}
let b = { ...a }
a.age = 2
console.log(b.age) // 1
```

通常浅拷贝就能解决大部分问题了，但是当我们遇到如下情况就可能需要使用到深拷贝了

```
let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = { ...a }
a.jobs.first = 'native'
console.log(b.jobs.first) // native
```

浅拷贝只解决了第一层的问题，如果接下去的值中还有对象的话，那么就又回到最开始的话题了，两者享有相同的地址。要解决这个问题，我们就得使用深拷贝了。

### 深拷贝

这个问题通常可以通过 `JSON.parse(JSON.stringify(object))` 来解决。

```
let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = JSON.parse(JSON.stringify(a))
a.jobs.first = 'native'
console.log(b.jobs.first) // FE
```

但是该方法也是有局限性的：

- 会忽略 `undefined`
- 会忽略 `symbol`
- 不能序列化函数
- 不能解决循环引用的对象

```
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
}
obj.c = obj.b
obj.e = obj.a
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c
let newObj = JSON.parse(JSON.stringify(obj))
console.log(newObj)
```

如果你有这么一个循环引用对象，你会发现并不能通过该方法实现深拷贝

在遇到函数、 `undefined` 或者 `symbol` 的时候，该对象也不能正常的序列化

```
let a = {
  age: undefined,
  sex: Symbol('male'),
  jobs: function() {},
  name: 'yck'
}
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "yck"}
```

你会发现在上述情况中，该方法会忽略掉函数和 `undefined` 。

但是在通常情况下，复杂数据都是可以序列化的，所以这个函数可以解决大部分问题。

如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 `MessageChannel`

```
function structuralClone(obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage = ev => resolve(ev.data)
    port1.postMessage(obj)
  })
}

var obj = {
  a: 1,
  b: {
    c: 2
  }
}

obj.b.d = obj.b

// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
const test = async () => {
  const clone = await structuralClone(obj)
  console.log(clone)
}
test()
```

当然你可能想自己来实现一个深拷贝，但是其实实现一个深拷贝是很困难的，需要我们考虑好多种边界情况，比如原型链如何处理、DOM 如何处理等等，所以这里我们实现的深拷贝只是简易版，并且我其实更推荐使用 [lodash 的深拷贝函数](https://link.juejin.im/?target=https%3A%2F%2Flodash.com%2Fdocs%23cloneDeep)。

```
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2
```

## 开发者工具devtools

## 编程思想

控制反转

中间件













