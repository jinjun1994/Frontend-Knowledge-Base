(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{80:function(e,t,s){"use strict";s.r(t);var a=s(3),n=Object(a.a)({},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"检查仓库状态"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#检查仓库状态","aria-hidden":"true"}},[e._v("#")]),e._v(" 检查仓库状态")]),e._v(" "),s("blockquote",[s("p",[e._v("BY 童仲毅（"),s("a",{attrs:{href:"https://github.com/geeeeeeeeek/git-recipes/",target:"_blank",rel:"noopener noreferrer"}},[e._v("geeeeeeeeek@github"),s("OutboundLink")],1),e._v("）")]),e._v(" "),s("p",[e._v("这是一篇在"),s("a",{attrs:{href:"https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-log",target:"_blank",rel:"noopener noreferrer"}},[e._v("原文（BY atlassian）"),s("OutboundLink")],1),e._v("基础上演绎的译文。除非另行注明，页面上所有内容采用知识共享-署名（"),s("a",{attrs:{href:"http://creativecommons.org/licenses/by/2.5/au/deed.zh",target:"_blank",rel:"noopener noreferrer"}},[e._v("CC BY 2.5 AU"),s("OutboundLink")],1),e._v("）协议共享。")])]),e._v(" "),s("h2",{attrs:{id:"git-status"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#git-status","aria-hidden":"true"}},[e._v("#")]),e._v(" git status")]),e._v(" "),s("p",[s("code",[e._v("git status")]),e._v(" 命令显示工作目录和缓存区的状态。你可以看到哪些更改被缓存了，哪些还没有，以及哪些还未被 Git 追踪。status 的输出 "),s("em",[e._v("不会")]),e._v(" 告诉你任何已提交到项目历史的信息。如果你想看的话，应该使用 "),s("code",[e._v("git log")]),e._v(" 命令。")]),e._v(" "),s("h3",{attrs:{id:"用法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#用法","aria-hidden":"true"}},[e._v("#")]),e._v(" 用法")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("git status\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("列出已缓存、未缓存、未追踪的文件。")]),e._v(" "),s("h3",{attrs:{id:"讨论"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#讨论","aria-hidden":"true"}},[e._v("#")]),e._v(" 讨论")]),e._v(" "),s("p",[s("code",[e._v("git status")]),e._v(" 是一个相对简单的命令。 它告诉你 "),s("code",[e._v("git add")]),e._v(" 和 "),s("code",[e._v("git commit")]),e._v(" 的进展。status 信息还包括了添加缓存和移除缓存的相关指令。样例输出显示了三类主要的 "),s("code",[e._v("git status")]),e._v(" 输出：")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('# On branch master\n# Changes to be committed:\n# (use "git reset HEAD <file>..." to unstage)\n#\n#modified: hello.py\n#\n# Changes not staged for commit:\n# (use "git add <file>..." to update what will be committed)\n# (use "git checkout -- <file>..." to discard changes in working directory)\n#\n#modified: main.py\n#\n# Untracked files:\n# (use "git add <file>..." to include in what will be committed)\n#\n#hello.pyc\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br"),s("span",{staticClass:"line-number"},[e._v("12")]),s("br"),s("span",{staticClass:"line-number"},[e._v("13")]),s("br"),s("span",{staticClass:"line-number"},[e._v("14")]),s("br"),s("span",{staticClass:"line-number"},[e._v("15")]),s("br"),s("span",{staticClass:"line-number"},[e._v("16")]),s("br")])]),s("h4",{attrs:{id:"忽略文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#忽略文件","aria-hidden":"true"}},[e._v("#")]),e._v(" 忽略文件")]),e._v(" "),s("p",[e._v("未追踪的文件通常有两类。它们要么是项目新增但还未提交的文件，要么是像 "),s("code",[e._v(".pyc")]),e._v("、"),s("code",[e._v(".obj")]),e._v("、"),s("code",[e._v(".exe")]),e._v(" 等编译后的二进制文件。显然前者应该出现在 "),s("code",[e._v("git status")]),e._v(" 的输出中，而后者会让我们困惑究竟发生了什么。")]),e._v(" "),s("p",[e._v("因此，Git 允许你完全忽略这些文件，只需要将路径放在一个特定的 "),s("code",[e._v(".gitignore")]),e._v(" 文件中。所有想要忽略的文件应该分别写在单独一行，"),s("code",[e._v("*")]),e._v(" 字符用作通配符。比如，将下面这行加入项目根目录的"),s("code",[e._v(".gitignore")]),e._v("文件可以避免编译后的Python模块出现在"),s("code",[e._v("git status")]),e._v("中：")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("*.pyc\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("h3",{attrs:{id:"栗子"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#栗子","aria-hidden":"true"}},[e._v("#")]),e._v(" 栗子")]),e._v(" "),s("p",[e._v("在提交更改前检查仓库状态是一个良好的实践，这样你就不会不小心提交什么奇怪的东西。这个例子显示了缓存和提交快照前后的仓库状态：")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('# Edit hello.py\ngit status\n# hello.py is listed under "Changes not staged for commit"\ngit add hello.py\ngit status\n# hello.py is listed under "Changes to be committed"\ngit commit\ngit status\n# nothing to commit (working directory clean)\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br")])]),s("p",[e._v("第一个 status 的输出显示文件还未缓存。"),s("code",[e._v("git add")]),e._v(" 操作会影响第二个 "),s("code",[e._v("git status")]),e._v("，最后的 status 输出告诉你已经没有可以提交的东西了——工作目录和最近的提交一致。一些 Git 命令（比如 "),s("code",[e._v("git merge")]),e._v("）需要工作目录整洁，以免意外覆盖更改。")]),e._v(" "),s("h2",{attrs:{id:"git-log"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#git-log","aria-hidden":"true"}},[e._v("#")]),e._v(" git log")]),e._v(" "),s("p",[s("code",[e._v("git log")]),e._v(" 命令显示已提交的快照。你可以列出项目历史，筛选，以及搜索特定更改。"),s("code",[e._v("git status")]),e._v(" 允许你查看工作目录和缓存区，而 "),s("code",[e._v("git log")]),e._v(" 只作用于提交的项目历史。")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://wac-cdn.atlassian.com/dam/jcr:52d530ce-7f51-48e3-920b-a18f776048d3/01.svg",alt:"Git Tutorial: git status vs. git log"}})]),e._v(" "),s("p",[e._v("log 输出可以有很多种自定义的方式，从简单地筛选提交，到用完全自定义的格式显示。其中一些最常用的 "),s("code",[e._v("git log")]),e._v(" 配置如下所示。")]),e._v(" "),s("h3",{attrs:{id:"用法-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#用法-2","aria-hidden":"true"}},[e._v("#")]),e._v(" 用法")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("git log\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("使用默认格式显示完整地项目历史。如果输出超过一屏，你可以用 "),s("code",[e._v("空格键")]),e._v(" 来滚动，按 "),s("code",[e._v("q")]),e._v(" 退出。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("git log -n <limit>\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("用 "),s("code",[e._v("<limit>")]),e._v(" 限制提交的数量。比如 "),s("code",[e._v("git log -n 3")]),e._v(" 只会显示 3 个提交。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("git log --oneline\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("将每个提交压缩到一行。当你需要查看项目历史的上层情况时这会很有用。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("git log --stat\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("除了 "),s("code",[e._v("git log")]),e._v(" 信息之外，包含哪些文件被更改了，以及每个文件相对的增删行数。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("git log -p\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("显示代表每个提交的一堆信息。显示每个提交全部的差异（diff），这也是项目历史中最详细的视图。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('git log --author="<pattern>"\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("搜索特定作者的提交。"),s("code",[e._v("<pattern>")]),e._v(" 可以是字符串或正则表达式。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('git log --grep="<pattern>"\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("搜索提交信息匹配特定 "),s("code",[e._v("<pattern>")]),e._v(" 的提交。"),s("code",[e._v("<pattern>")]),e._v(" 可以是字符串或正则表达式。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("git log <since>..<until>\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("只显示发生在 "),s("code",[e._v("<since>")]),e._v(" 和 "),s("code",[e._v("<until>")]),e._v(" 之间的提交。两个参数可以是提交 ID、分支名、"),s("code",[e._v("HEAD")]),e._v(" 或是任何一种引用。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("git log <file>\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("只显示包含特定文件的提交。查找特定文件的历史这样做会很方便。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("git log --graph --decorate --oneline\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("还有一些有用的选项。"),s("code",[e._v("--graph")]),e._v(" 标记会绘制一幅字符组成的图形，左边是提交，右边是提交信息。"),s("code",[e._v("--decorate")]),e._v(" 标记会加上提交所在的分支名称和标签。"),s("code",[e._v("--oneline")]),e._v(" 标记将提交信息显示在同一行，一目了然。")]),e._v(" "),s("h3",{attrs:{id:"讨论-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#讨论-2","aria-hidden":"true"}},[e._v("#")]),e._v(" 讨论")]),e._v(" "),s("p",[s("code",[e._v("git log")]),e._v(" 命令是 Git 查看项目历史的基本工具。当你要寻找项目特定的一个版本或者弄明白合并功能分支时引入了哪些变化，你就会用到这个命令。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("commit 3157ee3718e180a9476bf2e5cab8e3f1e78a73b7\nAuthor: John Smith\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("p",[e._v("大多数时候都很简单直接。但是，第一行需要解释下。"),s("code",[e._v("commit")]),e._v(" 后面 40 个字的字符串是提交内容的 SHA-1 校验总和（checksum）。它有两个作用。一是保证提交的正确性——如果它被损坏了，提交会生成一个不同的校验总和。第二，它是提交唯一的标识 ID。")]),e._v(" "),s("p",[e._v("这个 ID 可以用于 "),s("code",[e._v("git log")]),e._v(" 这样的命令中来引用具体的提交。比如，"),s("code",[e._v("git log 3157e..5ab91")]),e._v(" 会显示所有ID在 "),s("code",[e._v("3157e")]),e._v(" 和 "),s("code",[e._v("5ab91")]),e._v(" 之间的提交。除了校验总和之外，分支名、HEAD 关键字也是常用的引用提交的方法。"),s("code",[e._v("HEAD")]),e._v(" 总是指向当前的提交，无论是分支还是特定提交也好。")]),e._v(" "),s("p",[e._v("~字符用于表示提交的父节点的相对引用。比如，"),s("code",[e._v("3157e~1")]),e._v(" 指向 "),s("code",[e._v("3157e")]),e._v(" 前一个提交,"),s("code",[e._v("HEAD~3")]),e._v(" 是当前提交的回溯3个节点的提交。")]),e._v(" "),s("p",[e._v("所有这些标识方法的背后都是为了让你对特定提交进行操作。"),s("code",[e._v("git log")]),e._v(" 命令一般是这些交互的起点，因为它让你找到你想要的提交。")]),e._v(" "),s("h3",{attrs:{id:"栗子-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#栗子-2","aria-hidden":"true"}},[e._v("#")]),e._v(" 栗子")]),e._v(" "),s("p",[s("em",[e._v("用法")]),e._v(" 一节提供了 "),s("code",[e._v("git log")]),e._v(" 很多的栗子，但请记住，你可以将很多选项用在同一个命令中：")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('git log --author="John Smith" -p hello.py\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("这个命令会显示 "),s("code",[e._v("John Smith")]),e._v(" 作者对 "),s("code",[e._v("hello.py")]),e._v(" 文件所做的所有更改的差异比较（diff）。")]),e._v(" "),s("p",[e._v("..句法是比较分支很有用的工具。下面的栗子显示了在 "),s("code",[e._v("some-feature")]),e._v(" 分支而不在 "),s("code",[e._v("master")]),e._v(" 分支的所有提交的概览。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("git log --oneline master..some-feature\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("blockquote",[s("p",[e._v("这篇文章是"),s("a",{attrs:{href:"https://github.com/geeeeeeeeek/git-recipes/",target:"_blank",rel:"noopener noreferrer"}},[s("strong",[e._v("「git-recipes」")]),s("OutboundLink")],1),e._v("的一部分，点击 "),s("a",{attrs:{href:"https://github.com/geeeeeeeeek/git-recipes/wiki/",target:"_blank",rel:"noopener noreferrer"}},[s("strong",[e._v("目录")]),s("OutboundLink")],1),e._v(" 查看所有章节。")]),e._v(" "),s("p",[e._v("如果你觉得文章对你有帮助，欢迎点击右上角的 "),s("strong",[e._v("Star")]),e._v(" 🌟 或 "),s("strong",[e._v("Fork")]),e._v(" 🍴。")]),e._v(" "),s("p",[e._v("如果你发现了错误，或是想要加入协作，请参阅 "),s("a",{attrs:{href:"https://github.com/geeeeeeeeek/git-recipes/issues/1",target:"_blank",rel:"noopener noreferrer"}},[e._v("Wiki 协作说明"),s("OutboundLink")],1),e._v("。")])])])},[],!1,null,null,null);t.default=n.exports}}]);