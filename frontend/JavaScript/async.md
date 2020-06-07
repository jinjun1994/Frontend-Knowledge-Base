---
{
title: 异步编程全传,
date: 2019/2/20
}
---

[[toc]]

## 异步编程全传

各种技术方案的涌现是为了解决实践中遇到的各种问题，本文将从这个角度带你梳理并掌握异步编程的核心内容。

首先对单线程异步的原理进行解读，接着按照发展历程分析JavaScript异步解决方案，详述Callback、Promise、Generator、Async/Await的特性和使用原理。



## 一、同步异步、阻塞非阻塞

**1.同步与异步**
同步和异步关注的是**消息通信机制** (synchronous communication/ asynchronous communication)
所谓同步，就是在发出一个*调用*时，在没有得到结果之前，该*调用*就不返回。但是一旦调用返回，就得到返回值了。
换句话说，就是**由调用者主动等待这个调用的结果**。

而异步则是相反，调用在发出之后，这个调用就直接返回了，所以没有返回结果。换句话说，当一个异步过程调用发出后，调用者不会立刻得到结果。而是在调用发出后，**被调用者通过状态、通知来通知调用者，或通过回调函数处理这个调用**。

典型的异步编程模型比如Node.js

举个通俗的例子：
你打电话问书店老板有没有《分布式系统》这本书，如果是同步通信机制，书店老板会说，你稍等，”我查一下"，然后开始查啊查，等查好了（可能是5秒，也可能是一天）告诉你结果（返回结果）。
而异步通信机制，书店老板直接告诉你我查一下啊，查好了打电话给你，然后直接挂电话了（不返回结果）。然后查好了，他会主动打电话给你。在这里老板通过“回电”这种方式来回调。

**2.阻塞与非阻塞**
阻塞和非阻塞关注的是**程序在等待调用结果（消息，返回值）时的状态.**

阻塞调用是指调用结果返回之前，当前线程会被挂起。调用线程只有在得到结果之后才会返回。
非阻塞调用指在不能立刻得到结果之前，该调用不会阻塞当前线程。

