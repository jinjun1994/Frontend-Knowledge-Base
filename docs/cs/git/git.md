

 [史上最简单的 GitHub 教程](https://blog.csdn.net/qq_35246620/article/details/66973794)

 [高质量的Git中文教程](https://github.com/geeeeeeeeek/git-recipes)

[Git小白教程入门](http://rogerdudler.github.io/git-guide/index.zh.html)



![](http://img.dubiqc.com/201902/17023150.png-sign)

git 常用命令、有哪些目录或区域 git 是怎么管理代码的，提交错误的话，怎么撤销
介绍数据仓库

![开源许可证](http://www.ruanyifeng.com/blogimg/asset/201105/free_software_licenses.png)

#  [Git 基础 - 远程仓库的使用](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF)

## 远程仓库的使用

要参与任何一个 Git 项目的协作，必须要了解该如何管理远程仓库。远程仓库是指托管在网络上的项目仓库，可能会有好多个，其中有些你只能读，另外有些可以写。同他人协作开发某个项目时，需要管理这些远程仓库，以便推送或拉取数据，分享各自的工作进展。 管理远程仓库的工作，包括添加远程库，移除废弃的远程库，管理各式远程库分支，定义是否跟踪这些分支，等等。本节我们将详细讨论远程库的管理和使用。

### [查看当前的远程库](https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#%E6%9F%A5%E7%9C%8B%E5%BD%93%E5%89%8D%E7%9A%84%E8%BF%9C%E7%A8%8B%E5%BA%93)

要查看当前配置有哪些远程仓库，可以用 `git remote` 命令，它会列出每个远程库的简短名字。在克隆完某个项目后，至少可以看到一个名为 origin 的远程库，Git 默认使用这个名字来标识你所克隆的原始仓库：

```
$ git clone git://github.com/schacon/ticgit.git
Cloning into 'ticgit'...
remote: Reusing existing pack: 1857, done.
remote: Total 1857 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (1857/1857), 374.35 KiB | 193.00 KiB/s, done.
Resolving deltas: 100% (772/772), done.
Checking connectivity... done.
$ cd ticgit
$ git remote
origin
```

也可以加上 `-v` 选项（译注：此为 `--verbose` 的简写，取首字母），显示对应的克隆地址：

```
$ git remote -v
origin  git://github.com/schacon/ticgit.git (fetch)
origin  git://github.com/schacon/ticgit.git (push)
```

如果有多个远程仓库，此命令将全部列出。比如在我的 Grit 项目中，可以看到：

```
$ cd grit
$ git remote -v
bakkdoor  git://github.com/bakkdoor/grit.git
cho45     git://github.com/cho45/grit.git
defunkt   git://github.com/defunkt/grit.git
koke      git://github.com/koke/grit.git
origin    git@github.com:mojombo/grit.git
```

这样一来，我就可以非常轻松地从这些用户的仓库中，拉取他们的提交到本地。请注意，上面列出的地址只有 origin 用的是 SSH URL 链接，所以也只有这个仓库我能推送数据上去（我们会在第四章解释原因）。

### [添加远程仓库](https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#%E6%B7%BB%E5%8A%A0%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93)

要添加一个新的远程仓库，可以指定一个简单的名字，以便将来引用，运行 `git remote add [shortname] [url]`：

```
$ git remote
origin
$ git remote add pb git://github.com/paulboone/ticgit.git
$ git remote -v
origin  git://github.com/schacon/ticgit.git
pb  git://github.com/paulboone/ticgit.git
```

现在可以用字符串 `pb` 指代对应的仓库地址了。比如说，要抓取所有 Paul 有的，但本地仓库没有的信息，可以运行 `git fetch pb`：

```
$ git fetch pb
remote: Counting objects: 58, done.
remote: Compressing objects: 100% (41/41), done.
remote: Total 44 (delta 24), reused 1 (delta 0)
Unpacking objects: 100% (44/44), done.
From git://github.com/paulboone/ticgit
 * [new branch]      master     -> pb/master
 * [new branch]      ticgit     -> pb/ticgit
```

现在，Paul 的主干分支（master）已经完全可以在本地访问了，对应的名字是 `pb/master`，你可以将它合并到自己的某个分支，或者切换到这个分支，看看有些什么有趣的更新。

### [从远程仓库抓取数据](https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#%E4%BB%8E%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E6%8A%93%E5%8F%96%E6%95%B0%E6%8D%AE)

正如之前所看到的，可以用下面的命令从远程仓库抓取数据到本地：

```
$ git fetch [remote-name]
```

此命令会到远程仓库中拉取所有你本地仓库中还没有的数据。运行完成后，你就可以在本地访问该远程仓库中的所有分支，将其中某个分支合并到本地，或者只是取出某个分支，一探究竟。（我们会在第三章详细讨论关于分支的概念和操作。）

如果是克隆了一个仓库，此命令会自动将远程仓库归于 origin 名下。所以，`git fetch origin` 会抓取从你上次克隆以来别人上传到此远程仓库中的所有更新（或是上次 fetch 以来别人提交的更新）。有一点很重要，需要记住，fetch 命令只是将远端的数据拉到本地仓库，并不自动合并到当前工作分支，只有当你确实准备好了，才能手工合并。

如果设置了某个分支用于跟踪某个远端仓库的分支（参见下节及第三章的内容），可以使用 `git pull` 命令自动抓取数据下来，然后将远端分支自动合并到本地仓库中当前分支。在日常工作中我们经常这么用，既快且好。实际上，默认情况下 `git clone` 命令本质上就是自动创建了本地的 master 分支用于跟踪远程仓库中的 master 分支（假设远程仓库确实有 master 分支）。所以一般我们运行 `git pull`，目的都是要从原始克隆的远端仓库中抓取数据后，合并到工作目录中的当前分支。

### [推送数据到远程仓库](https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#%E6%8E%A8%E9%80%81%E6%95%B0%E6%8D%AE%E5%88%B0%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93)

项目进行到一个阶段，要同别人分享目前的成果，可以将本地仓库中的数据推送到远程仓库。实现这个任务的命令很简单： `git push [remote-name] [branch-name]`。如果要把本地的 master 分支推送到 `origin` 服务器上（再次说明下，克隆操作会自动使用默认的 master 和 origin 名字），可以运行下面的命令：

```
$ git push origin master
```

只有在所克隆的服务器上有写权限，或者同一时刻没有其他人在推数据，这条命令才会如期完成任务。如果在你推数据前，已经有其他人推送了若干更新，那你的推送操作就会被驳回。你必须先把他们的更新抓取到本地，合并到自己的项目中，然后才可以再次推送。有关推送数据到远程仓库的详细内容见第三章。

### [查看远程仓库信息](https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#%E6%9F%A5%E7%9C%8B%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E4%BF%A1%E6%81%AF)

我们可以通过命令 `git remote show [remote-name]` 查看某个远程仓库的详细信息，比如要看所克隆的 `origin` 仓库，可以运行：

```
$ git remote show origin
* remote origin
  URL: git://github.com/schacon/ticgit.git
  Remote branch merged with 'git pull' while on branch master
    master
  Tracked remote branches
    master
    ticgit
```

除了对应的克隆地址外，它还给出了许多额外的信息。它友善地告诉你如果是在 master 分支，就可以用 `git pull` 命令抓取数据合并到本地。另外还列出了所有处于跟踪状态中的远端分支。

上面的例子非常简单，而随着使用 Git 的深入，`git remote show` 给出的信息可能会像这样：

```
$ git remote show origin
* remote origin
  URL: git@github.com:defunkt/github.git
  Remote branch merged with 'git pull' while on branch issues
    issues
  Remote branch merged with 'git pull' while on branch master
    master
  New remote branches (next fetch will store in remotes/origin)
    caching
  Stale tracking branches (use 'git remote prune')
    libwalker
    walker2
  Tracked remote branches
    acl
    apiv2
    dashboard2
    issues
    master
    postgres
  Local branch pushed with 'git push'
    master:master
```

它告诉我们，运行 `git push` 时缺省推送的分支是什么（译注：最后两行）。它还显示了有哪些远端分支还没有同步到本地（译注：第六行的 `caching` 分支），哪些已同步到本地的远端分支在远端服务器上已被删除（译注：`Stale tracking branches` 下面的两个分支），以及运行 `git pull` 时将自动合并哪些分支（译注：前四行中列出的 `issues` 和 `master` 分支）。

### [远程仓库的删除和重命名](https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E5%88%A0%E9%99%A4%E5%92%8C%E9%87%8D%E5%91%BD%E5%90%8D)

在新版 Git 中可以用 `git remote rename` 命令修改某个远程仓库在本地的简称，比如想把 `pb` 改成 `paul`，可以这么运行：

```
$ git remote rename pb paul
$ git remote
origin
paul
```

注意，对远程仓库的重命名，也会使对应的分支名称发生变化，原来的 `pb/master` 分支现在成了 `paul/master`。

碰到远端仓库服务器迁移，或者原来的克隆镜像不再使用，又或者某个参与者不再贡献代码，那么需要移除对应的远端仓库，可以运行 `git remote rm` 命令：

```
$ git remote rm paul
$ git remote
origin
```







## git无法pull仓库refusing to merge unrelated histories







本文讲的是把git在最新2.9.2，合并pull两个不同的项目，出现的问题如何去解决

如果合并了两个不同的开始提交的仓库，在新的 git 会发现这两个仓库可能不是同一个，为了防止开发者上传错误，于是就给下面的提示

```
fatal: refusing to merge unrelated histories
```

如我在Github新建一个仓库，写了License，然后把本地一个写了很久仓库上传。这时会发现 github 的仓库和本地的没有一个共同的 commit 所以 git 不让提交，认为是写错了 `origin` ，如果开发者确定是这个 `origin` 就可以使用 `--allow-unrelated-histories` 告诉 git 自己确定

遇到无法提交的问题，一般先pull 也就是使用 `git pull origin master` 这里的 `origin` 就是仓库，而 `master` 就是需要上传的分支，因为两个仓库不同，发现 git 输出 `refusing to merge unrelated histories` 无法 pull 内容

因为他们是两个不同的项目，要把两个不同的项目合并，git需要添加一句代码，在 `git pull` 之后，这句代码是在git 2.9.2版本发生的，最新的版本需要添加 `--allow-unrelated-histories` 告诉 git 允许不相关历史合并

假如我们的源是origin，分支是master，那么我们需要这样写`git pull origin master --allow-unrelated-histories` 如果有设置了默认上传分支就可以用下面代码

```
git pull --allow-unrelated-histories1
```

## git 解决奇怪bug

## git 工具[itg](https://www.jianshu.com/p/e4ca3030a9d5)

## git 初次链接github

### …or create a new repository on the command line



```
echo "# blog" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:jinjun1994/blog.git
git push -u origin master
```

### …or push an existing repository from the command line



```
git remote add origin git@github.com:jinjun1994/blog.git
git push -u origin master
```

## 初次将一个文件add到暂存区了，但是后来发现又希望忽略这个文件，还怎么办呢

use "git reset HEAD <file>..." to unstage，将当前文件从暂存区回退到工作区

git rm -cached filename  从暂存区中移除，但是不删除本地仓库的物理文件，然后添加到.gitignore文件中。最后操作过后，远程的文件会删除，但是本地的不会删除。

use "git checkout -- <file>..." to discard changes in working directory
这个是把工作区中的改动删除

## 看看我都改了什么

之前的章节里，说到过 `git log` 可以查看历史记录：

```
git log
```

## log -p 查看详细历史

`-p` 是 `--patch` 的缩写，通过 `-p` 参数，你可以看到具体每个 `commit` 的改动细节：

`log -p` 可以看到每一个 `commit` 的每一行改动，所以很适合用于代码 review。

## log --stat 查看简要统计

如果你只想大致看一下改动内容，但并不想深入每一行的细节（例如你想回顾一下自己是在哪个 `commit` 中修改了 `games.txt` 文件），那么可以把选项换成 `--stat`。

```
git log --stat
```

## show 查看具体的 commit

如果你想看某个具体的 `commit` 的改动内容，可以用 `show`：

### 看当前 commit

直接输入：

```
git show
```



![img](https://user-gold-cdn.xitu.io/2017/11/22/15fe1ee0e2b7738e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### 看任意一个 commit

在 `show` 后面加上这个 `commit` 的引用（`branch` 或 `HEAD` 标记）或它的 `SHA-1` 码：

```
git show 5e68b0d8
```

### 看指定 commit 中的指定文件

在 `commit` 的引用或 `SHA-1` 后输入文件名：

```
git show 5e68b0d8 shopping\ list.txt
```

## 看未提交的内容

如果你想看未提交的内容，可以用 `diff`。

### 比对暂存区和上一条提交

使用 `git diff --staged` 可以显示暂存区和上一条提交之间的不同。换句话说，这条指令可以让你看到「如果你立即输入 `git commit`，你将会提交什么」：

```
git diff --staged
```

`--staged` 有一个等价的选项叫做 `--cached`。这里所谓的「等价」，是真真正正的等价，它们的意思完全相同。

### 比对工作目录和暂存区

使用 `git diff` （不加选项参数）可以显示工作目录和暂存区之间的不同。换句话说，这条指令可以让你看到「如果你现在把所有文件都 `add`，你会向暂存区中增加哪些内容」：

```
git diff
```

### 比对工作目录和上一条提交

使用 `git diff HEAD` 可以显示工作目录和上一条提交之间的不同，它是上面这二者的内容相加。换句话说，这条指令可以让你看到「如果你现在把所有文件都 `add` 然后 `git commit`，你将会提交什么」（不过需要注意，没有被 Git 记录在案的文件（即从来没有被 add 过 的文件，untracked files 并不会显示出来。为什么？因为对 Git 来说它并不存在啊）。

```
git diff HEAD
```

实质上，如果你把 `HEAD` 换成别的 `commit`，也可以显示当前工作目录和这条 `commit` 的区别。不过这种「如果」是可以列举很多很多的，Git 非常灵活，假如我把每个命令的所有可能性都列举出来，这本小册会变得杂乱无比没有重点，反而会让你困惑。所以我只讲最常用和最通用的内容，如果你对这些「如果」感兴趣，最好是自己去探索。

## 小结

这一节介绍了一些查看改动内容的方法，大致有这么几类：

1. 查看历史中的多个

    

   ```
   commit
   ```

   ：

   ```
   log
   ```

   1. 查看详细改动： `git log -p`
   2. 查看大致改动：`git log --stat`

2. 查看具体某个

    

   ```
   commit
   ```

   ：

   ```
   show
   ```

   1. 要看最新 `commit` ，直接输入 `git show` ；要看指定 `commit` ，输入 `git show commit的引用或SHA-1`
   2. 如果还要指定文件，在 `git show` 的最后加上文件名

3. 查看未提交的内容：

   ```
   diff
   ```

   1. 查看暂存区和上一条 `commit` 的区别：`git diff --staged`（或 `--cached`）
   2. 查看工作目录和暂存区的区别：`git diff` 不加选项参数
   3. 查看工作目录和上一条 `commit` 的区别：`git diff HEAD`