---
{
author: jinjun,
title: 对象,
date: 2019/02/10,
lang: ZH-CN,
}
---



1. ## Object.assign(target, source1, source2, ...)

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

## 2. Object.create(prototype[,propertiesObject])

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

## 3. Object.defineProperties(obj,props)

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

## 4. Object.defineProperty(obj,prop,descriptor)

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

## 5. [Object.keys(obj)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 

返回一个由一个给定**对象**的自身可枚举属性组成的**数组**，数组中属性名的排列顺序和使用 [for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）

```
let arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // ['0', '1', '2'] /* Object 对象 */

let obj = { foo: "bar", baz: 42 }, keys = Object.keys(obj);
console.log(keys); // ["foo","baz"]
```

## 6. Object.values()

方法返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用 for...in 循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )

Object.values会过滤属性名为 Symbol 值的属性

```
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']

var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']
```

## 7. Object.entries()

返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）

```
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
 
const simuArray = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(simuArray)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
```

## 8. hasOwnProperty()

判断对象自身属性中是否具有指定的属性

```
obj.hasOwnProperty('name')
```

## 9. Object.getOwnPropertyDescriptor(obj,prop)

返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined

```
var arr = ['name','age'] ;
arr.forEach(val => console.log(Object.getOwnPropertyDescriptor(obj,val)))
// {value: "js", writable: true, enumerable: true, configurable: true}
// undefined
```

## 10. Object.getOwnPropertyDescriptors(obj)

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

## 11. Object.getOwnPropertyNames()

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

## 12. Object.getOwnPropertySymbols()

返回一个给定对象自身的所有 Symbol 属性的数组

## 13. Object.getPrototypeOf()

返回指定对象的原型（内部[[Prototype]]属性的值，即**proto**，而非对象的prototype）

## 14. isPrototypeOf()

判断一个对象是否存在于另一个对象的原型链上

## 15. Object.setPrototypeOf(obj,prototype)

设置对象的原型对象

## 16. Object.is()

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

## 17. Object.freeze()

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

## 18. Object.isFrozen()

判断一个对象是否被冻结

## 19. Object.preventExtensions()

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

## 20. Object.isExtensible()

判断对象是否是可扩展的，Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）

## 21. Object.seal()

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

## 22. Object.isSealed()

判断一个对象是否被密封

作者：小贤笔记

链接：https://www.jianshu.com/p/64a2a9397f15

來源：简书

简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。