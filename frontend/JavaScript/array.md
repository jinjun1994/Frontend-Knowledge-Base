---
{
author: jinjun,
title: 数组,
date: 2019/02/10,
lang: ZH-CN,
}
---

[[toc]]

## 数组的创建

数组的创建有三种方式：构造函数方式、字面量方式、ES6新增的Array.of()方法创建。

- 构造函数方式：

  ```javascript
  let arr = new Array(); // 创建一个空数组
  let arr = new Array(10); // 创建长度为10的数组
  let arr = new Array('a'); // 创建包含一个字符串元素a的数组
  let arr = new Array(10, 'a'); // 创建包含10和字符串a两个元素的数组 
  ```

  > 小结：
  > 1.new 关键字是可省略的
  > 2.当只传一个number类型参数时，创建的是参数指定长度的数组。**即构造函数形式创建数组，不能创建只包含一个number类型元素的数组**

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

  ```javascript
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
  ```

## 数组的检测

两种较为准确的检测方法：

- 利用对象的toString方法：
  Object.prototype.toString.call([]) === "[object Array]";  // true

- Array.isArray():
  Array.isArray([1, 2, 3]);  // true

  ```javascript
  let _isArray;
  if (Array.isArray) {
    _isArray = Array.isArray;
  } else {
    _isArray = x => Object.prototype.toString.call(x) === '[object Array]';
  }
  
  export const isArray = _isArray;
  ```

## 数组的属性

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

## 数组的方法

JavaScript的数组方法包括数组原型的方法、构造函数的方法（ES6新增部分）

