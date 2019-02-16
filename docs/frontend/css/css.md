---
{
title: css核心知识,
aythor: 金俊,
date: 2019/2/8
}
---



[[toc]]

## 如何学习css

如何学习css推荐这篇文章

[如何学习CSS](https://www.smashingmagazine.com/2019/01/how-to-learn-css/)

[中文版](https://juejin.im/post/5c447efa51882528735eedb2)

## 盒模型

HTML文档中的每个元素在渲染的时候都会被描绘成一个矩形盒子，而盒模型(box model)正是用来表示每个元素盒子所占用空间大小的模型。

CSS将源文档组织为元素和文本节点树，并将其呈现在画布上(例如屏幕、纸张或音频流)。为此，它生成一个中间结构，即box tree，它表示呈现的文档的格式化结构。box树中的每个box表示画布上空间和/或时间中对应的元素(或伪元素)，而box树中运行的每个文本同样表示其对应文本节点的内容。([css标准](https://www.w3.org/TR/css-display-3/#intro))

::: tip

盒模型是css的核心，css面试必问题：对CSS盒模型的认识，下面从此题了解盒模型

:::



## 对盒模型的认识

对于这个题目，我们要回答一下几个方面：

（1）基本概念：content、padding、border、[outline](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline)、margin。

（2）标准盒模型、IE盒模型的区别。不要漏说了IE盒模型，通过这个问题，可以筛选一部分人。

（3）CSS如何设置这两种模型（即：如何设置某个盒子为其中一个模型）？如果回答了上面的第二条，还会继续追问这一条。

（4）JS如何设置、获取盒模型对应的宽和高？这一步，已经有很多人答不上来了。

（5）实例题：根据盒模型解释**边距重叠**。

前四个方面是逐渐递增，第五个方面，却鲜有人知。

（6）BFC（边距重叠解决方案）或IFC。

如果能回答第五条，就会引出第六条。BFC是面试频率较高的。

**总结**：以上几点，从上到下，知识点逐渐递增，知识面从理论、CSS、JS，又回到CSS理论。

接下来，我们把上面的六条，依次讲解。

### 一、基本概念

CSS假设每个元素生成一个或多个矩形框，称为元素框。

每个元素框的中心都有一个内容区域。这个内容区域被可选的内边距、边框、轮廓线和外边距包围。这些区域被认为是可选的，因为它们都可以设置为宽度为0，从而有效地将它们从元素框中移除。

下图显示了一个示例。默认情况下，颜色或平铺图像的内容背景应用于内边距。外边距总是透明的，允许任何父元素的背景都是可见的。内边距不能有负的长度，但是边距可以。我们将在后面探讨负外边距的影响。

![](http://img.dubiqc.com/201902/16162258.png-sign)

每个边距、边框和填充都可以使用各种特定于边的属性(如 margin-left or border-bottom)以及缩写属性(如`{padding:  }`)进行设置。轮廓没有特定于边的属性。标准盒模型如下图所示：

![标准盒模型](http://img.dubiqc.com/201902/16164226.png-sign)

::: tip

[CSS](https://developer.mozilla.org/en-US/docs/CSS)的`outline`属性是用来设置一个或多个单独的轮廓属性的[简写属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties) ， 例如 [`outline-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline-style), [`outline-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline-width) 和 [`outline-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline-color)。 多数情况下，简写属性更加可取和便捷。

轮廓与边框在以下几个方面存在不同：

- 轮廓不占据空间，它们被描绘于内容之上
- 轮廓可以是非矩形的。在Gecko/Firefox中，轮廓是矩形的，但是Opera则会围绕元素结构绘制非矩形的形状

:::

###  二、标准盒模型、IE盒模型的区别

- 在 **标准盒子模型**中，**width 和 height 指的是内容区域**的宽度和高度。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。

- **IE盒子模型**中，**width 和 height 指的是内容区域+border+padding**的宽度和高度。


###  三、CSS如何设置这两种模型

代码如下：

```css
    /* 设置当前盒子为 标准盒模型（默认） */
    box-sizing: content-box;

    /* 设置当前盒子为 IE盒模型 */
    box-sizing: border-box;
```

备注：盒子默认为标准盒模型。

::: tip

`padding-box`

[`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 属性包括内容和内边距，但是不包括边框和外边距。只有Firefox实现了这个值，它在Firefox 50中被删除。

:::

###  四、JS如何设置、获取盒模型对应的宽和高

##### 方式一：通过DOM节点的 style 样式获取

```javascript
	element.style.width/height;
```

缺点：通过这种方式，只能获取**行内样式**，不能获取`内嵌`的样式和`外链`的样式。

这种方式有局限性，但应该了解。

##### 方式二（通用型）

```javascript
    window.getComputedStyle(element).width/height;
```

方式二能兼容 Chrome、火狐。是通用型方式。

##### 方式三（IE独有的）

```javascript
	element.currentStyle.width/height;
```

和方式二相同，但这种方式只有IE独有。获取到的即时运行完之后的宽高（三种css样式都可以获取）。

##### 方式四

```javascript
	element.getBoundingClientRect().width/height;
```

此 api 的作用是：获取一个元素的绝对位置。绝对位置是视窗 viewport 左上角的绝对位置。

此 api 可以拿到四个属性：left、top、width、height。

**总结：**

上面的四种方式，要求能说出来区别，以及哪个的通用型更强。

### 五、垂直边距重叠

margin的collapse是CSS1就有的。见此： 

http://www.w3.org/TR/CSS1/#vertical-formatting

摘录如下：

> The width of the margin on non-floating block-level elements specifies the **minimum distance** to the edges of surrounding boxes. Two or more adjoining vertical margins (i.e., with no border, padding or content between them) are collapsed to use the maximum of the margin values. In most cases, after collapsing the vertical margins the result is visually more pleasing and closer to what the **designer expects**. 
>
> 非浮动块级元素上的空白宽度指定到周围框边缘的最小距离。两个或多个相邻的垂直边距(它们之间没有边框、填充或内容)被折叠以使用边距值的最大值。
>
> 在大多数情况下，在折叠垂直边距之后，结果在视觉上更令人愉悦，更接近设计师的预期

可见这个特性应是源自传统排版，目的是指定段落的最小间距。

**标准文档流中，竖直方向的margin不叠加，只取较大的值作为margin**(水平方向的margin是可以叠加的，即水平方向没有塌陷现象)。

::: tip

如果不在标准流，比如盒子都浮动了，那么两个盒子之间是没有margin重叠的现象的。

:::

## BFC IFC GFC FFC

在解释 BFC 是什么之前，需要先介绍 Box、Formatting Context的概念。

###  Box: CSS布局的基本单位

　　Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：

- block-level box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；
- inline-level box:display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；
- run-in box: css3 中才有， 这儿先不讲了。

### Formatting context

　　Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

　　CSS2.1 中只有 `BFC `和 `IFC`, **CSS3** 中还增加了 `GFC `和 `FFC。`

### BFC 定义

　　BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

#### BFC布局规则：

1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算

### 哪些元素会生成BFC?

下列方式会创建[块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)：

- 根元素或包含根元素的元素
- 浮动元素（元素的 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 不是 `none`）
- 绝对定位元素（元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 为 `absolute` 或 `fixed`）
- 行内块元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `inline-block`）
- 表格单元格（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `table-cell`，HTML表格单元格默认为该值）
- 表格标题（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-caption`，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `table、``table-row`、 `table-row-group、``table-header-group、``table-footer-group`（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 `inline-table`）
- [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 值不为 `visible` 的块元素
- [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
- [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content`或 `strict` 的元素
- 弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `flex` 或 `inline-flex`元素的直接子元素）
- 网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-width) 不为 `auto，包括 ``column-count` 为 `1`）
- `column-span` 为 `all` 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（[标准变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)，[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)）。

其实以上的几个例子都体现了，`BFC`就是页面上的一个**隔离的独立容器**，容器里面的子元素不会影响到外面的元素。反之也如此。

 `IFC`(`Inline Formatting Contexts`)直译为"内联格式化上下文"，`IFC`的`line box`（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的`padding/margin`影响)

 `FFC`(`Flex Formatting Contexts`)直译为"自适应格式化上下文"，`display`值为`flex`或者`inline-flex`的元素将会生成自适应容器（`flex container`）

 `GFC`(`GridLayout Formatting Contexts`)直译为"网格布局格式化上下文"，当为一个元素设置`display`值为`grid`的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（`grid container`）上定义网格定义行（`grid definition rows`）和网格定义列（`grid definition columns`）属性各在网格项目（`grid item`）上定义网格行（`grid row`）和网格列（`grid columns`）为每一个网格项目（`grid item`）定义位置和空间。





参考链接：

- [前端精选文摘：BFC 神奇背后的原理](https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)

## css选择器

**CSS 选择器**规定了 CSS 规则会应用到哪些元素上。

### 基本选择器

- [Type（类型）选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors)

  这种基本选择器会选择所有匹配给定元素名的元素。 

  **语法：**`elename` 

  **例子：**input 将会选择所有的`<input>` 素。

- [Class（类）选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors)

  这种基本选择器会基于类属性的值来选择元素。 

  **语法：** `.classname` 

  **例子：** `.index` 会匹配所有包含 `index 类的元素` (由类似于`class="index"`这样的属性定义的).

- [ID选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors)

  这种基本选择器会选择所有id属性与之匹配的元素。需要注意的是一个文档中每个id都应该是唯一的。 

  **语法：**`#idname` 

  **例子：**`#toc` 将会匹配所有id属性为 toc 的元素 (类似于这样的定义 `id="toc"`).

- [通用选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors)

  这个基本选择器选择所有节点。它也常常和一个名词空间配合使用，用来选择该空间下的所有元素。 

  **语法：** `* ns|* *|*` 

  **例子：**`*` （通配符）将会选择所有元素。

- [属性选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)

  这个基本的选择器根据元素的属性来进行选择。 

  **语法：**`[attr] [attr=value] [attr~=value] [attr|=value] [attr^=value] [attr$=value] [attr*=value]` 

  **例子：**`[autoplay]` 将会选择所有具有 autoplay 属性的元素（不论这个属性的值是什么）

### 组合选择器

- [紧邻兄弟选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_selectors)

  `'+'` 操作符选择相邻元素，即第二个节点紧邻着第一个节点，并且拥有共同的父节点。 

  **语法:** `A + B` 

  **例子:** `ul + li` 会匹配任何 `ul` 元素后紧邻的 `li` 元素。

- [一般兄弟选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_selectors)

  `'~'` 操作符选择兄弟元素，也就是说，第二个节点在第一个节点后面的任意位置，并且这俩节点的父节点相同。 

  **语法:** `A ~ B` **例子:** `p ~ span` 将会匹配同一父元素下，`<p>` 元素后的所有 `<span>` 元素。

- [子选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_selectors)

  `'>'` 操作符选择第一个元素的直接子节点。

   **语法:** `A > B` 

  **例子:** `ul > li` 将会匹配直接嵌套在 `<ul>` 元素内的所有 `<li>` 元素。

- [后代选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors)

  `' '`  (空格) 操作符将选择第一个元素的子代节点。

   **语法:** `A B` 

  **例子:** `div span` 将匹配`<div>` 元素内所有的 `<span>` 元素。

### 伪类

[伪类](<https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes>) **允许基于未包含在文档树中的状态信息来选择元素。**

CSS **伪类** 是添加到选择器的关键字，指定要选择的元素的特殊状态。例如，[`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover) 可被用于在用户将鼠标悬停在按钮上时改变按钮的颜色。

#### [标准伪类索引](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes#%E6%A0%87%E5%87%86%E4%BC%AA%E7%B1%BB%E7%B4%A2%E5%BC%95)

像普通的类一样，你可以在一个选择器中按需连用多个伪类。

- [`:active`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active)
- [`:any`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:any)
- [`:any-link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:any-link)
- [`:checked`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:checked)
- [`:default`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:default)
- [`:defined`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:defined)
- [`:dir()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:dir)
- [`:disabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:disabled)
- [`:empty`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:empty)
- [`:enabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:enabled)
- [`:first`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first)
- [`:first-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child)
- [`:first-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-of-type)
- [`:fullscreen`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:fullscreen)
- [`:focus`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus)
- [`:focus-visible`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-visible)
- [`:host`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:host)
- [`:host()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:host())
- [`:host-context()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:host-context())
- [`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover)
- [`:indeterminate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:indeterminate)
- [`:in-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:in-range)
- [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid)
- [`:lang()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:lang)
- [`:last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child)
- [`:last-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-of-type)
- [`:left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:left)
- [`:link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:link)
- [`:not()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)
- [`:nth-child()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child)
- [`:nth-last-child()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-child)
- [`:nth-last-of-type()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-of-type)
- [`:nth-of-type()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type)
- [`:only-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-child)
- [`:only-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-of-type)
- [`:optional`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:optional)
- [`:out-of-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:out-of-range)
- [`:read-only`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-only)
- [`:read-write`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-write)
- [`:required`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:required)
- [`:right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:right)
- [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)
- [`:scope`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope)
- [`:target`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:target)
- [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid)
- [`:visited`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:visited)

### 伪元素

- [伪元素](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) 表示所有未被包含在HTML的实体。

  就像 [pseudo classes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) (伪类)一样， 伪元素添加到选择器，但不是描述特殊状态，它们允许您为元素的某些部分设置样式。 下例中的 [`::first-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line)  伪元素改变段落第一行的文字样式。

  ```css
  /* The first line of every <p> element. */
  p::first-line {
    color: blue;
    text-transform: uppercase;
  }
  ```

#### 语法

```css
selector::pseudo-element { property: value; }
```

#### 所有伪元素

::: tip

使用after、before可减少dom数量，提升性能

:::



- [`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)
- [`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before)
- [`::first-letter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter)
- [`::first-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line)
- [`::selection`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection)

**试验性_内嵌**

- [`::backdrop`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::backdrop) 
- [`::placeholder`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::placeholder) 
- [`::marker`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::marker) 
- [`::spelling-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::spelling-error) 
- [`::grammar-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::grammar-error)   

## css布局

从例题实战学习css布局：假设高度默认100px ，请写出三栏布局，其中左栏、右栏各为300px，中间自适应。

主要有以下五种

- 方法1：浮动
- 方法2：绝对定位。

- 方法3：flexbox。移动开发里经常用到。
- 方法4：表格布局 table。虽然已经淘汰了，但也应该了解。
- 方法5：网格布局 grid。







<div :class="">  
    </div>  



<script>
export default {
  props: ['slot-key'],
  mounted () {
 console.log(this.a)
  }
}
</script>




## css核心技巧

 css分层理论 

 双飞翼布局

布局方式

### reset选择

reset.css(重置) 、[normalize.css](https://github.com/necolas/normalize.css)（修复）、[Neat.css](https://thx.github.io/cube/doc/neat#neatcss-)（融合）

项目开始引入neat.css

### reset.css

为什么会有`CSS Reset`的存在呢？那是因为早期的浏览器支持和理解的CSS规范不同，导致渲染页面时效果不一致，会出现很多兼容性问题。 关于 [浏览器的默认样式](http://www.w3cfuns.com/topic-12.html) 请点击查阅！

根据玉伯的文章中透漏，最早的一份`CSS Reset`来自Tantek 的[undohtml.css](http://tantek.com/log/2004/undohtml.css)，从URL中的日期可以看出时间是2004年，Tantek根据自身需要对于一些标签进行了简单的重置，源码如下：

```
/* undohtml.css */
/* (CC) 2004 Tantek Celik. Some Rights Reserved.             */
:link,:visited { text-decoration:none }
ul,ol { list-style:none }
h1,h2,h3,h4,h5,h6,pre,code { font-size:1em; }
ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,body,html,p,blockquote,
fieldset,input{ margin:0; padding:0 }
a img,:link img,:visited img { border:none }
address { font-style:normal }
```

#### 核心代码与作用

随后加入到`CSS Reset`的行列的大牛越来越多，比如业界领袖 [YUI团队](http://yui.github.io/yui2/) 以及[Eric Meyer](http://meyerweb.com/eric/tools/css/reset/index.html)把这份代码内容变的更加充实，但是不难发现代码的核心部分还是对样式进行重置，在此可以结论出早期的`CSS Reset`的作用就是清除所有浏览器默认样式，让它一切归零！

```
* { margin:0; padding:0 }
```

不过在此之后一段时间内，有人开始批判这种暴力清零的`CSS Reset`方式，随后部分前端开发者们也传来一些争议声音，比如：

1. `*{ margin:0; padding:0; }`会带来性能问题
2. 使用通配符存在隐性问题
3. 过渡的标签重置等于画蛇添足
4. 过渡的标签重置导致语言元素失效

reset是革命党，normalize是改良派。reset的方针就是都tm给我脱光光，老子今天要翻牌。什么豹纹，蕾丝，美颜相机统统给我拿掉，老子读书少，都别骗我。于是，一个个屌丝心中的女神都重拾了素颜，但回到本真又能怎样？那两厘米的粉底不都是为了你？于是，在旁边的normalize看不下去了。它主张生活不必处处追求真实，有时应该睁一只眼，闭一只眼。

### normalize

normalize.css是一个现代的，为HTML5准备的reset.css的替代品。它可以使元素的渲染在多个浏览器下都能保持一致并且符合规范。它所瞄准的，也都是些需要规范化的样式。

#### Normalize.css的目标

1. 保留有用的浏览器默认样式，而不是一概将它们“抹杀”。
2. normalize.css作用在范围更广的元素上面。
3. 修正了一些bug及主流浏览器在渲染上的不一致。
4. 提高了可用性。
5. 用更加详细的文档及注释来解释代码的含义。

normalize.css支持更多的浏览器（包括手机端），同样也包括规范的HTML5元素，排版，列表，内嵌内容（embed），表单及表格的css。

####  normalize VS reset

- **normalize.css保存了部分可用的默认样式**

reset.css为几乎所有元素统一了样式风格，但normalize保存了一些有用的默认样式，这样你就不用再对一些公共的排版元素重新声明样式。比如ul元素的margin。

- **normalize.css修复了一些bug**

normalize修复了一些常见的PC端及移动端的bug，这往往超出了reset的能力范围，这里包括了HTML5元素的显示设置，修正了预格式化文本的字体问题，在IE9上的SVG overflow 问题以及不同浏览器和操作系统与表单之间的问题。

- **normalize.css不会使你的调试工具混乱**

在页面中调试样式的时候，如果使用了reset.css，在样式调试区域就会出现大量的继承属性链，但normalize.css并不会出现这个问题，因为它的样式规则使用的是具有针对性的样式及相对保守的使用多重选择器。

- **normalize.css可以模块化**

normalize 可以被分成多个独立的部分，也就是说你可以指定你自己需要的默认样式，同时，你的项目不需要哪些样式，可以对其进行删除。

- **normalize提供了大量的文档**

normalize的代码基于非常细致的跨浏览器的研究和系统的测试，在 <https://github.com/necolas/normalize.css> 上面提供了详细的注释，这样你就能知道每行代码做了什么，为啥它会被包含进来，以及浏览器之间的差异，还有就是更容易你自己去进行测试。

### Neat.css

[Neat.css](https://thx.github.io/cube/) 是基于[normalize](https://github.com/necolas/normalize.css)的全新的 CSS Reset，兼容 IE 6+ 以及其他现代浏览器。

「normalize」的核心理念是不盲目重置为0，让元素拥有统一的默认间距，大小等表现。但针对国内大部分网站不是纯文字排版，Neat.css 选择回归「有即是无，无即是有」的理念，把大部分标签的默认`margin`，`padding` 均重置为 0。如果你需要对大面积文字或者文档快速美化，推荐单独引入专门针对汉字排版的[`type.css`](https://thx.github.io/cube/doc/neat#)。

#### Neat.css 解决的问题

1. 解决Bug，特别是低级浏览器的常见Bug。
2. 统一效果，但不盲目追求重置为0。
3. 向后兼容。
4. 考虑响应式。
5. 考虑移动设备。
6. 跨平台最佳font family

### css icon

<https://icomoon.io/>

<https://cssicon.space/#/>

<https://www.iconfont.cn/>

### css hint css lint

规范css代码书写

[csshint](https://www.npmjs.com/package/csshint)

[Hint.css](https://kushagragour.in/lab/hint/)

## css3d

### 陀螺仪

 [CSS动画之旋转魔方轮播](https://juejin.im/post/5ae1a75a6fb9a07ac3632c8c)

[3d魔方](http://jqsite.com/notes/1603085523.html)



## css与性能优化

## css未来

<https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate>

## css库

#### parallax*.js**parallax*.*js* 是一款简单，轻量级的视差效果生成器，可以对智能设备点击运动的方向作出反应，不需要任何识别方向，检测位置的设备，只需要游标（鼠标运动的方向等）