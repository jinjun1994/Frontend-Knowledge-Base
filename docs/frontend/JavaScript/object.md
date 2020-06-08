---
{
author: jinjun,
title: 对象、类和继承,
date: 2019/02/10,
lang: ZH-CN,
}
---

[[toc]]

## 面向对象的三大特性

- 封装
- 继承
- 多态
#### Mixin

#### [是什么概念?](https://www.zhihu.com/question/20778853)

就是编译的时候把一段代码复制到另一个地方的意思。



##### 多重继承  

[React Mixins入门指南](https://segmentfault.com/a/1190000008814336)

[9102，作为前端必须知道 hook 怎么玩了](https://juejin.im/post/5d00a67cf265da1b8a4f156f)
## 对象创建

### 方式一：字面量

```
    var obj11 = {name: 'smyh'};
    var obj12 = new Object(name: `smyh`); //内置对象（内置的构造函数）
```

上面的两种写法，效果是一样的。因为，第一种写法，`obj11`会指向`Object`。

- 第一种写法是：字面量的方式。
- 第二种写法是：内置的构造函数

### 方式二：通过构造函数

```
    var M = function (name) {
        this.name = name;
    }
    var obj3 = new M('smyhvae');
```

### 方法三：Object.create

```
    var p = {name:'smyhvae'};
    var obj3 = Object.create(p);  //此方法创建的对象，是用原型链连接的
```

第三种方法，很少有人能说出来。这种方式里，obj3是实例，p是obj3的原型（name是p原型里的属性），构造函数是`Objecet`。

创建空对象

````javascript
let a =Object.create(null)
````

![](https://img.dubiqc.com/201903/08043358.png-sign)

## 原型与原型链

![](https://img.dubiqc.com/201903/08043745.png-sign)

###  原型

每个函数都有一个 prototype（原型）属性（箭头函数除外），这个属性是一个指针，指向一个对象，
而这个对象的用途是存放实例共享的属性和方法。

 prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以
让所有对象实例共享它所包含的属性和方法。

原型对象默认拥有一个constructor属性，指向指向它的那个构造函数（也就是说构造函数和原型对象是互相指向的关系）。

每个对象实例都拥有一个隐藏的属性[[prototype]]，指向它的原型对象，这个属性可以通过`Object.getPrototypeOf(obj)` 或 `obj.__proto__` 来访问。

构造函数的prototype属性与它创建的实例对象的[[prototype]]属性指向的是同一个对象，即 `对象.__proto__ === 函数.prototype` 。

在JavaScript中，所有的对象都是由它的原型对象继承而来，反之，所有的对象都可以作为原型对象存在。

访问对象的属性时，JavaScript会首先在对象自身的属性内查找，若没有找到，则会跳转到该对象的原型对象中查找。而这正是多个对象实例共享原型所保存的属性和方法的基本原理。

### 原型、构造函数、实例三者之间的关系

![](https://img.dubiqc.com/201903/08050808.png-sign)

- 1、构造函数通过 new 生成实例
- 2、构造函数也是函数，构造函数的`prototype`指向原型。（所有的函数有`prototype`属性，但实例没有 `prototype`属性）
- 3、原型对象中有 constructor，指向该原型的构造函数。

### 原型链

ECMAScript 中描述了原型链的概念，并将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。简单回顾一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。假如我们让原型对象等于另一个类型的实例，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓原型链的基本概念。

### `instanceof`的原理

[instanceof原理详见](/frontend/JavaScript/#instanceof) 

![](https://img.dubiqc.com/201903/08053219.png-sign)

`instanceof`的**作用**：用于判断**实例**属于哪个**构造函数**。

`instanceof`的**原理**：判断实例对象的`__proto__`属性，和构造函数的`prototype`属性，是否为同一个引用（是否指向同一个地址）。

**注意1**：虽然说，实例是由构造函数 new 出来的，但是实例的`__proto__`属性引用的是构造函数的`prototype`。也就是说，实例的`__proto__`属性与构造函数本身无关。

**注意2**：在原型链上，原型的上面可能还会有原型，以此类推往上走，继续找`__proto__`属性。这条链上如果能找到， instanceof 的返回结果也是 true。

比如说：

- `foo instance of Foo`的结果为true，因为`foo.__proto__ === M.prototype`为true。
- **foo instance of Objecet的结果也为true**，因为`Foo.prototype.__proto__ === Object.prototype`为true。

但我们不能轻易的说：`foo 一定是 由Object创建的实例`。这句话是错误的。我们来看下一个问题就明白了。

#### 分析一个问题

**问题：已知A继承了B，B继承了C。怎么判断 a 是由A直接生成**的实例，还是B直接生成的实例呢？还是C直接生成的实例呢？

分析：这就要用到原型的`constructor`属性了。

- `foo.__proto__.constructor === M`的结果为true，但是 `foo.__proto__.constructor === Object`的结果为false。

所以，用 consturctor判断就比用 instanceof判断，更为严谨。

### new 运算符

当new Foo()时发生了什么：

（1）创建一个**新的空对象实例**，继承自foo.prototype

（2）执行构造函数foo，传入相应的参数，如果没有参数就不用传，同时 this 被指定为这个新实例。

（3）如果构造函数返回值是一个对象，那么直接返回该对象；如果无返回值或者返回一个非对象值，那么就将步骤（1）创建的对象返回。

代码实现

````javascript
/**
 * new2 new关键字的代码实现演示
 * @param {function} func 被new的类 (构造函数)
 */
function new2() {
    // 获取参数第一项，即构造函数
      let Context = [].shift.call(arguments)
    // 创建了一个实例对象 o，并且这个对象__proto__指向func这个类的原型对象 

    let o = Object.create(Context.prototype); 
    // (在构造函数中this指向当前实例)让这个类作为普通函数值行 并且里面this为实例对象 
    let result = Context.apply(o,arguments);
    // 最后再将实例对象返回 如果你在类中显示指定返回值k，
    // 注意如果返回的是引用类型则将默认返回的实例对象o替代掉
    return typeof result === 'object' ? result : o;
}

// 实验
function M() { // 即将被new的类
    this.name = 'liwenli';
}

let m = new2(M); // 等价于 new M 这里只是模拟
console.log(m instanceof M); // instanceof 检测实例
console.log(m instanceof Object);
console.log(m.__proto__.constructor === M);

````



## 继承的方法

### 原型链继承

实现的本质是重写原型对象，代之以一个新类型的实例。

```javascript
// 通过原型链实现继承

    function Parent() {
        this.name = 'Parent 的属性';
    }

    function Child() {
        this.type = 'Child 的属性';
    }

    Child.prototype = new Parent(); //【重要】，重写原型对象

    console.log(new Child());
```

优点：

子类继承了父类以及父类原型上的属性和方法

问题：

1 **父类引用类型的属性被所有实例共享**。

2 在创建子类型的实例时，不能向超类型的构造函数中传递参数。实际上，应该说是**没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数**。原因是第一点。

### 借用构造函数继承（经典继承）

实现：在子类型构造函数的内部调用超类型构造函数。

```javascript
    function Parent1() {
        this.name = 'parent1 的属性';
    }

    function Child1() {
        Parent1.call(this);         //【重要】此处用 call 或 apply 都行：改变 this 的指向
        this.type = 'child1 的属性';
    }
```

优点：相对于原型链而言，借用构造函数有一个很大的优势，即**可以在子类型构造函数中向超类型构造函**
**数传递参数**

缺点：仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题——**方法都在构造函数中定**
**义，因此函数复用就无从谈起了**。而且，**在超类型的原型中定义的方法，对子类型而言也是不可见的**，结
果所有类型都只能使用构造函数模式。

### 组合继承（伪经典继承）

实现：是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承

```javascript
  // 组合方式实现继承：构造函数、原型链

    function Parent3() {
        this.name = 'Parent 的属性';
        this.arr = [1, 2, 3];
    }

    function Child3() {
        Parent3.call(this); //【重要1】执行 parent方法
        this.type = 'Child 的属性';
    }
    Child3.prototype = new Parent3(); //【重要2】第二次执行parent方法

    var child = new Child3();
```

优点：

组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点

而且，instanceof 和 isPrototypeOf()也能够用于识别基于组合继承创建的对象。

### 原型式继承（实例继承）

实现：createObj()对传入其中的对象执行了一次浅复制。对实例进行浅复制实现继承。

借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型

```javascript
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```

必须有一个对象可以作为另一个对象的基础。如果有这么一个对象的话，可以把它传递给 createObj()函数，然后再根据具体需求对得到的对象加以修改即可。

ECMAScript 5 通过新增 Object.create()方法规范化了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。在传入一个参数的情况下，Object.create()与 object()方法的行为相同。

优点：没有必要兴师动众地创建构造函数，而只想让一个对象与另一个对象保持类似的情况下，原型式
继承是完全可以胜任的。

缺点：包含引用类型值的属性始终都会共享相应的值

### 寄生式继承

实现：寄生式继承的思路与寄生构造函数和工厂模式类似，即**创建一个仅用于封装继承过程的函数**

```
function createAnother(o) {
  var clone = Object.create(o) // 创建一个新对象
  clone.sayHi = function() { // 添加方法
    console.log(‘hi’)
  }
  return clone  // 返回这个对象
}

var person = {
  name: ‘Jiang’
}

var anotherPeson = createAnother(person)
anotherPeson.sayHi()
```

基于person返回了一个新对象anotherPeson，新对象不仅拥有了person的属性和方法，还有自己的sayHi方法

在主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。前面示范继承模式时使用的 object()函数不是必需的；任何能够返回新对象的函数都适用于此模式。

缺点：使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率；这一点与构造函数模式类似。

### 寄生组合式继承

在前面说的组合模式(原型链+构造函数)中，继承的时候需要调用两次父类构造函数

父类

```javascript
function Parent(name) {
  this.name = name
  this.colors = [‘red’, ‘blue’, ‘green’]
}
```

第一次在子类构造函数中

```javascript
function Child(name, job) {
  // 继承属性
  Parent.call(this, name)
  
  this.job = job
}
```

第二次将子类的原型指向父类的实例

```javascript
// 继承方法
Child.prototype = new Parent()
```

当使用`var instance = new Child()`的时候，会产生两组name和color属性，一组在Child实例上，一组在Child原型上，只不过实例上的屏蔽了原型上的

使用寄生式组合模式，可以规避这个问题

这种模式通过借用构造函数来继承属性，通过原型链的混成形式来继承方法

基本思路：**不必为了指定子类型的原型而调用父类的构造函数，我们需要的无非就是父类原型的一个副本**

**本质上就是使用寄生式继承来继承父类的原型，在将结果指定给子类型的原型**

```javascript
function inheritPrototype(Child, Parent) {
  var prototype = Object.create(Parent.prototype)
  prototype.constructor = Child
  Child.prototype = prototype
}
```

该函数实现了寄生组合继承的最简单形式，这个函数接受两个参数，一个子类，一个父类。

第一步创建父类原型的副本，第二步将创建的副本添加constructor属性，第三部将子类的原型指向这个副本

```javascript
function Parent(name) {
  this.name = name
  this.colors = [‘red’, ‘blue’, ‘green’]
}

Parent.prototype.sayName = function () {
  console.log(this.name)
}

function Child(name, job) {
  // 继承属性
  Parent.call(this, name)
  
  this.job = job
}

// 继承
inheritPrototype(Child, Parent)

var instance = new Child(‘Jiang’, ‘student’)
instance.sayName()
```

\> 补充：直接使用Object.create来实现，其实就是将上面封装的函数拆开，这样演示可以更容易理解

```javascript
function Parent(name) {
  this.name = name
  this.colors = [‘red’, ‘blue’, ‘green’]
}

Parent.prototype.sayName = function () {
  console.log(this.name)
}

function Child(name, job) {
  // 继承属性
  Parent.call(this, name)
  
  this.job = job
}

// 继承
Child.prototype = Object.create(Parent.prototype)

// 修复constructor
Child.prototype.constructor = Child

var instance = new Child(‘Jiang’, ‘student’)
instance.sayName()
```

ES6新增了一个方法，`Object.setPrototypeOf`，可以直接创建关联，而且不用手动添加constructor属性

```javascript
// 继承
Object.setPrototypeOf(Child.prototype, Parent.prototype)

console.log(Child.prototype.constructor === Child) // true
```

## 对象方法与this

对象通常被用来表示真实世界中的实体，比如用户、订单等等：

```javascript
let user = {
  name: "John",
  age: 30
};
```

另外，在现实世界中，用户可以**操作**：从购物车中挑选某物、登录、注销等。

在 JavaScript 中，操作通过属性中的函数来表示。

### 方法示例

刚开始，我们来让 `user` 说 hello：

```javascript
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("Hello!");
};

user.sayHi(); // Hello!
```

这里我们使用函数表达式创建了函数，并将其指定给对象的 `user.sayHi` 属性。随后我们调用它。用户现在可以说话了！

作为对象属性的函数称之为**方法**。

那么，现在 `user` 对象有了一个 `sayHi` 方法。

当然我们也可以使用预先定义的函数作为方法，就像这样：

```javascript
let user = {
  // ...
};

// 首先声明
function sayHi() {
  alert("Hello!");
};

// 然后将其作为一个方法
user.sayHi = sayHi;

user.sayHi(); // Hello!
```

> **Object-oriented programming**
>
> 当我们在代码中用对象表示实体时，这就是所谓的[面向对象编程](https://en.wikipedia.org/wiki/Object-oriented_programming)，简称为 “OOP”。
>
> OOP 是一门很大的学问，也是一门有其本身乐趣的学问。怎样选择合适的实体？如何组织它们之间的交互？这就是架构，有很多关于此方面的书，例如 E.Gamma、R.Helm、R.Johnson 和 J.Vissides 所著的《设计模式：可复用面向对象软件的基础》、G.Booch 所著的《面向对象分析与设计》等等。

### 方法简写

在对象字面量中，有一种更短的（声明）方法的语法：

```javascript
// 这些对象作用一样

let user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 方法简写看起来更好，对吧？
let user = {
  sayHi() { // 与 "sayHi: function()" 一样
    alert("Hello");
  }
};
```

如所示，我们可以省略 `"function"` 只写了 `sayHi()`。

说实话，这种表示法还是有些不同。与对象集成有关的细微差别（稍后将会介绍），但现在它们无关紧要。在几乎所有的情况下，较短的语法是最好的。

### 方法中的 “this”

对象方法需要访问对象中的存储的信息完成其工作是很常见的。

举个例子，`user.sayHi()` 中的代码可能需要用到 `user` 的 name 属性。

**为了访问该对象，方法中可以使用 this 关键字。**

`this` 的值就是在点之前的这个对象，即调用该方法的对象。

举个例子：

```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(this.name);
  }

};

user.sayHi(); // John
```

在这里 `user.sayHi()` 执行过程中，`this` 的值是 `user`。

技术上讲，也可以在不使用 `this` 的情况下，通过外部变量名来引用它：

```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user.name); // "user" 替代 "this"
  }

};
```

但这样的代码是不可靠的。如果我们将 `user` 复制给另一个变量。例如 `admin = user`，并赋另外的值给 `user`，那么它将访问到错误的对象。

如下所示：

```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert( user.name ); // 导致错误
  }

};


let admin = user;
user = null; // 覆盖让其更易懂

admin.sayHi(); // 噢哟！在 sayHi() 使用了旧的变量名。错误！
```

如果在 `alert` 中以 `this.name` 替换 `user.name`，那么代码就会正常运行。

### “this” 不受限制

在 JavaScript 中，“this” 关键字与大多数其他编程语言中的不同。首先，它可以用于任何函数。

这样的代码没有语法错误：

```javascript
 function sayHi() {
  alert( this.name );
}
```

`this` 是在运行时求值的。它可以是任何值。

例如，从不同的对象中调用同一个函数可能会有不同的 “this” 值：

```javascript
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 在两个对象中使用的是相同的函数
user.f = sayHi;
admin.f = sayHi;

// 它们调用时有不同的 this 值。
// 函数内部的 "this" 是点之前的这个对象。
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin（使用点或方括号语法来访问这个方法，都没有关系。）
```

实际上，我们可以在没有任何对象的情况下调用函数：

```javascript
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

在这种情况下，严格模式下的 `this` 值为 `undefined`。如果我们尝试访问 `this.name`，将会出现错误。

在非严格模式（没有使用 `use strict`）的情况下，`this` 将会是**全局对象**（浏览器中的 `window`，我们稍后会进行讨论）。`"use strict"` 可以修复这个历史行为。

请注意，通常在没有对象的情况下使用 `this` 的函数调用是不常见的，会（导致）编程错误。如果函数中有 `this`，那么通常意味着它是在对象上下文环境中被调用的。

**The consequences of unbound `this`**

如果你来自其他的编程语言，那么你可能熟悉『绑定 `this`』的概念。在对象定义的方法中，`this` 总是指向该对象。在 JavaScript 中，`this` 是『自由』的，它的值是在调用时进行求值的，它的值并不取决于方法声明的位置，而是（取决）于在『点之前』的是什么对象。

在运行时对 `this` 求值的这个想法有其优缺点。一方面，函数可以被重用于不同的对象。另一方面，更大的灵活性给错误留下了余地。这里我们并不是要评判编程语言的这个想法的好坏，而是要了解怎样使用它，如何趋利避害。

### 内部：引用类型

**In-depth language feature**

本文介绍一个进阶的主题，来更好地理解一些特殊情况。

『复杂』的方法调用可能会失去 `this`，比如：

```javascript
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John (the simple call works)

// 现在我们要判断 name 属性，来决定调用 user.hi 或是 user.bye。
(user.name == "John" ? user.hi : user.bye)(); // Error!
```

最后一行中有一个三元运算符，它要判断是 `user.hi` 或 `user.bye`。在这种情况下，结果会是 `user.hi`。

该方法立即被括号 `()` 调用。但它无效。

你可以看到该调用导致了错误，因为调用中的 `"this"` 为 `undefined`。

这样是正确的（对象点方法）：

```javascript
user.hi();
```

这样没有效果（对方法求值）：

```javascript
(user.name == "John" ? user.hi : user.bye)(); // 错误！
```

原因是什么？如果我们想了解为什么会这样，那么我们要深入理解 `obj.method()` 调用的原理。

仔细看，我们可能注意到 `obj.method()` 语句中有两个操作符。

1. 首先，点 `'.'` 取得这个 `obj.method` 属性。
2. 其后的括号 `()` 调用它。

那么，`this` 是如何从第一部分传递到第二部分的呢？

如果把这些操作分离开，那么 `this` 肯定会丢失：

```javascript
let user = {
  name: "John",
  hi() { alert(this.name); }
}

// 将赋值与方法调用拆分为两行
let hi = user.hi;
hi(); // 错误，因为 this 未定义
```

这里 `hi = user.hi` 把函数赋值给变量，其后的最后一行是完全独立的，所以它没有 `this`。

**为了让 user.hi() 有效，JavaScript 用一个技巧 —— 这个 '.' 点返回的不是一个函数, 而是一种特殊的[引用类型]的值(https://tc39.github.io/ecma262/#sec-reference-specification-type).**

引用类型是一种『规范中有的类型』。我们不能明确地指定它，但是可以在语言内部使用。

引用类型的值是三点的结合 `(base, name, strict)`，如下：

- `base` 是对象。
- `name` 是属性。
- 当 `use strict` 生效，`strict` 为真。

`user.hi` 属性访问的值不是函数，而是引用类型的值。在严格模式下，`user.hi` 是：

```javascript
// 引用类型值
(user, "hi", true)
```

当在引用类型上用 `()` 调用时，它们接收到这个对象和它的方法的所有信息，并且设定正确的 `this` 值（这里等于 `user`）。

`hi = user.hi` 赋值等其他的操作，将引用类型作为一个整体丢弃，只获取 `user.hi`（一个函数）的值进行传递。因此，进一步操作『失去』了 `this`（值）。

所以如果直接使用点 `obj.method()` 或方括号语法 `obj[method]()`（它们在这里并无差别）调用函数，那么作为结果，`this` 值会以正确的方式进行传递。

### 箭头函数没有自己的 “this”

箭头函数有些特别：它们没有自己的 `this`。如果我们在这样的函数中引用 `this`，`this` 值取决于外部『正常的』函数。

举个例子，这里的 `arrow()` 使用的 `this` 来自外部的 `user.sayHi()` 方法：

```javascript
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

这是箭头函数的一个特征，当我们并不想要一个独立的 `this` 值，反而想从外部上下文中获取时，它很有用。

### 总结

- 存储在对象中函数称之为『方法』。
- 对象执行方法进行『操作』，比如 `object.doSomething()`。
- 方法可以将该对象引用为 `this`。

`this` 的值是在运行时求值的。

- 函数声明使用的 `this` 只有等到调用时才会有值。
- 函数可以在对象之间进行共用。
- 当函数使用『方法』语法 `object.method()` 调用时，调用过程中的 `this` 总是指向 `object`。

请注意箭头函数有些特别：它们没有 `this`。在箭头函数内部访问的都是来自外部的 `this` 值。

## 对象方法

1. #### Object.assign(target, source1, source2, ...)

该方法主要用于对象的合并，将源对象 source 的所有可枚举属性合并到目标对象 target 上,此方法只拷贝源对象的自身属性，不拷贝继承的属性

Object.assign 方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。同名属性会替换

Object.assign 只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制

Object.assign 可以用来处理数组，但是会把数组视为对象

```JavaScript
const target = {
    x : 0,
    y : 1
};
 
const source = {
    x : 1,
    z : 2 ,
    fn : {
        number : 1
    }
};
 
Object.assign(target, source);  
// target  {x : 1, y : 1, z : 2, fn : {number : 1}} // 同名属性会被覆盖
// source  {x : 1, z : 2, fn : {number : 1}}
target.fn.number = 2; // 拷贝为对象引用
// source  {x : 1, z : 2, fn : {number : 2}}
 
function Person(){
    this.name = 1
};
Person.prototype.country = 'china';
let student = new Person();
student.age = 29 ;
const young = {insterst : 'sport'};
Object.assign(young,student);
// young {instest : 'sport' , age : 29
// 只能拷贝自身的属性，不能拷贝prototype
 
 
Object.assign([1, 2, 3], [4, 5]) // 把数组当作对象来处理
// [4, 5, 3]
```

#### 2. Object.create(prototype[,propertiesObject])

使用指定的原型对象及其属性去创建一个新的对象

```javascript
var parent = {
    x : 1,
    y : 1
}
 
var child = Object.create(parent,{
    z : { // z会成为创建对象的属性
        writable:true,
        configurable:true,
        value: "newAdd"
    }
});
console.log(child);
```

#### 3. Object.defineProperties(obj,props)

直接在一个对象上定义新的属性或修改现有属性，并返回该对象

```
var obj = {};
Object.defineProperties(obj, 
{  
   'property1': {    
       value: true,  
        writable: true 
   },  
  'property2': {   
     value: 'Hello',
     writable: false  
  } // etc. etc.
});
console.log(obj); // {property1: true, property2: "Hello"}
```

#### 4. Object.defineProperty(obj,prop,descriptor)

在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象

```
Object.defineProperty(Object, 'is', 
{
     value: function(x, y) {    
        if (x === y) { // 针对+0 不等于 -0的情况       
              return x !== 0 || 1 / x === 1 / y;   
        }   // 针对NaN的情况    
        return x !== x && y !== y;  
     },  
     configurable: true,  
     enumerable: false,  
     writable: true 
}); // 注意不能同时设置(writable，value) 和 get，set方法，否则浏览器会报错  
// Invalid property descriptor.  Cannot both specify accessors and a value or writable attribute
```

#### 5. [Object.keys(obj)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

返回一个由一个给定**对象**的自身可枚举属性组成的**数组**，数组中属性名的排列顺序和使用 [for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）

```
let arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // ['0', '1', '2'] /* Object 对象 */

let obj = { foo: "bar", baz: 42 }, keys = Object.keys(obj);
console.log(keys); // ["foo","baz"]
```

#### 6. Object.values()

方法返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用 for...in 循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )

Object.values会过滤属性名为 Symbol 值的属性

```
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']

var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']
```

#### 7. Object.entries()

返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）

```
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
 
const simuArray = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(simuArray)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
```

#### 8. hasOwnProperty()

判断对象自身属性中是否具有指定的属性

```
obj.hasOwnProperty('name')
```

#### 9. Object.getOwnPropertyDescriptor(obj,prop)

返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined

```
var arr = ['name','age'] ;
arr.forEach(val => console.log(Object.getOwnPropertyDescriptor(obj,val)))
// {value: "js", writable: true, enumerable: true, configurable: true}
// undefined
```

#### 10. Object.getOwnPropertyDescriptors(obj)

获取一个对象的所有自身属性的描述符

```
var obj = {
    name : 'js',
    age : 20
}
console.log(Object.getOwnPropertyDescriptors(obj));
```



![img](https:////upload-images.jianshu.io/upload_images/4804567-998d85e9889852f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/437/format/webp)



```
const source = {
  set foo(value) {
    console.log(value);
  }
};
 
const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
 
 
const obj = Object.create(
  some_obj,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);
```

#### 11. Object.getOwnPropertyNames()

返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组

```
var obj = { 0: "a", 1: "b", 2: "c"};
 
Object.getOwnPropertyNames(obj).forEach(function(val) {
  console.log(val);
});
 
 
var obj = {
    x : 1,
    y : 2
}
 
Object.defineProperty(obj,'z',{
    enumerable : false
});
console.log(Object.getOwnPropertyNames(obj)); // ["x", "y", "z"] 包含不可枚举属性 。
console.log(Object.keys(obj)); // ["x", "y"]      只包含可枚举属性 。
```

#### 12. Object.getOwnPropertySymbols()

返回一个给定对象自身的所有 Symbol 属性的数组

#### 13. Object.getPrototypeOf()

返回指定对象的原型（内部[[Prototype]]属性的值，即**proto**，而非对象的prototype）

#### 14. isPrototypeOf()

判断一个对象是否存在于另一个对象的原型链上

#### 15. Object.setPrototypeOf(obj,prototype)

设置对象的原型对象

#### 16. Object.is()

判断两个值是否相同

- 如果下列任何一项成立，则两个值相同：
  - 两个值都是 `undefined` 
  - 两个值都是 `null` 
  - 两个值都是 `true` 或者都是 `false` 
  - 两个值是由相同个数的字符按照相同的顺序组成的字符串
  - 两个值指向同一个对象
  - 两个值都是数字并且
  - 都是正零 `+0` 
  - 都是负零 `-0` 
  - 都是 `NaN` 
  - 都是除 `0` 和 `NaN` 外的其它同一个数字

```
Object.is('foo', 'foo'); // true
Object.is(window, window); // true
 
Object.is('foo', 'bar'); // false
Object.is([], []); // false
 
var test = { a: 1 };
Object.is(test, test); // true
 
Object.is(null, null); // true
 
// 特例
Object.is(0, -0); // false
Object.is(-0, -0); // true
Object.is(NaN, 0/0); // true
```

#### 17. Object.freeze()

冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象

```
var obj = {
  prop: function() {},
  foo: 'bar'
};
 
// 新的属性会被添加, 已存在的属性可能
// 会被修改或移除
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;
 
// 作为参数传递的对象与返回的对象都被冻结
// 所以不必保存返回的对象（因为两个对象全等）
var o = Object.freeze(obj);
 
o === obj; // true
Object.isFrozen(obj); // === true
 
// 现在任何改变都会失效
obj.foo = 'quux'; // 静默地不做任何事
// 静默地不添加此属性
obj.quaxxor = 'the friendly duck';
console.log(obj);
```

#### 18. Object.isFrozen()

判断一个对象是否被冻结

#### 19. Object.preventExtensions()

对象不能再添加新的属性。可修改，删除现有属性，不能添加新属性

```
var obj = {
    name :'lilei',
    age : 30 ,
    sex : 'male'
}
 
obj = Object.preventExtensions(obj);
console.log(obj); // {name: "lilei", age: 30, sex: "male"}
obj.name = 'haha';
console.log(obj); // {name: "haha", age: 30, sex: "male"}
delete obj.sex ;
console.log(obj); // {name: "haha", age: 30}
obj.address  = 'china';
console.log(obj); // {name: "haha", age: 30}
```

#### 20. Object.isExtensible()

判断对象是否是可扩展的，Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）

#### 21. Object.seal()

Object.seal() 方法可以让一个对象密封，并返回被密封后的对象。密封一个对象会让这个对象变的不能添加新属性，且所有已有属性会变的不可配置。属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义成为访问器属性，或者反之。但属性的值仍然可以修改。尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性，结果会静默失败或抛出TypeError 异常. 不会影响从原型链上继承的属性。但 [`__proto__`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) 属性的值也会不能修改

```
var obj = {
    prop: function () {},
    foo: "bar"
  };
 
// 可以添加新的属性,已有属性的值可以修改,可以删除
obj.foo = "baz";
obj.lumpy = "woof";
delete obj.prop;
 
var o = Object.seal(obj);
 
assert(o === obj);
assert(Object.isSealed(obj) === true);
 
// 仍然可以修改密封对象上的属性的值.
obj.foo = "quux";
 
// 但你不能把一个数据属性重定义成访问器属性.
Object.defineProperty(obj, "foo", { get: function() { return "g"; } }); // 抛出TypeError异常
 
// 现在,任何属性值以外的修改操作都会失败.
obj.quaxxor = "the friendly duck"; // 静默失败,新属性没有成功添加
delete obj.foo; // 静默失败,属性没有删除成功
 
// ...在严格模式中,会抛出TypeError异常
function fail() {
  "use strict";
  delete obj.foo; // 抛出TypeError异常
  obj.sparky = "arf"; // 抛出TypeError异常
}
fail();
 
// 使用Object.defineProperty方法同样会抛出异常
Object.defineProperty(obj, "ohai", { value: 17 }); // 抛出TypeError异常
Object.defineProperty(obj, "foo", { value: "eit" }); // 成功将原有值改变
```

#### ## 22. Object.isSealed()

判断一个对象是否被密封



参考链接：

https://www.jianshu.com/p/64a2a9397f15

<https://xxxgitone.github.io/2017/06/12/JavaScript%E5%85%AD%E7%A7%8D%E7%BB%A7%E6%89%BF%E6%96%B9%E5%BC%8F/>