![](<http://img.dubiqc.com/chrome_WIlkQ23Fpm.png>)

上图可知通过 Array 构造函数有 Array.from() 、Array.isArray()、Array.of()三个方法。上面已经讲过。

所有数组实例都会从 [`Array.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype) 继承属性和方法。

方法可以分为**访问器方法、修改器方法以及迭代方法**。**访问器方法绝对不会改变调用它们的对象的值**，只会返回一个新的数组或者返回一个其它的期望值，**修改器方法会改变调用它们的对象自身的值**，迭代方法中有很多方法都需要指定一个回调函数作为参数。在每一个数组元素都分别执行完回调函数之前，数组的length属性会被缓存在某个地方，所以，如果你在回调函数中为当前数组添加了新的元素，新添加的元素是不会被访问到的。此外，如果在回调函数中对当前数组进行了其它修改，比如改变某个元素的值或者删掉某个元素，那么随后的访问操作可能会受到未预期的影响。总之，**不要尝试在迭代过程中对原数组进行任何修改**，虽然规范对这样的操作进行了详细的定义，但为了可读性和可维护性，不要依赖他。如果必须修改数组，则复制到一个新数组中。

 针对每一个方法我们主要了解四个方面：**作用、参数、返回值、原数组是否改变**
 **（一）. 原型上的方法**

1. **push()：**

   作用：向数组的末尾添加一项或多项

   语法：arr.push(element1, ..., elementN)

   返回值：添加元素后数组的长度

   分类：修改器

   ```javascript
   let arr = [1, 2, 3];
   let temp = arr.push('a', 'b');
   console.log(arr, temp); // [1, 2, 3, 'a', 'b'] 5
   ```

2. **pop():**

   作用：删除数组最后一项

   语法：arr.pop()

   返回值：从数组中删除的元素(当数组为空时返回`undefined`)。

   分类：修改器

   ```javascript
   let arr = [1, 2, 3];
   let temp = arr.pop();
   console.log(arr, temp); // [1, 2] 3
   ```

3. **unshift():**

   作用：向数组开头添加一项或多项

   语法：arr.unshift(element1, ..., elementN)

   返回值：添加元素后数组的长度

   分类：修改器

   ```javascript
   let arr = [1, 2, 3];
   let temp = arr.unshift('a', 'b');
   console.log(arr, temp); // ['a', 'b', 1, 2, 3] 5
   ```

4. **shift():**

   作用：删除数组第一项

   语法：arr.shift()

   返回值：从数组中删除的元素; 如果数组为空则返回`undefined` 。 

   分类：修改器

   ```
   let arr = [1, 2, 3];  
   let temp = arr.shift();
   console.log(arr, temp); // [2, 3] 1
   ```

5. **splice():**

   作用：删除、插入、替换数组项。可以说是数组界的瑞士军刀，它可以做所有事情。

   语法：`arr.splice(index[, deleteCount, elem1, ..., elemN])`

   说明：从 `index` 开始，删除 `deleteCount` 个元素并在当前位置插入 `elem1, ..., elemN`。最后返回已删除元素的数组。

   返回值：由被删除的元素组成的一个数组，如果没有删除元素，则返回空数组。

   分类：修改器

   ```javascript
   let arr = [1, 2, 3];
   
   //插入元素 将 deleteCount 设置为 0，就能够插入元素而不用删除：
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

   语法：arr.copyWithin(target[, start[, end]])

   参数说明：

   - target: 复制的目标位置（包括），即要被替换的元素开始的位置
   - start: 要copy的元素的开始位置，默认0
   - end: 要copy的元素的结束位置，默认为数组最后一个元素

   返回值：复制替换之后的数组

   分类：修改器

   ```JavaScript
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
   > > 总结上述的描述，copyWithin的作用就是在**数组长度的范围内**，复制start(包括)到end(不包括)范围内的元素，然后用上述的元替换掉从target（包括）开始到数组结尾的元素，能替换多少就替换多少

7. **reverse():**

   作用：`reverse` 方法颠倒数组中元素的位置，并返回该数组的引用。

   语法：：arr.reverse()

   返回值：该数组的引用

   分类：修改器

   ```JavaScript
   let arr = [1, 2, 3];
   let temp = arr.reverse();
   console.log(arr, temp); // [ 3, 2, 1 ] [ 3, 2, 1 ]
   ```

8. **sort():**

   作用：数组排序

   语法：arr.sort([compareFunction])

   参数说明：

   - compareFunction返回值大于0时调换当前比对项的顺序，否则顺序不 变;
   - 如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。

   返回值：排序后的数组

   分类：修改器

   ```JavaScript
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

   作用：用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

   语法：var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

   参数说明：

   - 参数的类型可以是任意类型。
   - 不是数组类型直接按顺序拼接到数组末尾，数组类型的则将数组元素逐一取出拼接到数组末尾
   - 不传则相当于复制数组

   返回值：拼接后的数组

   分类：访问器

   ```javascript
   let arr = [1,2];
   let temp = arr.concat('a', {id:1}, ['lilei', 'hanmeimei']);
   console.log(arr, temp); // [ 1, 2 ] [ 1, 2, 'a', { id: 1 }, 'lilei', 'hanmeimei']
   
   // 用于复制数组
   let arr = [1, 2];
   let temp = arr.concat();
   console.log(arr, temp);  // [ 1, 2 ] [ 1, 2 ]
   ```

10. **slice():**

    作用：切片，基于当前数组的一项或多项创建一个新的数组

    语法：

    ```js
    arr.slice();
    // [0, end]
    
    arr.slice(begin);
    // [begin, end]
    
    arr.slice(begin, end);
    // [begin, end)
    ```

     参数说明：

    - `begin` 可选

      从该索引处开始提取原数组中的元素（从0开始）。

      如果该参数为负数，`则表示从原数组中的倒数第几个元素开始提取，``slice(-2)`表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。

      如果省略 `begin`，则 `slice` 从索引 0 开始。

    - `end`可选

      在该索引处结束提取原数组元素（从0开始）。`slice`会提取原数组中索引从 `begin` 到 `end `的所有元素（包含begin，但不包含end）。

      `slice(1,4)` 提取原数组中的第二个元素开始直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。

      如果该参数为负数， `则它表示在原数组中的倒数第几个元素结束抽取`。 `slice(-2,-1)`表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。

      如果 `end` 被省略，`则slice` 会一直提取到原数组末尾。

      如果 `end 大于数组长度，slice 也会一直提取到原数组末尾。`

    返回值：含有提取元素的新数组

    分类：访问器

    说明：`slice` 不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：

    - 如果该元素是个对象引用 （不是实际的对象），`slice` 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
    - 对于字符串、数字及布尔值来说（不是 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 或者 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean) 对象），`slice` 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。

    ```JavaScript
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

    语法：：`arr.indexOf(searchElement[, fromIndex = 0])`

    返回值：searchElement在数组中的索引，没找到searchElement则返回-1。fromIndex开始查找的位置，其默认值为0.  

    分类：访问器方法

    ```JavaScript
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

    语法：arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])

    返回值：searchElement在数组中的索引，没找到searchElement则返回-1 

    分类：访问器

    ```JavaScript
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
      语法：callback[, thisArg]
      参数说明：callback有三个参数item(当前项),index(当前项索引)，array(数组对象本身)
      返回值：true 或 false
    分类： 迭代方法

    ```JavaScript
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

    语法：callback[, thisArg]
    参数说明：callback有三个参数item(当前项),index(当前项索引)，array(数组对象本身)
    返回值：true 或 false
    分类： 迭代方法

    ```js
     let arr = [1, 2, 3, 4];
     let temp = arr.some((item, index, array) => {
         return item > 2;
     });
     console.log(arr, temp); // [ 1, 2, 3, 4 ] true
    ```

