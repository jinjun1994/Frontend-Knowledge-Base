# node

## express

##  koa2 

## hapi

## koa1

## npm

# 如何发布自己的NPM包？

## **1.注册NPM 账号**

[注册地址](https://www.npmjs.com/)

## **2.初始化自己要发布的项目**

环境：node.js。

 新建目录，在该目录下，初始化项目：npm init。 

package.json内容大概如下

按照提示填写初始化信息，我的模块名称为：**vuepress-theme-kim**，初始版本号：**v1.0.0**。

 模块名称需遵循相关政策要求：[www.npmjs.com/policies](https://link.juejin.im/?target=https%3A%2F%2Fwww.npmjs.com%2Fpolicies) ， 不能够与已有NPM模块名冲突等等。 

````json
/package.json
{
  "name": "vuepress-theme-kim",
  "version": "1.0.0",
  "description": "vuepress theme",
  "main": "index.js",
  "dependencies": {
    "@vuepress/plugin-active-header-links": "^1.0.0-alpha.35",
    "@vuepress/plugin-nprogress": "^1.0.0-alpha.35",
    "@vuepress/plugin-search": "^1.0.0-alpha.35",
    "docsearch.js": "^2.5.2",
    "stylus": "^0.54.5",
    "stylus-loader": "^3.0.2",
    "leancloud-storage": "^3.10.1",
    "valine": "^1.3.4"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "vuepress",
    "theme"
  ],
  "author": "jinjun",
  "license": "MIT"
}
````



模块代码 index.js:

```javascript
const path = require('path')

// Theme API.
module.exports = (options, ctx) => ({
  alias () {
    const { themeConfig, siteConfig } = ctx
    // resolve algolia
    const isAlgoliaSearch = (
      themeConfig.algolia ||
      Object.keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
    )
    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js')
    }
  },

  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/search',
    '@vuepress/plugin-nprogress'
  ]
})

```

## 3.登录npm，发布自己的npm包。

```js
npm login
```

根据提示输入之前注册的账号、密码。 发布npm包：

```
npm ERR! code EAUTHUNKNOWN
npm ERR! Unable to authenticate, need: Basic
```

登录出现上面的错误，修改一次密码再登录

```js
npm publish
```

此时在自己个人的npm账号主页可以看到该包。

## 4.使用自己发布的包（模块）的示例代码：

安装之前发布的npm包：

```
npm install vuepress-theme-kim
```



## 5.更新自己的NPM包（模块）及 readme文件

修改代码和readme.md后，执行命令：

```
npm version patch
npm publish
```

npm version后面参数说明：

patch：小变动，比如修复bug等，版本号变动 **v1.0.0->v1.0.1**

minor：增加新功能，不影响现有功能,版本号变动 **v1.0.0->v1.1.0**

major：破坏模块对向后的兼容性，版本号变动 **v1.0.0->v2.0.0**

## 6.使用更新后的NPM包

更新NPM包：

```
针对patch： npm install vuepress-theme-kim
针对minor： npm install vuepress-theme-kim
针对major： npm install vuepress-theme-kim@2.0.0
```

其它内容与步骤4相同。