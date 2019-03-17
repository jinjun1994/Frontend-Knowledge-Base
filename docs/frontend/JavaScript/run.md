在JavaScript中存在一种预编译的机制，这也是Java等一些语言中没有的特性，也就正是因为这个预编译的机制，导致了js中变量提升的一些问题，下面这两句话能解决开发当中一部份问题，但不能解决所有问题，还有一些问题是你必须通过学习预编译才能解决的。

1. **函数声明**整体提升
2. **变量声明**提升（*注意是变量声明**）**

> tip：*JS函数的调用永远都是在函数声明下面调用，即使你的调用是写在函数声明之前的，它隐式也是在函数声明下调用的。*



## 预编译什么时候发生

预编译分为全局预编译和局部预编译，全局预编译发生在页面加载完成时执行，而局部预编译发生在函数执行的前一刻。



> *tip：预编译阶段发生变量声明和函数声明，没有初始化行为（赋值），匿名函数不参与预编译 。只有在解释执行阶段才会进行变量初始化 。*



## js运行三步曲

1. 语法分析
2. 预编译
3. 解释执行



## 预编译前奏

**imply global**暗示全局变量，任何变量，如果变量未经声明就赋值，这些变量就为全局对象所有。**一切声明的全局变量和未经声明的变量，全归window所有。**

例如：

```js
var a = 123;
window.a = 123;
```



下面这个函数里面只有一个连等的操作，赋值操作都是自右向左的，而b是未经声明的变量，所以它是归window的，我们可以直接使用window.b去使用它。

```js
function test(){
	// 这里的b是未经声明的变量，所以是归window所有的。
	var a = b = 110;
}
```



## **预编译步骤**

首先JavaScript的执行过程会先扫描一下整体语法语句，如果存在逻辑错误或者语法错误，那么直接报错，程序停止执行，没有错误的话，开始从上到下解释一行执行一行。



**局部预编译的4个步骤：**

1. 创建AO对象（Activation Object）执行期上下文。
2. 找形参和变量**声明**，将变量和形参名作为AO属性名，值为undefined
3. 将实参值和形参统一。
4. 在函数体里面找函数声明，值赋予函数体。



**全局预编译的3个步骤：**

1. 创建GO对象（Global Object）全局对象。
2. 找变量声明，将变量名作为GO属性名，值为undefined
3. 查找函数声明，作为GO属性，值赋予函数体

由于全局中没有参数的的概念，所以省去了实参形参相统一这一步。



> **tip：**GO对象是全局预编译，所以它优先于AO对象所创建和执行



## 巩固基础练习

**关于AO对象的例子**

```js
// 函数
function fn(a){
        console.log(a);
	// 变量声明+变量赋值（只提升变量声明，不提升变量赋值）
	var a = 123;
	console.log(a);
	// 函数声明
	function a(){};
	console.log(a);
	// 函数表达式
	var b = function(){};
	console.log(b);
	// 函数
	 function d(){};
}
//调用函数
fn(1);
```



**1.预编译第1步：**创建AO对象

```js
AO{ 

}
```

**2.预编译第2步：**找形参和变量声明，将形参名和变量名作为AO对象的属性名

```js
AO{
     a : undefined,
     b : undefined
}
```

**3.预编译第3步：**将实参值和形参统一

```js
AO{
     a : 1,
     b : function(){...}
}
```

**4.预编译第4步：**在函数体里面找函数声明，值赋予函数体。

```js
AO{
     a : function a(){...},
     b : undefined,
     d : function d(){...}
}
```

**最后输出结果：**

```js
// 函数
function fn(a){
        console.log(a);	 	//根据AO对象中的数据第一个打印的是：fn()
	// 变量声明+变量赋值（只提升变量声明，不提升变量赋值）
	var a = 123;		// 执行到这时，由于变量赋值是不提升的，所以函数被123覆盖了
	console.log(a);		// 123
	// 函数声明
	function a(){};		// 这里被提升上去了，可以忽略
	console.log(a);		// 123
	// 函数表达式
	var b = function(){};
	console.log(b);		// 根据AO对象中的数据：fn()
	// 函数
	 function d(){};
}
//调用函数
fn(1);
```

函数执行完毕，销毁AO对象。



**关于GO对象的例子**

```js
global = 100;
function test(){
	console.log(global);	
	var global = 200;
	console.log(global);
	var global = 300;
}
test();
var global;
```



**1.全局预编译第1步：**创建AO对象

```js
GO{

}
```

**2.全局预编译第2步：**找变量声明，将变量名作为GO属性名，值为undefined

```js
GO{
    global：undefined
}
```

**3.全局预编译第3步：**查找函数声明，作为GO属性，值赋予函数体

```js
GO{
global：undefined
}
```

**4.局部预编译第1步：**创建AO对象

```js
AO{
      
}
```

**5.局部预编译第2步：**找形参和变量声明，将形参名和变量名作为AO对象的属性名

```js
AO{
     global: undefined
}
```

**6.局部预编译第3步：**将实参值和形参统一（此函数没有形参）

```js
AO{
     global: undefined
}
```

**7.局部预编译第4步：**在函数体里面找函数声明，值赋予函数体。（此函数内没有函数声明）

```js
AO{
     global: undefined
}
```

**最的结果：**

```js
global = 100;
function test(){
	console.log(global);		// 根据AO对象中的数据：undefined
	var global = 200;		// 执行到这时，200覆盖了undefined
	console.log(global);		// 200
	var global = 300;
}
test();
var global;
```



tip：关于GO对象和AO对象，它们俩是一个种链式关系，就拿上面的这个例子来说吧，如果在函数体的内部没有定义global变量，这也意味着AO对象中将有这个global这个属性。那如果没有会怎么办？它会去GO对象中寻找，说白了也就是一种就近原则。

![img](https://pic3.zhimg.com/80/v2-e608a97ae6ff89ec3138d0a26cef8df2_hd.jpg)