15. **filter():**
      作用：对数组中的每一项运行给定函数，返回该函数返回true的项组成的数组（ES5方法）
      语法：callback[, thisArg]
      参数说明：callback有三个参数item(当前项),index(当前项索引)，array(数组对象本身)
      返回值：函数返回true的项组成的数组
    分类： 迭代方法

    ```js
     let arr = [1, 2, 3, 4];
     let temp = arr.filter((item, index, array) => {
         return item > 2;
     });
     console.log(arr, temp); // [ 1, 2, 3, 4 ] [3, 4]
    ```

16. **map():**

    作用：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组（ES5方法）

    语法：callback[, thisArg]

    参数说明：callback有三个参数item(当前项),index(当前项索引)，array(数组对象本身)

    返回值：函数每次调用结果组成的数组

    分类： 迭代方法

    ```JavaScript
     let arr = [1, 2, 3, 4];
     let temp = arr.map((item, index, array) => {
         return item * item;
     });
     console.log(arr, temp); // [ 1, 2, 3, 4 ] [ 1, 4, 9, 16]
    ```

17. **forEach():**
      作用：对数组中的每一项运行给定函数。无返回值（ES5方法）
      语法：callback[, thisArg]
      参数说明：callback有三个参数item(当前项),index(当前项索引)，array(数组对象本身)
      返回值：无
      原数组是否改变：涉及callback，因此不确定，具体详情见下文中的原型方法的小结部分。

    ```JavaScript
     let arr = [1, 2, 3, 4];
     let temp = arr.forEach((item, index, array) => {
         // 不会有返回值，但可在这里执行某些操作
         return item * item;
     });
     console.log(arr, temp); // [ 1, 2, 3, 4 ] undefined
    ```

    > 注意：
    > forEach在所有项都遍历完成之前，无法像for循环一样提前终止循环

18. **reduce():**
      作用：从数组的第一项开始，逐步遍历到最后，迭代数组的所有项（ES5方法）
      语法：callback[, initialValue]
      参数说明：

    - callback迭代函数，有四个参数（prev, cur, index, array） 
      - prev 前一个值，（initialValue || 数组第一项 || 上一次迭代的结果）
      - cur 当前迭代项
      - index 当前迭代项索引
      - array 迭代的原数组
    - initialValue 迭代的基础值，不传基础值是数组第一项

     返回值：数组迭代后，整体的迭代结果
      原数组是否改变：涉及callback，因此不确定，具体详情见下文中的原型方法的小结部分。

    ```JavaScript
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
    > let prev = initialVal || this[0]; 
    >  for(var i = pre ? 0 : 1; i < this.length; i++){
    >      prev = callback(prev, this[i], i, this);
    > }
    > return prev
    > }
    > 
    > ```

