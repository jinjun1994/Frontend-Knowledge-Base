(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{91:function(e,a,t){"use strict";t.r(a);var s=t(3),r=Object(s.a)({},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"git-log-高级用法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#git-log-高级用法","aria-hidden":"true"}},[e._v("#")]),e._v(" Git log 高级用法")]),e._v(" "),t("blockquote",[t("p",[e._v("BY 童仲毅（"),t("a",{attrs:{href:"https://github.com/geeeeeeeeek/git-recipes/",target:"_blank",rel:"noopener noreferrer"}},[e._v("geeeeeeeeek@github"),t("OutboundLink")],1),e._v("）")]),e._v(" "),t("p",[e._v("这是一篇在"),t("a",{attrs:{href:"https://www.atlassian.com/git/tutorials/git-log",target:"_blank",rel:"noopener noreferrer"}},[e._v("原文（BY atlassian）"),t("OutboundLink")],1),e._v("基础上演绎的译文。除非另行注明，页面上所有内容采用知识共享-署名（"),t("a",{attrs:{href:"http://creativecommons.org/licenses/by/2.5/au/deed.zh",target:"_blank",rel:"noopener noreferrer"}},[e._v("CC BY 2.5 AU"),t("OutboundLink")],1),e._v("）协议共享。")])]),e._v(" "),t("p",[e._v("每一个版本控制系统的出现都是为了让你记录代码的变化。你可以看到项目的历史记录——谁贡献了什么、bug 是什么时候引入的，还可以撤回有问题的更改。但是，首先你得知道如何使用它。这也就是为什么会有 "),t("code",[e._v("git log")]),e._v(" 这个命令。")]),e._v(" "),t("p",[e._v("到现在为止，你应该已经知道如何用 "),t("code",[e._v("git log")]),e._v(" 命令来显示最基本的提交信息。但除此之外，你还可以传入各种不同的参数来获得不一样的输出。")]),e._v(" "),t("p",[t("code",[e._v("git log")]),e._v(" 有两个高级用法：一是自定义提交的输出格式，二是过滤输出哪些提交。这两个用法合二为一，你就可以找到你项目中你需要的任何信息。")]),e._v(" "),t("h2",{attrs:{id:"格式化-log-输出"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#格式化-log-输出","aria-hidden":"true"}},[e._v("#")]),e._v(" 格式化 Log 输出")]),e._v(" "),t("p",[e._v("首先，这篇文章会展示几种 "),t("code",[e._v("git log")]),e._v(" 格式化输出的例子。大多数例子只是通过标记向 "),t("code",[e._v("git log")]),e._v(" 请求或多或少的信息。")]),e._v(" "),t("p",[e._v("如果你不喜欢默认的 "),t("code",[e._v("git log")]),e._v(" 格式，你可以用 "),t("code",[e._v("git config")]),e._v(" 的别名功能来给你想要的格式创建一个快捷方式。")]),e._v(" "),t("h3",{attrs:{id:"oneline"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#oneline","aria-hidden":"true"}},[e._v("#")]),e._v(" Oneline")]),e._v(" "),t("p",[t("code",[e._v("--oneline")]),e._v(" 标记把每一个提交压缩到了一行中。它默认只显示提交ID和提交信息的第一行。"),t("code",[e._v("git log --oneline")]),e._v(" 的输出一般是这样的：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("0e25143 Merge branch 'feature'\nad8621a Fix a bug in the feature\n16b36c6 Add a new feature\n23ad9ad Add the initial code base\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br")])]),t("p",[e._v("它对于获得项目的总体情况很有帮助。")]),e._v(" "),t("h3",{attrs:{id:"decorate"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#decorate","aria-hidden":"true"}},[e._v("#")]),e._v(" Decorate")]),e._v(" "),t("p",[e._v("很多时候，知道每个提交关联的分支或者标签很有用。"),t("code",[e._v("--decorate")]),e._v(" 标记让 "),t("code",[e._v("git log")]),e._v(" 显示指向这个提交的所有引用（比如说分支、标签等）。")]),e._v(" "),t("p",[e._v("这可以和另一个配置项一起使用。比如，执行 "),t("code",[e._v("git log --oneline --decorate")]),e._v(" 会将提交历史格式化成这样：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("0e25143 (HEAD, master) Merge branch 'feature'\nad8621a (feature) Fix a bug in the feature\n16b36c6 Add a new feature\n23ad9ad (tag: v0.9) Add the initial code base\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br")])]),t("p",[e._v("在这个例子中，你（通过HEAD标记）可以看到最上面那个提交已经被 checkout 了，而且它还是 master 分支的尾端。第二个提交有另一个 feature 分支指向它，以及最后那个提交带有 v0.9 标签。")]),e._v(" "),t("p",[e._v("分支、标签、HEAD 还有提交历史是你 Git 仓库中包含的所有信息。因此，这个命令让你更完整地观察项目结构。")]),e._v(" "),t("h3",{attrs:{id:"diff"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#diff","aria-hidden":"true"}},[e._v("#")]),e._v(" Diff")]),e._v(" "),t("p",[t("code",[e._v("git log")]),e._v(" 提供了很多选项来显示两个提交之间的差异。其中最常用的两个是 "),t("code",[e._v("--stat")]),e._v(" 和 "),t("code",[e._v("-p")]),e._v("。")]),e._v(" "),t("p",[t("code",[e._v("--stat")]),e._v(" 选项显示每次提交的文件增删数量（注意：修改一行记作增加一行且删去一行），当你想要查看提交引入的变化时这会非常有用。比如说，下面这个提交在 hello.py 文件中增加了 67 行，删去了 38 行。")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("commit f2a238924e89ca1d4947662928218a06d39068c3\nAuthor: John <john@example.com>\nDate:   Fri Jun 25 17:30:28 2014 -0500\n\n    Add a new feature\n\n hello.py | 105 ++++++++++++++++++++++++-----------------\n 1 file changed, 67 insertion(+), 38 deletions(-)\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br"),t("span",{staticClass:"line-number"},[e._v("8")]),t("br")])]),t("p",[e._v("文件名后面+和-的数量是这个提交造成的更改中增删的相对比例。它给你一个直观的感觉，关于这次提交有多少改动。如果你想知道每次提交删改的绝对数量，你可以将 "),t("code",[e._v("-p")]),e._v(" 选项传入"),t("code",[e._v("git log")]),e._v("。这样提交所有的删改都会被输出：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('commit 16b36c697eb2d24302f89aa22d9170dfe609855b\nAuthor: Mary <mary@example.com>\nDate:   Fri Jun 25 17:31:57 2014 -0500\n\n    Fix a bug in the feature\n\ndiff --git a/hello.py b/hello.py\nindex 18ca709..c673b40 100644\n--- a/hello.py\n+++ b/hello.py\n@@ -13,14 +13,14 @@ B\n-print("Hello, World!")\n+print("Hello, Git!")\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br"),t("span",{staticClass:"line-number"},[e._v("8")]),t("br"),t("span",{staticClass:"line-number"},[e._v("9")]),t("br"),t("span",{staticClass:"line-number"},[e._v("10")]),t("br"),t("span",{staticClass:"line-number"},[e._v("11")]),t("br"),t("span",{staticClass:"line-number"},[e._v("12")]),t("br"),t("span",{staticClass:"line-number"},[e._v("13")]),t("br")])]),t("p",[e._v("对于改动很多的提交来说，这个输出会变得又长又大。一般来说，当你输出所有删改的时候，你是想要查找某一具体的改动，这时你就要用到 "),t("code",[e._v("pickaxe")]),e._v(" 选项。")]),e._v(" "),t("h3",{attrs:{id:"shortlog"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#shortlog","aria-hidden":"true"}},[e._v("#")]),e._v(" Shortlog")]),e._v(" "),t("p",[t("code",[e._v("git shortlog")]),e._v(" 是一种特殊的 "),t("code",[e._v("git log")]),e._v("，它是为创建发布声明设计的。它把每个提交按作者分类，显示提交信息的第一行。这样可以容易地看到谁做了什么。")]),e._v(" "),t("p",[e._v("比如说，两个开发者为项目贡献了 5 个提交，那么 "),t("code",[e._v("git shortlog")]),e._v(" 输出会是这样的：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Mary (2):\n      Fix a bug in the feature\n      Fix a serious security hole in our framework\n\nJohn (3):\n      Add the initial code base\n      Add a new feature\n      Merge branch 'feature'\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br"),t("span",{staticClass:"line-number"},[e._v("8")]),t("br")])]),t("p",[e._v("默认情况下，"),t("code",[e._v("git shortlog")]),e._v(" 把输出按作者名字排序，但你可以传入 "),t("code",[e._v("-n")]),e._v(" 选项来按每个作者提交数量排序。")]),e._v(" "),t("h3",{attrs:{id:"graph"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#graph","aria-hidden":"true"}},[e._v("#")]),e._v(" Graph")]),e._v(" "),t("p",[t("code",[e._v("--graph")]),e._v(" 选项绘制一个 ASCII 图像来展示提交历史的分支结构。它经常和 "),t("code",[e._v("--oneline")]),e._v(" 和 "),t("code",[e._v("--decorate")]),e._v(" 两个选项一起使用，这样会更容易查看哪个提交属于哪个分支：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git log --graph --oneline --decorate\nFor a simple repository with just 2 branches, this will produce the following:\n\n*   0e25143 (HEAD, master) Merge branch 'feature'\n|\\  \n| * 16b36c6 Fix a bug in the new feature\n| * 23ad9ad Start a new feature\n* | ad8621a Fix a critical security issue\n|/  \n* 400e4b7 Fix typos in the documentation\n* 160e224 Add the initial code base\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br"),t("span",{staticClass:"line-number"},[e._v("8")]),t("br"),t("span",{staticClass:"line-number"},[e._v("9")]),t("br"),t("span",{staticClass:"line-number"},[e._v("10")]),t("br"),t("span",{staticClass:"line-number"},[e._v("11")]),t("br")])]),t("p",[e._v("星号表明这个提交所在的分支，所以上图的意思是 "),t("code",[e._v("23ad9ad")]),e._v(" 和 "),t("code",[e._v("16b36c6")]),e._v(" 这两个提交在 topic 分支上，其余的在 master 分支上。")]),e._v(" "),t("p",[e._v("虽然这对简单的项目来说是个很好用的选择，但你可能会更喜欢 gitk 或 SourceTree 这些更强大的可视化工具来分析大型项目。")]),e._v(" "),t("h3",{attrs:{id:"自定义格式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自定义格式","aria-hidden":"true"}},[e._v("#")]),e._v(" 自定义格式")]),e._v(" "),t("p",[e._v("对于其他的 "),t("code",[e._v("git log")]),e._v(" 格式需求，你都可以使用 "),t("code",[e._v('--pretty=format:"<string>"')]),e._v(" 选项。它允许你使用像 printf 一样的占位符来输出提交。")]),e._v(" "),t("p",[e._v("比如，下面命令中的 "),t("code",[e._v("%cn")]),e._v("、"),t("code",[e._v("%h")]),e._v(" 和 "),t("code",[e._v("%cd")]),e._v(" 这三种占位符会被分别替换为作者名字、缩略标识和提交日期。")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('git log --pretty=format:"%cn committed %h on %cd"\nThis results in the following format for each commit:\n\nJohn committed 400e4b7 on Fri Jun 24 12:30:04 2014 -0500\nJohn committed 89ab2cf on Thu Jun 23 17:09:42 2014 -0500\nMary committed 180e223 on Wed Jun 22 17:21:19 2014 -0500\nJohn committed f12ca28 on Wed Jun 22 13:50:31 2014 -0500\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br")])]),t("p",[e._v("完整的占位符清单可以在文档中找到。")]),e._v(" "),t("p",[e._v("除了让你只看到关注的信息，这个 "),t("code",[e._v('--pretty=format:"<string>"')]),e._v(" 选项在你想要在另一个命令中使用日志内容是尤为有用的。")]),e._v(" "),t("h2",{attrs:{id:"过滤提交历史"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#过滤提交历史","aria-hidden":"true"}},[e._v("#")]),e._v(" 过滤提交历史")]),e._v(" "),t("p",[e._v("格式化提交输出只是 "),t("code",[e._v("git log")]),e._v(" 其中的一个用途。另一半是理解如何浏览整个提交历史。接下来的文章会介绍如何用 "),t("code",[e._v("git log")]),e._v(" 选择项目历史中的特定提交。所有的用法都可以和上面讨论过的格式化选项结合起来。")]),e._v(" "),t("h3",{attrs:{id:"按数量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#按数量","aria-hidden":"true"}},[e._v("#")]),e._v(" 按数量")]),e._v(" "),t("p",[t("code",[e._v("git log")]),e._v(" 最基础的过滤选项是限制显示的提交数量。当你只对最近几次提交感兴趣时，它可以节省你一页一页查看的时间。")]),e._v(" "),t("p",[e._v("你可以在后面加上 "),t("code",[e._v("-<n>")]),e._v(" 选项。比如说，下面这个命令会显示最新的 3 次提交：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git log -3\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("h3",{attrs:{id:"按日期"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#按日期","aria-hidden":"true"}},[e._v("#")]),e._v(" 按日期")]),e._v(" "),t("p",[e._v("如果你想要查看某一特定时间段内的提交，你可以使用 "),t("code",[e._v("--after")]),e._v(" 或 "),t("code",[e._v("--before")]),e._v(" 标记来按日期筛选。它们都接受好几种日期格式作为参数。比如说，下面的命令会显示 2014 年 7 月 1 日后（含）的提交：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('git log --after="2014-7-1"\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("你也可以传入相对的日期，比如一周前（"),t("code",[e._v('"1 week ago"')]),e._v("）或者昨天（"),t("code",[e._v('"yesterday"')]),e._v("）：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('get log --after="yesterday"\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("你可以同时提供"),t("code",[e._v("--before")]),e._v(" 和 "),t("code",[e._v("--after")]),e._v(" 来检索两个日期之间的提交。比如，为了显示 2014 年 7 月 1 日到 2014 年 7 月 4 日之间的提交，你可以这么写：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('git log --after="2014-7-1" --before="2014-7-4"\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("注意 "),t("code",[e._v("--since")]),e._v("、"),t("code",[e._v("--until")]),e._v(" 标记和 "),t("code",[e._v("--after")]),e._v("、"),t("code",[e._v("--before")]),e._v(" 标记分别是等价的。")]),e._v(" "),t("h3",{attrs:{id:"按作者"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#按作者","aria-hidden":"true"}},[e._v("#")]),e._v(" 按作者")]),e._v(" "),t("p",[e._v("当你只想看某一特定作者的提交的时候，你可以使用 "),t("code",[e._v("--author")]),e._v(" 标记。它接受正则表达式，返回所有作者名字满足这个规则的提交。如果你知道那个作者的确切名字你可以直接传入文本字符串：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('git log --author="John"\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("它会显示所有作者叫 John 的提交。作者名不一定是全匹配，只要包含那个子串就会匹配。")]),e._v(" "),t("p",[e._v("你也可以用正则表达式来创建更复杂的检索。比如，下面这个命令检索名叫 Mary 或 John 的作者的提交。")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('git log --author="John\\|Mary"\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("注意作者的邮箱地址也算作是作者的名字，所以你也可以用这个选项来按邮箱检索。")]),e._v(" "),t("p",[e._v("如果你的工作流区分提交者和作者，"),t("code",[e._v("--committer")]),e._v(" 也能以相同的方式使用。")]),e._v(" "),t("h3",{attrs:{id:"按提交信息"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#按提交信息","aria-hidden":"true"}},[e._v("#")]),e._v(" 按提交信息")]),e._v(" "),t("p",[e._v("按提交信息来过滤提交，你可以使用 "),t("code",[e._v("--grep")]),e._v(" 标记。它和上面的 "),t("code",[e._v("--author")]),e._v(" 标记差不多，只不过它搜索的是提交信息而不是作者。")]),e._v(" "),t("p",[e._v("比如说，你的团队规范要求在提交信息中包括相关的issue编号，你可以用下面这个命令来显示这个 issue 相关的所有提交：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('git log --grep="JRA-224:"\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("你也可以传入 "),t("code",[e._v("-i")]),e._v(" 参数来忽略大小写匹配。")]),e._v(" "),t("h3",{attrs:{id:"按文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#按文件","aria-hidden":"true"}},[e._v("#")]),e._v(" 按文件")]),e._v(" "),t("p",[e._v("很多时候，你只对某个特定文件的更改感兴趣。为了显示某个特定文件的历史，你只需要传入文件路径。比如说，下面这个命令返回所有和 "),t("code",[e._v("foo.py")]),e._v(" 和 "),t("code",[e._v("bar.py")]),e._v(" 文件相关的提交：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git log -- foo.py bar.py\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[t("code",[e._v("--")]),e._v(" 告诉 "),t("code",[e._v("git log")]),e._v(" 接下来的参数是文件路径而不是分支名。如果分支名和文件名不可能冲突，你可以省略 "),t("code",[e._v("--")]),e._v("。")]),e._v(" "),t("h3",{attrs:{id:"按内容"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#按内容","aria-hidden":"true"}},[e._v("#")]),e._v(" 按内容")]),e._v(" "),t("p",[e._v("我们还可以根据源代码中某一行的增加和删除来搜索提交。这被称为 pickaxe，它接受形如 "),t("code",[e._v('-S"<string>"')]),e._v(" 的参数。比如说，当你想要知道 "),t("code",[e._v("Hello, World!")]),e._v(" 字符串是什么时候加到项目中哪个文件中去的，你可以使用下面这个命令：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('git log -S "Hello, World!"\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("如果你想用正则表达式而不是字符串来搜索，你可以使用 "),t("code",[e._v('-G"<regex>"')]),e._v(" 标记。")]),e._v(" "),t("p",[e._v("这是一个非常强大的调试工具，它能让你定位到所有影响代码中特定一行的提交。它甚至可以让你看到某一行是什么时候复制或者移动到另一个文件中去的。")]),e._v(" "),t("h3",{attrs:{id:"按范围"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#按范围","aria-hidden":"true"}},[e._v("#")]),e._v(" 按范围")]),e._v(" "),t("p",[e._v("你可以传入范围来筛选提交。这个范围由下面这样的格式指定，其中 "),t("code",[e._v("<since>")]),e._v(" 和 "),t("code",[e._v("<until>")]),e._v(" 是提交的引用：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git log <since>..<until>\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("这个命令在你使用分支引用作为参数时特别有用。这是显示两个分支之间区别最简单的方式。看看下面这个命令：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git log master..feature\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("其中的 "),t("code",[e._v("master..feature")]),e._v(" 范围包含了在 feature 分支而不在 master 分支中所有的提交。换句话说，这个命令可以看出从 master 分支 fork 到 feature 分支后发生了哪些变化。它可以这样可视化：")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://wac-cdn.atlassian.com/dam/jcr:b443a307-2df4-4080-948b-f5b9a1f8fd40/01.svg",alt:"enter image description here"}})]),e._v(" "),t("p",[e._v("注意如果你更改范围的前后顺序（feature..master），你会获取到 master 分支而非 feature 分支上的所有提交。如果 "),t("code",[e._v("git log")]),e._v(" 输出了全部两个分支的提交，这说明你的提交历史已经分叉了。")]),e._v(" "),t("h3",{attrs:{id:"过滤合并提交"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#过滤合并提交","aria-hidden":"true"}},[e._v("#")]),e._v(" 过滤合并提交")]),e._v(" "),t("p",[t("code",[e._v("git log")]),e._v(" 输出时默认包括合并提交。但是，如果你的团队采用强制合并策略（意思是 merge 你修改的上游分支而不是将你的分支 rebase 到上游分支），你的项目历史中会有很多外来的提交。")]),e._v(" "),t("p",[e._v("你可以通过 "),t("code",[e._v("--no-merges")]),e._v(" 标记来排除这些提交：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git log --no-merges\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("另一方面，如果你只对合并提交感兴趣，你可以使用 "),t("code",[e._v("--merges")]),e._v(" 标记：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git log --merges\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("它会返回所有包含两个父节点的提交。")]),e._v(" "),t("h2",{attrs:{id:"总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结","aria-hidden":"true"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),t("p",[e._v("你现在应该对使用 "),t("code",[e._v("git log")]),e._v(" 来格式化输出和选择你要显示的提交的用法比较熟悉了。它允许你查看你项目历史中任何需要的内容。")]),e._v(" "),t("p",[e._v("这些技巧是你 Git 工具箱中重要的部分，不过注意 "),t("code",[e._v("git log")]),e._v(" 往往和其他 Git 命令连着使用。当你找到了你要的提交，你把它传给 "),t("code",[e._v("git checkout")]),e._v("、"),t("code",[e._v("git revert")]),e._v(" 或是其他控制提交历史的工具。所以，请继续坚持 Git 高级用法的学习。")]),e._v(" "),t("blockquote",[t("p",[e._v("这篇文章是"),t("a",{attrs:{href:"https://github.com/geeeeeeeeek/git-recipes/",target:"_blank",rel:"noopener noreferrer"}},[t("strong",[e._v("「git-recipes」")]),t("OutboundLink")],1),e._v("的一部分，点击 "),t("a",{attrs:{href:"https://github.com/geeeeeeeeek/git-recipes/wiki/",target:"_blank",rel:"noopener noreferrer"}},[t("strong",[e._v("目录")]),t("OutboundLink")],1),e._v(" 查看所有章节。")]),e._v(" "),t("p",[e._v("如果你觉得文章对你有帮助，欢迎点击右上角的 "),t("strong",[e._v("Star")]),e._v(" 🌟 或 "),t("strong",[e._v("Fork")]),e._v(" 🍴。")]),e._v(" "),t("p",[e._v("如果你发现了错误，或是想要加入协作，请参阅 "),t("a",{attrs:{href:"https://github.com/geeeeeeeeek/git-recipes/issues/1",target:"_blank",rel:"noopener noreferrer"}},[e._v("Wiki 协作说明"),t("OutboundLink")],1),e._v("。")])])])},[],!1,null,null,null);a.default=r.exports}}]);