还是上面的例子，
你打电话问书店老板有没有《分布式系统》这本书，你如果是阻塞式调用，你会一直把自己“挂起”，直到得到这本书有没有的结果，如果是非阻塞式调用，你不管老板有没有告诉你，你自己先一边去玩了， 当然你也要偶尔过几分钟check一下老板有没有返回结果。
在这里阻塞与非阻塞与是否同步异步无关。跟老板通过什么方式回答你结果无关。[原文链接](https://www.zhihu.com/question/19732473/answer/20851256)

"同步或异步"要从调用方来判断。

同步函数返回表示工作已完成或发生异常，接下来依赖此结果的的代码被调用方继续执行。

异步函数返回表示工作已发布出去，什么时候完成不知道，接下来的代码无法依赖一个未知的结果，所以要传入一个回调在完成后处理。

js 的异步其更多的是为了和界面UI 的分时，所以尽量将任务切割为细粒度的小任务，每次执行完一段小任务只耗费一段足够小的时间然后让出时间给UI，这样UI就不会卡死。如果任务切割得不好，任务段仍然耗时长，那么无论使什么花样，一样卡死UI。因为js的异步实现不了真正并行。

其实这样的异步仅仅是推迟了某些代码的执行，对于一段需要长时间来执行的代码来说，异步只是将其的执行顺序移到后面，然后不阻塞其他的逻辑代码，等到其他代码执行完成，然后再执行这段代码，但是这段代码在执行的时候仍然还是会阻塞UI和其他业务代码的。



JavaScript其中一个基本的特性就是单线程：比如，浏览器无法同时运行两个事件处理程序，同时更新应用状态和文档状态根本是不可能的。之所以设计成单线程的原因就是，客户端的JavaScript函数必须不能运行太长时间：否则会导致循环事件，Web浏览器无法对用户输入作出响应。这也是为什么Ajax的API都是异步的

对于JavaScript这样单线程的东西唯一的解耦方法就是提供异步API。

## 二、任务队列

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

> （1）所有同步任务都在主线程上执行，形成一个[执行栈](http://www.ruanyifeng.com/blog/2013/11/stack.html)（execution context stack）。
>
> （2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
>
> （3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
>
> （4）主线程不断重复上面的第三步。

下图就是主线程和任务队列的示意图。

![任务队列](https://img.amazingtm.com/201903/06021643.png-sign)

只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。



## 三、事件处理

客户端Web 应用是一种GUI应用，也就是说这种应用会对不同类型的事件作响应，如鼠标移动、单击和键盘按压等。因此，在页面构建阶段执行的JavaScript代码，除了会影响全局应用状态和修改DOM外，还会注册事件监听器（或处理器）。这类监听器会在事件发生时，由浏览器调用执行。有了这些事件处理器，我们的应用也就有了交互能力。在详细探讨注册事件处理器之前，让我们先从头到尾看一遍事件处理器的总体思想。

浏览器执行环境的核心思想基于：同一时刻只能执行一个代码片段，即所谓的单线程执行模型。想象一下在银行柜台前排队，每个人进入一支队伍等待叫号并“处理”。但JavaScript则只开启了一个营业柜台。每当轮到某个顾客时（某个事件），只能处理该位顾客。

当一个事件抵达后，浏览器需要执行相应的事件处理函数。这里不保证用户总会极富耐心地等待很长时间，直到下一个事件触发。所以，浏览器需要一种方式来跟踪已经发生但尚未处理的事件。为实现这个目标，浏览器使用了事件队列，如图所示。

![事件处理](https://img.amazingtm.com/201903/06040715.png-sign)

所有已生成的事件（无论是用户生成的，例如鼠标移动或键盘按压，还是服务器生成的，例如Ajax事件）都会放在同一个事件队列中，以它们被浏览器检测到的顺序排列。事件处理的过程可以描述为一个简单的流程图。

-  浏览器检查事件队列头； 
-  如果浏览器没有在队列中检测到事件，则继续检查； 
-  如果浏览器在队列头中检测到了事件，则取出该事件并执行相应的事件处理器（如果存在）。在这个过程中，余下的事件在事件队列中耐心等待，直到轮到它们被处理。

事件处理背后的的主要思想是：当事件发生时，浏览器调用相应的事件处理器。

## 回调函数

广义上回调函数的定义为：一个通过函数指针调用的函数。如果你把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用为调用它所指向的函数时，我们就说这是回调函数。回调函数不是由该函数的实现方直接调用，而是在特定的事件或条件发生时由另外的一方调用的，用于对该事件或条件进行响应。

在JavaScript中，回调函数具体的定义为：函数A作为参数（函数引用）传递到另一个函数B中，并且这个函数B执行函数A，我们就说函数A叫做回调函数。如果没有名称（函数表达式），就叫做匿名回调函数。因此callback不一定用于异步，一般同步（阻塞）的场景下也经常用到回调，比如要求执行某些操作后执行回调函数。

浏览器最早内置的setTimeout与setInteval就是基于回调的思想实现的，Node.js的异步API，都是通过回调实现。

   回调是实现异步最朴素的方式。回调函数的优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度耦合，流程会很混乱，而且每个任务只能指定一个回调函数。

回调本质上是一种设计模式。回调函数本质上提供了一种与常规的上层调用下层代码相反的模式，使得底层代码也有机会反调高层的代码，这大大提升了代码的能力，也同时给工程化项目带来了新的问题和挑战。

编程分为两类：系统编程（system programming）和应用编程（application programming）。所谓系统编程，简单来说，就是编写**库**；而应用编程就是利用写好的各种库来编写具某种功用的程序，也就是**应用**例如编写JavaScript网页程序。系统程序员会给自己写的库留下一些接口，即API（application programming interface，应用编程接口）例如浏览器提供的各种web API，以供应用程序员使用。所以在抽象层的图示里，库位于应用的底下。

当程序跑起来时，一般情况下，应用程序（application program）会时常通过API调用库里所预先备好的函数。但是有些库函数（library function）却要求应用先传给它一个函数，好在合适的时候调用，以完成目标任务。这个被传入的、后又被调用的函数就称为**回调函数**（callback function）。

打个比方，有一家旅馆提供叫醒服务API，但是要求旅客自己决定叫醒的方法。可以是打客房电话，也可以是派服务员去敲门，睡得死怕耽误事的，还可以要求往自己头上浇盆水。这里，“叫醒”这个行为是旅馆提供的，相当于库函数，但是叫醒的方式是由旅客决定并告诉旅馆的，也就是回调函数。而旅客告诉旅馆怎么叫醒自己的动作，也就是把回调函数传入库函数的动作，称为**登记回调函数**（to register a callback function）。如下图所示（图片来源：维基百科）：

![img](https://img.amazingtm.com/201903/07105851.png-sign)



可以看到，回调函数通常和应用处于同一抽象层（因为传入什么样的回调函数是在应用级别决定的）。而回调就成了一个高层调用底层，底层再**回**过头来**调**用高层的过程。这应该是回调最早的应用之处，也是其得名如此的原因。

回调函数也是事件驱动式编程的基础，使得程序不必像传统的流程驱动式编程那样亦步亦趋的向下进行，而是可以被动性的由外来事件来触发进行，这几乎是所有图形化编程最基础和标准的实现方式。JavaScript可以说是基于回调的事件驱动程序设计模型。

### **回调机制的优势**

一个典型的回调函数的例子就是在各个语言中都很常见的排序接口（比如 JavaScript 中 sort 函数），它们几乎都允许用户自己提供一个定制化的「比较函数」，这个比较函数就是典型的回调函数，它将会在排序接口的内部被执行。正是由于这样的回调函数的存在，使得排序接口不再仅仅局限于自然排序，**大大提高了代码和接口的重用性**。

回调函数分为两种，一种是同步回调函数，另一种是异步回调函数。上述排序接口的回调函数就是同步回调函数，而在 Node.js 中常见的回调函数是异步回调函数。同步回调和异步回调都可以使得调用者（caller）不再简单依赖于被调用者（callee），使得二者在代码空间分布上解耦，而异步回调函数更是在运行时从时间上将二者解耦。

回调函数背后其实隐藏着「[控制反转](https://en.wikipedia.org/wiki/Inversion_of_control)（IoC，Inversion of Control ）」的编程哲学，或者说回调函数是实现 IoC 的最常见的手段。IoC 的核心思想是 “Don’t call me, I’ll call you”，也被叫作「好莱坞原则」，据说是好莱坞经纪人的口头禅。控制反转其实也很常见，一般的库（library）中有回调函数的地方就有控制反转，这种控制反转可能还是局部的，而 Web 开发中几乎肯定会用的框架（framework）则是把控制反转作用到了全局，它使得基于上的更高层开发者不用像命题作文一样从零开始创作，而是把它变成了一道填空题，你只需要在约定好的地方按照具体的业务需求填入相应的内容即可，整个程序的运转流程被牢牢地把控在框架手中。用vue.js框架进行开发相当于往函数里面填写参数。

### **易被忽略的主程序**

通过上面的论述可知，中间函数和回调函数是回调的两个必要部分，不过人们往往忽略了回调里的第三位要角，就是中间函数的调用者。绝大多数情况下，这个调用者可以和程序的主函数等同起来，但为了表示区别，我这里把它称为**起始函数**。

之所以特意强调这个，是因为，很多人把它简单地理解为两个个体之间的来回调用。很多人把起始函数和回调函数看作为一体，大概有两个原因：第一，可能是“回调”这一名字的误导；第二，给中间函数传入什么样的回调函数，是在起始函数里决定的。实际上，回调并不是“你我”两方的互动，而是ABC的三方联动。有了这个清楚的概念，在自己的代码里实现回调时才不容易混淆出错。

### 回调存在的问题

#### 一、无法完美表达复杂异步代码逻辑

 在异步中如果你总是依赖回调的话，很容易就写出大家都看不懂， 甚至自己过段时间也看不懂的代码来。

常见的异步场景回调也没办法用足够简洁优雅的方式去处理：

这些场景包括但不限于：多个异步回调的串行处理（链式），多个异步回调的并行处理（门）和异步任务竞赛

##### 回调嵌套（异步回调的串行处理）

JS从一开始就使用事件轮询的并发模型。我们一直以来都在写异步的程序。直到最近，我们仍然在用简单的回调函数来处理异步的问题。

```javascript
makeAjaxRequest(url,function(respnose){
    alert("Response:" + response) ;
}) ;
```

当我们只有一个异步任务的时候使用回调函数看起来还不会有什么问题。但是，实际是我们完成一个任务通常需要多个异步操作。例如：

```javascript
btn.addEventListener("click",function(evt){
    makeAjaxRequest(url,function(response){
        makeAjaxRequest(anotherURL + "?resp=" + response,function(response2){
            alert("Response2:" + response) ;
        })
    }) ;
},false) ;
```

把一系列异步操作链接在一起最自然的方式就是使用回调嵌套，步骤2嵌套在步骤1中然后步骤3嵌套在步骤2中，等等。**我们的代码风格应该是“链式”风格， 但却因为回调的原因被硬生生折腾成了难懂的“嵌套”风格 。**

##### 回调地狱

你使用越多的回调，就会有越多的嵌套，不断缩进意大利面条似的代码。很显然，这种代码难以编写，难以理解而且难以维护。如果我们花点时间来理清这些代码往往会让我们事半功倍。 这类嵌套/缩进经常被叫做"回调地狱"。有时也被叫做"回调金字塔"，专指由于代码不断缩进所形成的金字塔形状，缩进越多金字塔形状越明显。

我们认真思考的时候很少是以事件的形式进行的。取而代之的是，我们按照顺序（A，然后 B，然后 C）仔细计划着，并且会假定有某种形式的临时阻塞来保证 B 会等待 A 完成，C 会等待 B 完成。开发者编写代码的时候是在计划一系列动作的发生。优秀的开发者会认真计划。“我需要把 z 设为 x 的值，然后把 x 设为 y 的值”，等等。编写同步代码的时候，语句是一条接一条执行的，其工作方式非常类似于待办任务清单。

````javascript
// 交换x和y（通过临时变量z）
z = x; 
x = y; 
y = z; 
````

这三条语句是同步执行的，所以 x = y 会等待 z = x 执行完毕，然后 y = z 等待 x = y 执行完毕。换个说法就是，这三条语句临时绑定按照特定顺序一个接一个地执行。这里我们不需要处理异步事件的细节。如果需要的话，代码马上就会变得复杂得多！
所以，如果说同步的大脑计划能够很好地映射到同步代码语句，那么我们的大脑在规划异步代码方面又是怎样的呢？
答案是代码（通过回调）表达异步的方式并不能很好地映射到同步的大脑计划行为。

这才是回调地狱的真正问题所在！嵌套和缩进基本上只是转移注意力的枝节而已。我们的顺序阻塞式的大脑计划行为无法很好地映射到面向回调的异步代码。这就是回调方式最主要的缺陷：对于它们在代码中表达异步的方式，我们的大脑需要努力才能同步得上。

对程序员来说，编写异步事件代码，特别是当回调是唯一的实现手段时，困难之处就在于这种思考 / 计划的意识流对我们中的绝大多数来说是不自然的。我们的思考方式是一步一步的，但是从同步转换到异步之后，可用的工具（回调）却不是按照一步一步的方式来表达的。这就是为什么精确编写和追踪使用回调的异步 JavaScript 代码如此之难：因为这并不是我们大脑进行计划的运作方式。

##### 异步回调的并行处理（门）

在经典的编程术语中，门（gate）是这样一种机制要等待两个或更多并行 / 并发的任务都完成才能继续。它们的完成顺序并不重要，但是必须都要完成，门才能打开并让流程控制继续。

 只有所有的异步操作都完成了， 我们才认为它整体完成了，才能进行下一步操作

下面这个例子里， 我们试图通过两个异步请求操作，分别取得a和b的值并将它们以 a + b的形式

**（前提： 我们希望当a和b的取值都到达的时候才输出）**

```js
var a, b;
function foo(x) {
   a = x * 2;
   if (a && b) {
        baz();
    }
}
function bar(y) {
    b = y * 2;
    if (a && b) {
           baz();
    }
}
function baz() {
     console.log( a + b );
}
// ajax(..)是某个库中的某个Ajax函数
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```

这段代码比前面那段“链式”里的回调地狱好懂多了，但是却依然存在这一些问题：

我们使用了两个  if (a && b) { }  去分别保证baz是在a和b都到达后才执行的，试着思考一下：

**两个  if (a && b) { }  的判断条件是否可以合并到一起呢，因为这两个判断条件都试图表达同一种语意： a 和 b都到达， 能合并成一条语句的话岂不是更加简洁优雅 ？** 

##### **竞态**

这种模式传统上称为门闩，但在 JavaScript中称为竞态。

**一组异步操作，其中一个完成了， 这组异步操作便算是整体完成了**

在下面，我们希望通过异步请求的方式，取得x的值，然后执行foo或者bar，但希望只把foo或者bar其中一个函数执行一次

```javascript
var flag = true;
function foo(x) {
    if (flag) {
        x = x + 1
        baz(x);
        flag = false
     }
}
function bar(x) {
     if (flag) {
         x = x*2
         baz(x);
         flag = false
     }
}
function baz( x ) {
       console.log( x );
}
// ajax(..)是某个库中的某个Ajax函数
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```

**在这里，我们设置了一个flag， 设它的初始值为true, 这时候foo或者bar在第一次执行的时候， 是可以进入if内部的代码块并且执行baz函数的， 但在if内部的代码块结束的时候， 我们把flag的值置为false,这个时候下一个函数就无法进入代码块执行了**， 这就是回调对于竞态的处理。

#### 二、信任问题和控制反转

如上文所说，JavaScript中调用ajax API的主程序

```javascript
//A
ajax( "..", function(..){  
//C
} );
//B
```

// A 和 // B ，以及对ajax的调用发生于现在，这在 JavaScript 主程序的直接控制之下。**但ajax里的回调C会延迟到将来发生，并且是在第三方（而不是我们的主程序）的控制下——在本例中就是函数 ajax(..) 。这种控制权的转移， 被叫做“控制反转”**，也就是把自己程序一部分的执行控制交给某个第三方。

移交控制权，后你必须默认相信`ajax(..)`会做到下面这些：

1. 不会太早调用我的回调函数

2. 不会太迟调用我的回调函数(1,2就是说会在适当的时候调用回调函数)

3. 不会调用我的回调太少次(不会少于实际应该调用的次数，比如不会漏掉函数调用)

4. 不会调用我的回调太多次(不会多于实际应该调用的次数，比如重复调用)

5. 会给我的回调提供必要的参数

6. 在我的回调失败的时候会提醒我

   ......

**然而很多时候这个不确定的函数来源于它人之手，甚至来源于完全无法核实的第三方代码**，并不能确信第三方api会做到这些。

**1.调用函数过早**

我们有可能会写出一个既可能同步， 又可能异步的函数

例如下面这个极简的例子：

我试图用这段代码检查一个输入框内输入的账号是否为空， 如果不为空就用它发起请求。（注：callback无论账号是否为空都会被调用）

```
// 注: 这是一个相当乌托邦,且省略诸多内容的函数
function login (callback) {
        // 当取得的账号变量name的值为空时， 立即调用函数，此时callback同步调用）
       if(!name) {
           callback();
           return   // name为空时在这里结束函数
        }
       // 当取得的账号变量name的值不为空时， 在请求成功后调用函数（此时callback异步调用）
      request('post', name, callback)
}
```

**的确，这种函数的编写是公认的需要杜绝的，在英语世界里， 这种可能同步也可能异步调用的回调以及包裹它的函数， 被称作是 “Zalgo” （一种都市传说中的魔鬼）， 而编写这种函数的行为， 被称作是"release Zalgo" (将Zalgo释放了出来)**

为什么它如此可怕？ **因为函数的调用时间是不确定的，难以预料的。 没有人会喜欢这样难以掌控的代码**。

**2.调用次数过多**

《你不知道的javascript（中卷）》的例子：

作为一个公司的员工， **你需要开发一个网上商城， payWithYourMoney是你在确认购买后执行的扣费的函数， 由于公司需要对购买的数据做追踪分析， 这里需要用到一个做数据分析的第三方公司提供的analytics对象中的purchase函数。** 代码看起来像这样

 

```
analytics.purchase( purchaseData, function  () {
      payWithYourMoney ()
} );
```



在这情况下**，可能我们会忽略的一个事实是： 我们已经把payWithYourMoney 的控制权完全交给了analytics.purchase函数了，这让我们的回调“任人宰割”**

然后上线后的一天， **数据分析公司的一个隐蔽的bug终于显露出来， 让其中一个原本只执行一次的payWithYourMoney执行了5次**， 这让那个网上商城的客户极为恼怒， 并投诉了你们公司。

可**你们公司也很无奈， 这个时候惊奇的发现：   payWithYourMoney的控制完全不在自己的手里 。**

后来， **为了保证只支付一次， 代码改成了这样：**

```js
var analysisFlag  = true // 判断是否已经分析（支付）过一次了
analytics.purchase( purchaseData, function(){
     if (！analysisFlag) {
           payWithYourMoney ()
            analysisFlag = false
     }
} );
```

但是， 这种方式虽然巧妙， **但却仍不够简洁优雅**（后文提到的Promise将改变这一点）

**而且， 在回调函数的无数“痛点”中， 它只能规避掉一个**， 如果你尝试规避掉所有的“痛点”，代码将比上面更加复杂而混乱。

**3.太晚调用或根本没有调用**

因为你失去了对回调的控制权， 你的回调可能会出现预期之外的过晚调用或者不调用的情况**（为了处理这个“痛点”你又将混入一些复杂的代码逻辑）**

**4.吞掉报错**

回调内的报错是可能被包裹回调的外部函数捕捉而不报错，**（为了处理这个“痛点”你又又又将混入一些复杂的代码逻辑）**

**5.回调根本没有被调用**

回调最大的问题是控制反转，它会导致信任链的完全断裂。正因为回调很多缺陷，ES6引入了Promise的机制。

#### 回调设计变体

回调设计存在几个变体，意在解决前面讨论的一些信任问题（不是全部）。这种试图从回调模式内部挽救它的意图是勇敢的，但却注定要失败。

有些 API 设计提供了分离回调（一个用于成功通知，一个用于出错通知）：

````javascript
function success(data) { 
 console.log( data ); 
} 
function failure(err) { 
 console.error( err ); 
} 
ajax( "http://some.url.1", success, failure ); 
````

在这种设计下，API 的出错处理函数 failure() 常常是可选的，如果没有提供的话，就是
假定这个错误可以吞掉。

还有一种常见的回调模式叫作“error-first 风格”（有时候也称为“Node 风格”，因为几乎所有 Node.js API 都采用这种风格）,其中回调的第一个参数保留用作错误对象（如果有的话）。如果成功的话，这个参数就会被清空 / 置假（后续的参数就是成功数据）。不过，如果产生了错误结果，那么第一个参数就会被置起 / 置真（通常就不会再传递其他结果）：

````javascript
function response(err,data) { 
 // 出错？
 if (err) { 
 console.error( err ); 
 } 
 // 否则认为成功
 else { 
 console.log( data ); 
 } 
} 
ajax( "http://some.url.1", response ); 
````

这两种情况下，这并没有像表面看上去那样真正解决主要的信任问题。并没有涉及阻止或过滤不想要的重复调用回调的问题。事情更糟了，因为现在你可能同时得到成功或者失败的结果，或者都没有，并且你还是不得不编码处理所有这些情况。

## promise

“回调地狱”不是真的关于函数嵌套和它们在代码编辑器中产生的缩进。从回调函数一节我们可以知道通过回调表达程序异步和管理并发的两个主要缺陷：缺乏顺序性和可信任性。**也就是无法完美表达复杂异步代码逻辑，以及控制反转导致的可靠性问题**。

promise解决信任性问题的做法：`控制反转再反转`。它不是简单地把程序将要执行的回调传给调用方，而是希望调用方向程序自身提供调用任务何时结束的能力，然后由程序自身来决定下一步的行为。应验了 CS 的名言【所有问题都可以通过加一层中间层来解决】。Promise 就充当了一个中间层，用来【把回调造成的控制反转再反转回去】。在使用 Promise 的例子中，控制流分为了两个部分：触发异步前的逻辑通过 new传入 Promise，而异步操作完成后的逻辑则传入 Promise 的 then 接口中。通过这种方式，第一方业务和第三方库的相应逻辑都由Promise 来调用，进而在 Promise 中解决异步编程中可能出现的各种问题。

Promises逆转了这个情况，它使得我们重新获得控制权。相比传递回调给第三方函数，函数返回一个promise对象，我们可以使用它来监听函数的成功或失败。Promise 这种模式通过可信任的语义把回调作为参数传递，使得这种行为更可靠更合理。通过把回调的控制反转反转回来，我们把控制权放在了一个可信任的系统（Promise）中，这种系统的设计目的就是为了使异步编码更清晰。

在promise我们仍然使用回调，但是重要的是标准的promise机制使我们可以信任它们行为的正确性。我们不需要想办法来处理这些可靠性问题。一个promises可靠性机制中很特别的部分：一个promise的状态必须是可靠并且不可变的。



### 什么是promise

未来值

**promise对象用于作为异步任务结果的占位符**。它代表了一个我们暂时还没获得但在未来有希望获得的未来值。Promise 封装了依赖于时间的状态——等待底层值的完成或拒绝，所以Promise 本身是与时间无关的。因此，Promise 可以按照可预测的方式组成（组合），而不用关心时序或底层的结果。
另外，一旦 Promise 决议，它就永远保持在这个状态。此时它就成为了不变值（immutable 
value），可以根据需求多次查看。**Promise 是一种封装和组合未来值的易于复用的机制。**

完成事件

单独的 Promise 展示了未来值的特性。但是，也可以从另外一个角度看待Promise 的决议：**一种在异步任务中作为两个或更多步骤的流程控制机制**，时序上的 this-then-that。

假定要调用一个函数 foo(..) 执行某个任务。我们不知道也不关心它的任何细节。这个函数可能立即完成任务，也可能需要一段时间才能完成。我们只需要知道 foo(..) 什么时候结束，这样就可以进行下一个任务。换句话说，我们想要通过某种方式在 foo(..) 完成的时候得到通知，以便可以继续下一步。
在典型的 JavaScript 风格中，如果需要侦听某个通知，你可能就会想到事件。因此，可以把对通知的需求重新组织为对 foo(..) 发出的一个完成事件（completion event，或continuation 事件）的侦听。

下面我们将介绍promise是如何解决回调的两个主要问题的。

### Promise 解决信任问题

回顾一下只用回调处理异步的信任问题。把一个回调传入工具 foo(..) 时可能出现如下问题：

• 调用回调过早；

• 调用回调过晚（或不被调用）；

• 调用回调次数过少或过多；

• 未能传递所需的环境和参数；

• 吞掉可能出现的错误和异常。

Promise 的特性就是专门用来为这些问题提供一个有效的可复用的答案。

#### 调用过早

这个问题主要就是担心代码是否会引入类似 Zalgo 这样的副作用（参见上文）。在这类问题中，一个任务有时同步完成，有时异步完成，这可能会导致竞态条件。根据定义，Promise 就不必担心这种问题，因为即使是立即完成的 Promise（类似于 new Promise(function(resolve){ resolve(42); })）也无法被同步观察到。
也就是说，对一个 Promise 调用 then(..) 的时候，即使这个 Promise 已经决议，提供给then(..) 的回调也总会被异步调用。不再需要插入你自己的 setTimeout(..,0) hack，Promise 会自动防止 Zalgo 出现。

#### 调用过晚

和前面一点类似，Promise 创建对象调用 resolve(..) 或 reject(..) 时，这个 Promise 的then(..) 注册的观察回调就会被自动调度。可以确信，这些被调度的回调在下一个事件循环tick上一定会被触发。
同步查看是不可能的，所以一个同步任务链无法以这种方式运行来实现按照预期有效延迟另一个回调的发生。也就是说，一个 Promise 决议后，这个 Promise 上所有的通过then(..) 注册的回调都会在下一个事件循环上依次被立即调用。这些回调中的任意一个都无法影响或延误对其他回调的调用。

#### 回调未调用

这个问题很常见，Promise 可以通过几种途径解决。首先，没有任何东西（甚至 JavaScript 错误）能阻止 Promise 向你通知它的决议（如果它决议了的话）。如果你对一个 Promise 注册了一个完成回调和一个拒绝回调，那么 Promise在决议时总是会调用其中的一个。
当然，如果你的回调函数本身包含 JavaScript 错误，那可能就会看不到你期望的结果，但实际上回调还是被调用了。后面我们会介绍如何在回调出错时得到通知，因为就连这些错误也不会被吞掉。
但是，如果 Promise 本身永远不被决议呢？即使这样，Promise 也提供了解决方案，其使用了一种称为竞态的高级抽象机制：

````javascript
// 用于超时一个Promise的工具
function timeoutPromise(delay) { 
 return new Promise( function(resolve,reject){ 
 setTimeout( function(){ 
 reject( "Timeout!" ); 
 }, delay ); 
 } ); 
} 
// 设置foo()超时
Promise.race( [ 
 foo(), // 试着开始foo() 
 timeoutPromise( 3000 ) // 给它3秒钟
] ) 
.then( 
 function(){ 
 // foo(..)及时完成！
 }, 
function(err){ 
 // 或者foo()被拒绝，或者只是没能按时完成
 // 查看err来了解是哪种情况,
 } 
); 
````

我们可以保证一个 foo() 有一个输出信号，防止其永久挂住程序。

#### 调用次数过少或过多

根据定义，回调被调用的正确次数应该是 1。“过少”的情况就是调用 0 次，和前面解释过的“未被”调用是同一种情况。
“过多”的情况很容易解释。Promise 的定义方式使得它只能被决议一次。如果出于某种原因，Promise 创建代码试图调用 resolve(..) 或 reject(..) 多次，或者试图两者都调用，那么这个 Promise 将只会接受第一次决议，并默默地忽略任何后续调用。由于 Promise 只能被决议一次，所以任何通过 then(..) 注册的（每个）回调就只会被调
用一次。
当然，如果你把同一个回调注册了不止一次（比如 p.then(f); p.then(f);），那它被调用的次数就会和注册次数相同。

#### 未能传递参数 / 环境值

Promise 至多只能有一个决议值（完成或拒绝）。如果你没有用任何值显式决议，那么这个值就是 undefined，这是 JavaScript 常见的处理方式。但不管这个值是什么，无论当前或未来，它都会被传给所有注册的（且适当的完成或拒绝）回调。
还有一点需要清楚：如果使用多个参数调用 resovle(..) 或者 reject(..)，第一个参数之后的所有参数都会被默默忽略。如果要传递多个值，必须把它们封装在单个值中传递，比如通过一个数组或对象。

#### 吞掉错误或异常

如果拒绝一个 Promise 并给出一个理由（也就是一个出错消息），这个值就会被传给拒绝回调。不过在这里还有更多的细节。如果在 Promise 的创建过程中或在查看其决议结果过程中的任何时间点上出现了一个 JavaScript 异常错误，比如一个 TypeError 或ReferenceError，那这个异常就会被捕捉，并且会使这个 Promise 被拒绝。

举例来说：

````javascript
var p = new Promise( function(resolve,reject){ 
 foo.bar(); // foo未定义，所以会出错！
 resolve( 42 ); // 永远不会到达这里 :( 
} ); 
p.then( 
 function fulfilled(){ 
 // 永远不会到达这里 :( 
 }, 
 function rejected(err){ 
 // err将会是一个TypeError异常对象来自foo.bar()这一行
 } 
); 
````

foo.bar() 中发生的 JavaScript 异常导致了 Promise 拒绝，你可以捕捉并对其作出响应。

如果 Promise 完成后在查看结果时（then(..) 注册的回调中）出现了 JavaScript 异常错误会怎样呢？即使这些异常不会被丢弃，但你会发现，对它们的处理方式还是有点出乎意料：

````javascript
var p = new Promise( function(resolve,reject){ 
 resolve( 42 ); 
} ); 
p.then( 
 function fulfilled(msg){ 
 foo.bar(); 
 console.log( msg ); // 永远不会到达这里 :( 
 }, 
 function rejected(err){
     // 永远也不会到达这里 :( 
 } 
); 
````

这看起来像是 foo.bar() 产生的异常真的被吞掉了。别担心，实际上并不是这样。但是这里有一个深藏的问题，就是我们没有侦听到它。p.then(..) 调用本身返回了另外一个 promise，正是这个 promise 将会因 TypeError 异常而被拒绝。
为什么它不是简单地调用我们定义的错误处理函数呢？如果这样的话就违背了 Promise 的一条基本原则，即 Promise 一旦决议就不可再变。p 已经完成为值 42，所以之后查看 p 的决议时，并不能因为出错就把 p 再变为一个拒绝。

**Promise链中的错误捕捉**

当处理一连串异步任务步骤的时候，任何一步都可能出现错误。我们已经知道，既可以通过then方法传递第二个回调函数，也可以链式地调用一个catch方法并向其中传入错误处理回调函数。当我们仅关心整个序列步骤的成功/失败时，为每一步都指定错误处理函数就显得很冗长乏味。所以我们可以利用catch方法：

```javascript
...catch(error => fail("An error has occurred:" + err));
```

如果错误在前面的任何一个promise中产生，catch方法就会捕捉到它。如果没发生任何错误，则程序流程只会无障碍地继续通过。

### promise解决复杂异步逻辑

#### 链式调用、异步回调的串行处理

处理一连串相互关联步骤导致的金字塔噩梦，嵌套太深将形成难以维护的回调函数序列。由于promise可以链式调用，故它也是用于解决该问题的重要一步。

这种方式可以实现的关键在于以下两个 Promise 固有行为特性：

• 每次你对 Promise 调用 then(..)，它都会创建并返回一个新的 Promise，我们可以将其链接起来；

• 在完成或拒绝处理函数内部，如果返回一个值或抛出一个异常，新返回的（可链接的）Promise 就相应地决议。

• 如果完成或拒绝处理函数返回一个 Promise，它将会被展开，这样一来，不管它的决议值是什么，都会成为当前 then(..) 返回的链接 Promise 的决议值。

如果这个 Promise 链中的某个步骤出错了怎么办？错误和异常是基于每个 Promise 的，这意味着可能在链的任意位置捕捉到这样的错误，而这个捕捉动作在某种程度上就相当于在这一位置将整条链“重置”回了正常运作：

````javascript
// 步骤1：
request( "http://some.url.1/" ) 
// 步骤2：
.then( function(response1){ 
 foo.bar(); // undefined，出错！
 // 永远不会到达这里
 return request( "http://some.url.2/?v=" + response1 ); 
} ) 
// 步骤3：
.then( 
 function fulfilled(response2){ 
 // 永远不会到达这里
 }, 
 // 捕捉错误的拒绝处理函数
 function rejected(err){ 
 console.log( err ); 
 // 来自foo.bar()的错误TypeError 
 return 42; 
 } 
) 
// 步骤4：
.then( function(msg){ 
 console.log( msg ); // 42 
} ); 
````

第 2 步出错后，第 3 步的拒绝处理函数会捕捉到这个错误。拒绝处理函数的返回值（这段代码中是 42），如果有的话，会用来完成交给下一个步骤（第 4 步）的 promise，这样，这个链现在就回到了完成状态。

#### 异步回调的并行处理

在异步序列中（Promise 链），任意时刻都只能有一个异步任务正在执行——按步骤执行。但是，如果想要同时执行两个或更多步骤（也就是“并行执行”），要怎么实现呢？

**使用 Promise.all等待多个promise**

通过使用内置方法Promise.all 可以等待多个promise。这个方法将一个promise数组作为参数，然后创建一个新的promise对象，一旦数组中的promise全部被解决，这个返回的promise就会被解决，而一旦其中有一个promise失败了，那么整个新promise对象也会立刻被拒绝，并丢弃来自其他所有 promise 的全部结果。后续的回调函数接收成功值组成的数组，数组中的每一项都对应promise数组中的对应项。

#### promise竞态

Promise.all 方法等待列表中的所有promise。但如果我们只关心第一个成功（或失败）的promise，可以认识一下Promise.race方法。

Promise.race([ .. ]) 也接受单个数组参数。这个数组由一个或多个 Promise、thenable 或立即值组成。立即值之间的竞争在实践中没有太大意义，因为显然列表中的第一个会获胜，就像赛跑中有一个选手是从终点开始比赛一样！
与 Promise.all([ .. ]) 类似，一旦有任何一个 Promise 决议为完成，Promise.race([ .. ])就会完成；一旦有任何一个 Promise 决议为拒绝，它就会拒绝。

### promise详解

语法上来说Promise是一个包含传递信息与状态的对象，拥有以下两个特点.

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有3种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

then() 方法在所有的 Promise 上都存在，并且接受两个参数。第一个参数是 Promise 被完成时要调用的函数，与异步操作关联的任何附加数据都会被传入这个完成函数。第二个参数则是 Promise 被拒绝时要调用的函数，与完成函数相似，拒绝函数会被传入与拒绝相关联的任何附加数据。
用这种方式实现 then() 方法的任何对象都被称为一个 thenable 。所有的 Promise 都是thenable ，反之则未必成立。
传递给 then() 的两个参数都是可选的，因此你可以监听完成与拒绝的任意组合形式。例如，研究这组 then() 调用：

````javascript
let promise = readFile("example.txt");
promise.then(function(contents) {
// 完成
console.log(contents);
}, function(err) {
// 拒绝
console.error(err.message);
});
promise.then(function(contents) {
// 完成
console.log(contents);
});
promise.then(null, function(err) {
// 拒绝
console.error(err.message);
});
````

这三个 then() 调用都操作在同一个 Promise 上。第一个调用同时监听了完成与失败；第二个调用只监听了完成，错误不会被报告；第三个则只监听了拒绝，并不报告成功信息。Promis 也具有一个 catch() 方法，其行为等同于只传递拒绝处理函数给 then() 。例如，以下的 catch() 与 then() 调用是功能等效的。

````javascript
promise.catch(function(err) {
// 拒绝
console.error(err.message);
});
// 等同于：
promise.then(null, function(err) {
// 拒绝
console.error(err.message);
});
````

#### 创建未决的 Promise

新的 Promise 使用 Promise 构造器来创建。此构造器接受单个参数：一个被称为执行器（executor ）的函数，包含初始化 Promise 的代码。该执行器会被传递两个名为 resolve()与 reject() 的函数作为参数。 resolve() 函数在执行器成功结束时被调用，用于示意该Promise 已经准备好被决议（ resolved ），而 reject() 函数则表明执行器的操作已失败。

promise 对象的构造语法是：

```javascript
let promise = new Promise(function(resolve, reject) {
  // executor ()
});
```

传递给 `new Promise`的函数称之为 **executor**。当 promise 被创建时，它会被自动调用。

`promise` 对象有内部属性：

- `state` —— 最初是 “pending”，然后被改为 “fulfilled” 或 “rejected”，
- `result` —— 一个任意值，最初是 `undefined`。

当 executor 完成任务时，应调用下列之一：

- `resolve(value)` —— 说明任务已经完成：
  - 将 `state` 设置为 `"fulfilled"`，
  - sets `result` to `value`。
- `reject(error)`—— 表明有错误发生：
  - 将 `state` 设置为 `"rejected"`，
  - 将 `result` 设置为 `error`。

![](https://img.amazingtm.com/201903/07105126.png-sign)

### promise的局限性

1： 顺序错误处理
一般情况下，我们都会忽略promise 的错误。
由于一个 Promise 链仅仅是连接到一起的成员 Promise，没有把整个链标识为一个个体的实体，这意味着没有外部方法可以用于观察可能发生的错误

2：单一值
根据定义，Promise 只能有一个完成值或一个拒绝理由。在简单的例子中，这不是什么问
题，但是在更复杂的场景中，你可能就会发现这是一种局限了

3：单决议

Promise 最本质的一个特征是：Promise 只能被决议一次（完成或拒绝）。在许多异步情况中，你只会获取一个值一次，所以这可以工作良好。但是，还有很多异步的情况适合另一种模式——一种类似于事件和 / 或数据流的模式。

> 支持多个异步值和多次决议的 方案有 rx.js ，下文将介绍。

4：惯性
假如你的代码都是基于回调写的，那么，你想改变成promise的方式， 怎么下手呢？最典型的栗子就是 ajax 请求。 假如你用的jq 封装的，那还好说，因为它默认支持promise 。但是，假如是其他的库，或者自己封装的代码，那还要先封装 request（） 方法。
5： 无法取消
一旦创建了一个 Promise 并为其注册了完成和 / 或拒绝处理函数，如果出现某种情况使得
这个任务悬而未决的话，你也没有办法从外部停止它的进程。
6 Promise 性能？

把基本的基于回调的异步任务链与 Promise 链中需要移动的部分数量进行比较。很显然，
Promise 进行的动作要多一些，这自然意味着它也会稍慢一些。

Promise 稍慢一些，但是作为交换，你得到的是大量内建的可信任性、对 Zalgo 的避免以及
可组合性。可能局限性实际上并不是它们的真实表现，而是你缺少发现其好处的眼光呢。

### promise 扩展

ES6 promise 的实现是强大的，但与任何软件一样，会有缺点。在一些第三方promise 实践中可提供两种扩展功能，promise 取消和进度跟踪。
#### promise 取消（Promise Canceling ）

往往一个 promise 会在进行中，但我们不再关心结果。"取消 "一个 promise 的能力，在这种情况下会很有用。一些第三方承诺库如Bluebird提供了这样的功能，甚至ECMAScript在最终被撤销之前也计划提供这样的功能（https://github.com/tc39/proposal-cancelable-promises）。一旦 promise 的封装功能正在进行，就没有办法阻止这个过程的完成。
仍然有可能实现一个临时的实现，它是原始设计的摹本。
这样的实现利用了 "cancel token"，这个概念在Kevin Smith的设计中得到了充实。草图（https://github.com/zenparsing/es-cancel-token）。cancel token 提供了一个接口，通过这个接口来取消一个 promise，以及一个 promise 钩子，用它来触发取消行为和评估取消状态。

CancelToken 类的基本实现可能如下所示。
```javascript
class CancelToken {
 constructor(cancelFn) {
 this.promise = new Promise((resolve, reject) => {
 cancelFn(resolve);
 });
 }
}

```
这个类包装了一个 promise，将 resolve 方法暴露给一个 cancelFn 参数。然后，外部实体将能够为构造函数提供一个函数，允许该实体精确控制何时取消 token。
[下面是完整示例](https://jinjun1994.github.io/example/js/cancleToken.html)
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="start">Start</button>
    <button id="cancel">Cancel</button>
    <script>
      class CancelToken {
        constructor(cancelFn) {
          this.promise = new Promise((resolve, reject) => {
            cancelFn(() => {
              setTimeout(console.log, 0, "delay cancelled");
              resolve();
            });
          });
        }
      }
      const startButton = document.querySelector("#start");
      const cancelButton = document.querySelector("#cancel");
      function cancellableDelayedResolve(delay) {
        setTimeout(console.log, 0, "set delay");

        return new Promise((resolve, reject) => {
          const id = setTimeout(() => {
            setTimeout(console.log, 0, "delayed resolve");
            resolve();
          }, delay);

          const cancelToken = new CancelToken((cancelCallback) =>
            cancelButton.addEventListener("click", cancelCallback)
          );

          cancelToken.promise.then(() => clearTimeout(id));
        });
      }
      startButton.addEventListener("click", () =>
        cancellableDelayedResolve(5000)
      );
    </script>
  </body>
</html>
```
点击开始按钮，执行 cancellableDelayedResolve 延迟5秒，5秒后 resolve ，核心是下面几行，
```javascript
 const cancelToken = new CancelToken((cancelCallback) =>
            cancelButton.addEventListener("click", cancelCallback)
          );
 constructor(cancelFn) {
          this.promise = new Promise((resolve, reject) => {
            cancelFn(() => {
              setTimeout(console.log, 0, "delay cancelled");
              resolve();
            });
          });
        }
```
创建 CancelToken 实例，将 cancelFn 函数传入构造函数，构造函数包装一个 promise ，将 resolve 作为参数函数传入 cancelFn， 再执行 cancelFn ，将 resolve 绑定到取消按钮 click 事件中。
点击取消按钮，便会解决这个 promise ，触发 ` cancelToken.promise.then(() => clearTimeout(id)); `

#### promise 进度通知（Promise Progress Notifications ）
一个进行中的承诺可能有几个离散的 "阶段"，在实际解决之前，它将通过这些阶段。在某些情况下，允许程序观察一个承诺是否达到这些检查点是很有用的。ECMAScript 6的承诺不支持这个概念，但仍然可以通过扩展一个承诺来模拟这种行为。
一个潜在的实现是用一个notify()方法来扩展Promise类，如下所示
```javascript
class TrackablePromise extends Promise {
 constructor(executor) {
  const notifyHandlers = [];
 
  super((resolve, reject) => {
 
  return executor(resolve, reject, (status) => {
    notifyHandlers.map((handler) => handler(status));
   }) ;
 });
 this.notifyHandlers = notifyHandlers; 
 }
 
 notify(notifyHandler) {
 this.notifyHandlers.push(notifyHandler);
 return this;
 }
}
```
TrackablePromise就可以在执行器中使用notify()函数。如下所示。
```javascript
let p = new TrackablePromise((resolve, reject, notify) => {
 function countdown(x) {
 if (x > 0) {
 
notify(`${20 * x}% remaining`);
 setTimeout(() => countdown(x - 1), 1000);
 } else {
 resolve();
 }
 }
 countdown(5);
}); 
p.notify((x) => setTimeout(console.log, 0, 'progress:', x));
p.then(() => setTimeout(console.log, 0, 'completed'));
// (after 1s) 80% remaining
// (after 2s) 60% remaining
// (after 3s) 40% remaining
// (after 4s) 20% remaining
// (after 5s) completed 

```
这个notify()方法被设计成可以通过返回自身来实现连锁化，并且处理程序的执行将在每次通知的基础上得到保留，如这里所示。
```javascript
p.notify((x) => setTimeout(console.log, 0, 'a:', x))
.notify((x) => setTimeout(console.log, 0, 'b:', x));
p.then(() => setTimeout(console.log, 0, 'completed'));
// (after 1s) a: 80% remaining
// (after 1s) b: 80% remaining
// (after 2s) a: 60% remaining
// (after 2s) b: 60% remaining
// (after 3s) a: 40% remaining
// (after 3s) b: 40% remaining
// (after 4s) a: 20% remaining
// (after 4s) b: 20% remaining
// (after 5s) completed 

```
ES6 promise 不具备取消或通知功能的主要原因之一是，它大大复杂了 promise 链和组合。目前还不完全清楚在以下情况下会发生什么： 取消或通知发生在有其他 promise 依赖的 promise 中。如 promise 链中。反问一下，当Promise.all()里面的 promise 取消，或者 promise 链里面的前一个 promise 发出通知的时候，什么是合理的行为？
## 生成器+promise 

回调函数一节我们提到回调的顺序性问题，同步的大脑难以理解异步逻辑，Promise 链也开始提供（尽管并不完美）以顺序的方式表达异步流的一个更好的方法，这有助于我们的大脑更好地计划和维护异步 JavaScript 代码。这个问题的一种更好的解决方案生成器+promise



### Promise
Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象
常用场景
如果遇到接口的调用参数依赖于上一个接口的返回值，我们一般会这么写promise。

```javascript
function getApi(params) {
  return new Promise((resolve) => {
    // 模拟ajax
    setTimeout(() => {
      resolve('api result: ' + params)
    }, 1000)
  })
}

getApi('start').then((res) => {
  getApi(res).then((res) => {
    getApi(res).then((res) => {
      console.log('finish', res)
    })
  })
})
```
promise的出现让异步方法可以像同步方法那样返回值，但是并没有解决回调地狱的问题，如上面的场景，接下来就该Generator出场了。

### Generator
es6新增了一种声明方式，function *

function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数(generator function)，它返回一个  Generator  对象。
生成器函数在执行时能暂停，后面又能从暂停处继续执行。

调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的迭代器 （ iterator）对象。当这个迭代器的 next() 方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现yield的位置为止，yield后紧跟迭代器要返回的值。或者如果用的是yield*（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。

next()方法返回一个对象，这个对象包含两个属性：value 和 done，value 属性表示本次 yield 表达式的返回值，done 属性为布尔类型，表示生成器后续是否还有yield语句，即生成器函数是否已经执行完毕并返回。

调用 next()方法时，如果传入了参数，那么这个参数会传给上一条执行的 yield语句左边的变量,第一次调用next()方法传入的参数会被直接丢弃。

运用生成器我们就可以这样去改造上面的例子：
用生成器函数包裹我们需要处理的语句，在yield后面跟我们需要处理的promise函数，next()后会执行到下一个yield位置然后暂停当前生成器的执行，至于恢复的时机就是这个promise执行完成(fulfilled/rejected)的时候，这时再调用next()，继续执行生成器接下来的语句，这里我们再实现一个自动运行生成器的方法。

```javascript
function getApi(params) {
  return new Promise((resolve) => {
    // 模拟ajax
    setTimeout(() => {
      resolve('api result: ' + params)
    }, 1000)
  })
}

function* gen(stage0) {
  console.log(stage0)
  let stage1 = yield getApi('startParams')
  console.log('stage1', stage1)
  let stage2 = yield getApi(stage1)
  console.log('stage2', stage2)
  let stage3 = yield getApi(stage2)
  console.log('stage3', stage3)
  return 'all Done!!'
}

function run(generator, v) {
  let { value, done } = generator.next(v)
  if (!done) {
    value.then((res) => {
      run(generator, res)
    })
  } else {
    console.log(value)
  }
}

run(gen('start'))
```
## async/await
es2017的新语法，对上面例子的改造就变成了

```javascript
function getApi(params) {
  return new Promise((resolve) => {
    // 模拟ajax
    setTimeout(() => {
      resolve('api result: ' + params)
    }, 1000)
  })
}

async function getAllApi() {
  let stage1 = await getApi('startParams')
  console.log('stage1', stage1)
  let stage2 = await getApi(stage1)
  console.log('stage2', stage2)
  let stage3 = await getApi(stage2)
  console.log('stage3', stage3)
  return 'all Done!!'
}

getAllApi()
```
所以说async/await就是generator + promise的语法糖，还自带auto run的buff

### Async/Await 并发请求
```javascript
function getApi(params) {
  return new Promise((resolve) => {
    // 模拟ajax
    setTimeout(() => {
      resolve('api result: ' + params)
    }, 1000)
  })
}

async function getApi1() {
  let stage1 = await getApi('startParams')
  console.log('stage1', 1)

}
async function getApi2() {

  let stage2 = await getApi(2)
  console.log('stage2', stage2)
}
async function getApi3() {
  let stage3 = await getApi(3)
  console.log('stage3', stage3)

}

function getAllApi(){
  getApi1()
  getApi2()
  getApi3()
}
getAllApi()
```
async/await 可以说是异步终极解决方案了。

(1) async/await 函数相对于 Promise，优势体现在：

处理 then 的调用链，能够更清晰准确的写出代码
并且也能优雅地解决回调地狱问题。
当然 async/await 函数也存在一些缺点，因为 await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低，代码没有依赖性的话，完全可以使用 Promise.all 的方式。

(2) async/await 函数对 Generator 函数的改进，体现在以下三点：

内置执行器。 Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。

更广的适用性。 co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

更好的语义。 async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。

## rxjs











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

参考文献：
《你不知道的 JavaScript》
《JavaScript 高级程序设计》第四版

[JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

<https://segmentfault.com/q/1010000000140970>

[完全理解回调函数](http://maples7.com/2017/10/17/understand-callback/)

 [事件驱动程序设计](https://zh.wikipedia.org/wiki/%E4%BA%8B%E4%BB%B6%E9%A9%85%E5%8B%95%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88)

[什么是回调函数](https://www.zhihu.com/question/19801131)

[setImmediate API demo](http://jphpsf.github.io/setImmediate-shim-demo/)

[从源码看 Promise 概念与实现](https://segmentfault.com/a/1190000015171823)
[generator，promise 与 async/await 的关系](https://segmentfault.com/a/1190000022270916)

https://rxmarbles.com/#takeWhile
[详解前端异步编程的六种方案](https://www.infoq.cn/article/zwowtega7KjC4Ad-trp4)