19. **reduceRight():**
      作用：从数组的最后一项开始，逐步遍历到第一项，迭代数组的所有项（ES5方法）
     语法：callback[, initialValue]
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
     语法：callback[, thisArg]
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
     语法：callback[, thisArg]
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
     语法：value[, start[, end]]
      返回值：填充后的数组
     分类：修改器

    ```
     let arr = [1, 2, 3, 4, 5];
     let temp = arr.fill('a', 2, 4);
     console.log(arr, temp); // [1, 2, 'a', 'a', 5] [1, 2, 'a', 'a', 5]
     
    ```

23. **includes():**
      作用：判断数组中是否包含指定的元素（ES7新增）
     语法：searchElement[, fromIndex]
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
     语法：无
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

     语法：分隔符，默认为逗号（，）

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
> \1. 数组的方法无外乎是对数组的增删改查、转换、迭代。增、删、改都会改变原有的数组，查、转换的方法不涉及callback参数的不会改变原数组，涉及到的则视情况而定，迭代方法因为均涉及到callback参数，因此也不确定。
> 那么为什么涉及到callback就不确定了呢？？？
> 首先如果直接在callback中操作原数组，那肯定原数组会改变。例如：
>
> ```JavaScript
> let arr = [1,2,3,4];    
> let temp = arr.forEach((item,index,array) => {  
> // 直接通过索引操作原数组  
> array[index] *= item;
> });  
> console.log(arr,temp); // [1, 4, 9, 16] undefined  
> 
> ```
>
> 如果不是直接操作原数组，而是操作callback的item参数的时,如果item是基本数据类型则原数组中对应的该项元素不会改变，如果是引用类型（数组，对象、函数等）则改变，因为操作引用类型的值，实质是操作该值所在存贮地址的内容，而item对应的原数组中的元素和item是同一引用地址，因此会导致原数组中对应元素改变。(小伙伴们对这里如果还是不理解，可以看下数组方法polyfill的实现，这里不再赘述)
> \2. 所有涉及索引的方法，开始位置都是在操作范畴的，结束位置都是不包括在操作范围内的

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
  > > Array.from() 等价于 Array.prototype.slice.call(arguments,0)

### 数组扩展运算符（ES6新增）

------

数组的扩展运算符可以将数组转化为以逗号分割的参数序列。
 几个简单使用的应用场景：

1. 将数组通过扩展运算符转化为参数序列直接传参，无需使用apply转化了

   ```JavaScript
   let arr = [1, 2, 3];
   
   // apply写法
   Math.min.apply(null, arr)
   
   // 扩展运算符写法
   Math.min(...arr)
   ```

2. 可以用于复制和拼接数组

   ```JavaScript
   let arr1 = [2, 3, 4];
   let arr2 = ['a', 'b', 'c'];
   
   // 拼接数组arr1和arr2
   console.log([...arr1, ...arr2]); // [2, 3, 4, 'a', 'b', 'c']
   ```

3. 可用于将字符串分解为真正的数组，

   ```JavaScript
   […'hello']  // [ 'h', 'e', 'l', 'l', 'o' ]
   ```





参考链接：https://juejin.im/post/5acb6186518825556a72b79b

## 数组技巧

### 去重

方法一、set +扩展符

```javascript
const array = ['🐑', 1,  2, '🐑','🐑', 3];

// Step 1
const uniqueSet = new Set(array);
// Set { '🐑', 1, 2, 3 }

// Step 2
const backToArray = [...uniqueSet];
// ['🐑', 1, 2, 3]

//or
 const backToArray1 = [...new Set(array)];
```

方法二、set + Array.from

```js
const array = ['🐑', 1,  2, '🐑','🐑', 3];

Array.from(new Set(array));

// ['🐑', 1, 2, 3]
```

方法三、array.filter

```javascript
const array = ['🐑', 1,  2, '🐑','🐑', 3];

array.filter((item, index) => array.indexOf(item) === index);
```

方法四、reduce

```javascript
const array = ['🐑', 1,  2, '🐑','🐑', 3];

array.reduce((unique, item) => {
  return unique.includes(item) ? unique : [...unique, item]
}, []); // 👈 The initial value of our Accumulator is an empty array 

// RESULT:
// ['🐑', 1, 2, 3];
```

方法五、循环

```javascript
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

