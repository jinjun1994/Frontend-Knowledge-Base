(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{79:function(e,t,a){"use strict";a.r(t);var s=a(3),i=Object(s.a)({},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[a("img",{attrs:{src:"https://wac-cdn.atlassian.com/dam/jcr:75f75cb6-a6ab-4f0b-ab29-e366914f513c/hero.svg?cdnVersion=kg",alt:"Saving changes"}})]),e._v(" "),a("p",[a("em",[a("strong",[e._v("git add / git commit / git diff / git stash / .gitignore")])])]),e._v(" "),a("blockquote",[a("p",[e._v("✍️ "),a("a",{attrs:{href:"https://github.com/geeeeeeeeek",target:"_blank",rel:"noopener noreferrer"}},[e._v("童仲毅"),a("OutboundLink")],1),e._v("  |  ⏳ 2018 年 10 月 26 日（部分章节未更新）")]),e._v(" "),a("p",[e._v("©️ 本文演绎自 Atlassian 编写的 "),a("a",{attrs:{href:"https://www.atlassian.com/git/tutorials/saving-changes",target:"_blank",rel:"noopener noreferrer"}},[a("em",[e._v("Saving Changes")]),a("OutboundLink")],1),e._v("。页面上所有内容采用知识共享-署名（"),a("a",{attrs:{href:"http://creativecommons.org/licenses/by/2.5/au/deed.zh",target:"_blank",rel:"noopener noreferrer"}},[e._v("CC BY 2.5 AU"),a("OutboundLink")],1),e._v("）许可协议。")])]),e._v(" "),a("p",[e._v("“保存”这个概念在 Git 等版本控制系统和 Word 等文本编辑应用中不太一样。传统软件里的“保存”在 Git 里被叫做“提交”（commit）。 我们常说的的保存可以理解成在文件系统中覆盖一个已有的文件或者创建一个新的文件。而在 Git 中，提交这个操作作用于若干个文件和目录。")]),e._v(" "),a("p",[e._v("在 Git 和 SVN 里保存更改也不一样。SVN 提交或检入（check-in）将会推送到远端的中央服务器。也就是说 SVN 的提交需要联网才能完全“保存”项目更改。Git 提交可以在本地完成，然后再使用"),a("code",[e._v("git push -u origin master")]),e._v("命令推送到远端服务器。这两种方法的区别体现了两种架构设计的本质区别。Git 是一个分布式的应用，而 SVN 是一个中心化的应用。分布式应用一般来说更可靠，因为它们不存在中央服务器这样的单点故障。")]),e._v(" "),a("p",[a("code",[e._v("git add")]),e._v("、"),a("code",[e._v("git status")]),e._v("和"),a("code",[e._v("git commit")]),e._v("这三个命令通常一起使用，将 Git 项目当前的状态保存成一份快照。")]),e._v(" "),a("p",[e._v("Git 还有另一个保存机制：“储藏”（stash）。储藏是一个临时的储存区域，保存还没准备好提交的更改。储藏操作作用于工作目录，三个文件树中的第一棵。它有很多用法，访问 git stash 页面了解更多。")]),e._v(" "),a("p",[e._v("Git 仓库可以通过设置忽略一些文件或目录。Git 将不会保存这些文件的任何更改。Git 有多种方式管理忽略文件列表。访问 git ignore 页面了解更多 Git 忽略文件设置。")]),e._v(" "),a("h2",{attrs:{id:"git-add"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-add","aria-hidden":"true"}},[e._v("#")]),e._v(" git add")]),e._v(" "),a("p",[a("code",[e._v("git add")]),e._v(" 命令将工作目录中的变化添加到暂存区。它告诉 Git 你想要在下一次提交时包含这个文件的更新。但是，"),a("code",[e._v("git add")]),e._v(" 不会实质上地影响你的仓库——在你运行 "),a("code",[e._v("git commit")]),e._v(" 前更改都还没有真正被记录。")]),e._v(" "),a("p",[e._v("使用这些命令的同时，你还需要 "),a("code",[e._v("git status")]),e._v(" 来查看工作目录和暂存区的状态。")]),e._v(" "),a("h3",{attrs:{id:"用法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用法","aria-hidden":"true"}},[e._v("#")]),e._v(" 用法")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("git add <file>\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("p",[e._v("将 "),a("code",[e._v("<file>")]),e._v(" 中的更改加入下次提交的缓存。")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("git add <directory>\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("p",[e._v("将 "),a("code",[e._v("<directory>")]),e._v(" 下的更改加入下次提交的缓存。")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("git add -i\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("p",[e._v("开始交互式的缓存，你可以选择文件的一部分加入到下次提交缓存。它会向你展示一堆更改，等待你输入一个命令。"),a("code",[e._v("y")]),e._v(" 将这块更改加入缓存，"),a("code",[e._v("n")]),e._v(" 忽略这块更改，"),a("code",[e._v("s")]),e._v(" 将它分割成更小的块，"),a("code",[e._v("e")]),e._v(" 手动编辑这块更改，以及 "),a("code",[e._v("q")]),e._v(" 退出。")]),e._v(" "),a("h3",{attrs:{id:"讨论"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#讨论","aria-hidden":"true"}},[e._v("#")]),e._v(" 讨论")]),e._v(" "),a("p",[a("code",[e._v("git add")]),e._v(" 和 "),a("code",[e._v("git commit")]),e._v(" 这两个命令组成了最基本的 Git 工作流。每一个 Git 用户都需要理解这两个命令，不管他们团队的协作模型是如何的。我有一千种方式可以将项目版本记录在仓库的历史中。")]),e._v(" "),a("p",[e._v("在一个只有编辑、缓存、提交这样基本流程的项目上开发。首先，你要在工作目录中编辑你的文件。当你准备备份项目的当前状态时，你通过 "),a("code",[e._v("git add")]),e._v(" 来缓存更改。当你对缓存的快照满意之后，你通过 "),a("code",[e._v("git commit")]),e._v(" 将它提交到你的项目历史中去。")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://wac-cdn.atlassian.com/dam/jcr:0f27e004-f2f5-4890-921d-65fa77ba2774/01.svg",alt:"Git Tutorial: git add Snapshot"}})]),e._v(" "),a("p",[a("code",[e._v("git add")]),e._v(" 命令不能和 "),a("code",[e._v("svn add")]),e._v(" 混在一起理解，后者将文件添加到仓库中。而 "),a("code",[e._v("git add")]),e._v(" 发生于更抽象的 "),a("em",[e._v("更改")]),e._v(" 层面。也就是说，"),a("code",[e._v("git add")]),e._v(" 在每次你修改一个文件时都需要被调用，而 "),a("code",[e._v("svn add")]),e._v(" 只需要每个文件调用一次。这听上去很多余，但这样的工作流使得一个项目更容易组织。")]),e._v(" "),a("h4",{attrs:{id:"缓存区"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存区","aria-hidden":"true"}},[e._v("#")]),e._v(" 缓存区")]),e._v(" "),a("p",[e._v("缓存区是 Git 更为独特的地方之一，如果你是从 SVN（甚至是 Mercurial）迁移而来，那你可得花点时间理解了。你可以简单地把它想成是工作目录和项目历史之间的缓冲区。")]),e._v(" "),a("p",[e._v("缓存允许你在实际提交到项目历史之前，将相关的更改组合成一份高度专注的快照，而不是将你上次提交以后产生的所有更改一并提交。也就是说你可以更改各种不相关的文件，然后回过去将它们按逻辑切分，将相关的更改添加到缓存，一份一份提交。在任何修改控制系统中，很重要的一点是提交必须是原子性的，以便于追踪 bug，并用最小的代价回滚更改。")]),e._v(" "),a("h3",{attrs:{id:"栗子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#栗子","aria-hidden":"true"}},[e._v("#")]),e._v(" 栗子")]),e._v(" "),a("p",[e._v("当你开始新项目的时候，"),a("code",[e._v("git add")]),e._v(" 和 "),a("code",[e._v("svn import")]),e._v(" 类似。为了创建当前目录的初始提交，使用下面两个命令：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("git add .\ngit commit\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("p",[e._v("当你项目设置好之后，新的文件可以通过路径传递给 "),a("code",[e._v("git add")]),e._v(" 来添加：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("git add hello.py\ngit commit\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("p",[e._v("上面的命令同样可以用于记录已有文件的更改。重复一次，Git 不会区分缓存的更改来自新文件，还是仓库中已有的文件。")]),e._v(" "),a("h2",{attrs:{id:"git-commit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-commit","aria-hidden":"true"}},[e._v("#")]),e._v(" git commit")]),e._v(" "),a("p",[a("code",[e._v("git commit")]),e._v("命令将缓存的快照提交到项目历史。提交的快照可以认为是项目安全的版本，Git 永远不会改变它们，除非你这么要求。和 "),a("code",[e._v("git add")]),e._v(" 一样，这是最重要的 Git 命令之一。")]),e._v(" "),a("p",[e._v("尽管和它和 "),a("code",[e._v("svn commit")]),e._v(" 名字一样，但实际上它们毫无关联。快照被提交到本地仓库，不会和其他 Git 仓库有任何交互。")]),e._v(" "),a("h3",{attrs:{id:"用法-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用法-2","aria-hidden":"true"}},[e._v("#")]),e._v(" 用法")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("git commit\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("p",[e._v("提交已经缓存的快照。它会运行文本编辑器，等待你输入提交信息。当你输入信息之后，保存文件，关闭编辑器，创建实际的提交。")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('git commit -m "<message>"\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("p",[e._v("提交已经缓存的快照。但将 "),a("code",[e._v("<message>")]),e._v(" 作为提交信息，而不是运行文本编辑器。")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("git commit -a\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("p",[e._v("提交一份包含工作目录所有更改的快照。它只包含跟踪过的文件的更改（那些之前已经通过 "),a("code",[e._v("git add")]),e._v(" 添加过的文件）。")]),e._v(" "),a("h3",{attrs:{id:"讨论-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#讨论-2","aria-hidden":"true"}},[e._v("#")]),e._v(" 讨论")]),e._v(" "),a("p",[e._v("快照总是提交到 "),a("em",[e._v("本地")]),e._v(" 仓库。这一点和 SVN 截然不同，后者的工作拷贝提交到中央仓库。而 Git 不会强制你和中央仓库进行交互，直到你准备好了。就像缓存区是工作目录和项目历史之间的缓冲地带，每个开发者的本地仓库是他们贡献的代码和中央仓库之间的缓冲地带。")]),e._v(" "),a("p",[e._v("这一点改变了 Git 用户基本的开发模型。Git 开发者可以在本地仓库中积累一些提交，而不是一发生更改就直接提交到中央仓库。这对于 SVN 风格的协作有着诸多优点：更容易将功能切分成原子性的提交，让相关的提交组合在一起，发布到中央仓库之前整理好本地的历史。开发者得以在一个隔离的环境中工作，直到他们方便的时候再整合代码。")]),e._v(" "),a("h4",{attrs:{id:"记录快照，而不是记录差异"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#记录快照，而不是记录差异","aria-hidden":"true"}},[e._v("#")]),e._v(" 记录快照，而不是记录差异")]),e._v(" "),a("p",[e._v("SVN 和 Git 除了使用上存在巨大差异，它们底层的实现同样遵循截然不同的设计哲学。SVN 追踪文件的 "),a("em",[e._v("变化")]),e._v(" ，而 Git 的版本控制模型基于 "),a("em",[e._v("快照")]),e._v(" 。比如说，一个 SVN 提交由仓库中原文件相比的差异（diff）组成。而 Git 在每次提交中记录文件的 "),a("em",[e._v("完整内容")]),e._v(" 。")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://www.atlassian.com/dam/jcr:7406fe56-d36d-44cf-92e3-b28e4bae36f8/02.svg",alt:"Git Tutorial: Snapshots, Not Differences"}})]),e._v(" "),a("p",[e._v("这让很多 Git 操作比 SVN 来的快得多，因为文件的某个版本不需要通过版本间的差异组装得到——每个文件完整的修改能立刻从 Git 的内部数据库中得到。")]),e._v(" "),a("p",[e._v("Git 的快照模型对它版本控制模型的方方面面都有着深远的影响，从分支到合并工具，再到协作工作流，以至于影响了所有特性。")]),e._v(" "),a("h3",{attrs:{id:"栗子-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#栗子-2","aria-hidden":"true"}},[e._v("#")]),e._v(" 栗子")]),e._v(" "),a("p",[e._v("下面这个栗子假设你编辑了 "),a("code",[e._v("hello.py")]),e._v(" 文件的一些内容，并且准备好将它提交到项目历史。首先，你需要用 "),a("code",[e._v("git add")]),e._v(" 缓存文件，然后提交缓存的快照。")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("git add hello.py\ngit commit\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("p",[e._v("它会打开一个文件编辑器（可以通过 "),a("code",[e._v("git config")]),e._v(" 设置) 询问提交信息，同时列出将被提交的文件。")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("# Please enter the commit message for your changes. Lines starting\n# with '#' will be ignored, and an empty message aborts the commit.\n# On branch master\n# Changes to be committed:\n# (use \"git reset HEAD <file>...\" to unstage)\n#\n#modified: hello.py\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br")])]),a("p",[e._v("Git 对提交信息没有特定的格式限制，但约定俗成的格式是：在第一行用 50 个以内的字符总结这个提交，留一空行，然后详细阐述具体的更改。比如：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("Change the message displayed by hello.py\n\n- Update the sayHello() function to output the user's name\n- Change the sayGoodbye() function to a friendlier message\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br")])]),a("p",[e._v("注意，很多开发者倾向于在提交信息中使用一般现在时态。这样看起来更像是对仓库进行的操作，让很多改写历史的操作更加符合直觉。")]),e._v(" "),a("blockquote",[a("p",[e._v("这篇文章是"),a("a",{attrs:{href:"https://github.com/geeeeeeeeek/git-recipes/",target:"_blank",rel:"noopener noreferrer"}},[a("strong",[e._v("「git-recipes」")]),a("OutboundLink")],1),e._v("的一部分，点击 "),a("a",{attrs:{href:"https://github.com/geeeeeeeeek/git-recipes/wiki/",target:"_blank",rel:"noopener noreferrer"}},[a("strong",[e._v("目录")]),a("OutboundLink")],1),e._v(" 查看所有章节。")]),e._v(" "),a("p",[e._v("如果你觉得文章对你有帮助，欢迎点击右上角的 "),a("strong",[e._v("Star")]),e._v(" 🌟 或 "),a("strong",[e._v("Fork")]),e._v(" 🍴。")]),e._v(" "),a("p",[e._v("如果你发现了错误，或是想要加入协作，请参阅 "),a("a",{attrs:{href:"https://github.com/geeeeeeeeek/git-recipes/issues/1",target:"_blank",rel:"noopener noreferrer"}},[e._v("Wiki 协作说明"),a("OutboundLink")],1),e._v("。")])])])},[],!1,null,null,null);t.default=i.exports}}]);