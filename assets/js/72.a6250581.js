(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{131:function(s,t,a){"use strict";a.r(t);var n=a(3),e=Object(n.a)({},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"node"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node","aria-hidden":"true"}},[s._v("#")]),s._v(" node")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://nodeschool.io/zh-cn/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://nodeschool.io/zh-cn/"),a("OutboundLink")],1)]),s._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/chyingp/nodejs-learning-guide",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://github.com/chyingp/nodejs-learning-guide"),a("OutboundLink")],1)]),s._v(" "),a("p",[a("a",{attrs:{href:"https://www.bookstack.cn/read/How-to-learn-node-correctly/README.md",target:"_blank",rel:"noopener noreferrer"}},[s._v("如何正确的学习Node.js"),a("OutboundLink")],1)]),s._v(" "),a("p",[a("a",{attrs:{href:"https://juejin.im/post/5c4c0ee8f265da61117aa527",target:"_blank",rel:"noopener noreferrer"}},[s._v("一篇文章构建你的 NodeJS 知识体系"),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("nodejs.dev")]),s._v(" "),a("p",[s._v("赵坤 node.js调试指南")]),s._v(" "),a("p",[s._v("普灵 深入浅出node.js 第二版")]),s._v(" "),a("p",[s._v("了不起的node")]),s._v(" "),a("p",[s._v("node.js in action")]),s._v(" "),a("h2",{attrs:{id:"fm-node学习笔记"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fm-node学习笔记","aria-hidden":"true"}},[s._v("#")]),s._v(" FM node学习笔记")]),s._v(" "),a("h2",{attrs:{id:"node-js-in-action"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node-js-in-action","aria-hidden":"true"}},[s._v("#")]),s._v(" node.js in action")]),s._v(" "),a("h3",{attrs:{id:"非阻塞-i-o"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#非阻塞-i-o","aria-hidden":"true"}},[s._v("#")]),s._v(" 非阻塞 i/o")]),s._v(" "),a("p",[a("strong",[s._v("I/O")]),s._v("（英语："),a("strong",[s._v("I")]),s._v("nput/"),a("strong",[s._v("O")]),s._v("utput），即"),a("strong",[s._v("输入/输出")]),s._v("，通常指数据在"),a("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E5%86%85%E9%83%A8%E5%AD%98%E5%82%A8%E5%99%A8",target:"_blank",rel:"noopener noreferrer"}},[s._v("内部存储器"),a("OutboundLink")],1),s._v("和外部存储器或其他周边设备之间的输入和输出。")]),s._v(" "),a("h2",{attrs:{id:"基础知识"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础知识","aria-hidden":"true"}},[s._v("#")]),s._v(" 基础知识")]),s._v(" "),a("h2",{attrs:{id:"express"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#express","aria-hidden":"true"}},[s._v("#")]),s._v(" express")]),s._v(" "),a("h2",{attrs:{id:"koa2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#koa2","aria-hidden":"true"}},[s._v("#")]),s._v(" koa2")]),s._v(" "),a("h2",{attrs:{id:"hapi"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hapi","aria-hidden":"true"}},[s._v("#")]),s._v(" hapi")]),s._v(" "),a("h2",{attrs:{id:"koa1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#koa1","aria-hidden":"true"}},[s._v("#")]),s._v(" koa1")]),s._v(" "),a("h2",{attrs:{id:"npm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#npm","aria-hidden":"true"}},[s._v("#")]),s._v(" npm")]),s._v(" "),a("h1",{attrs:{id:"如何发布自己的npm包？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何发布自己的npm包？","aria-hidden":"true"}},[s._v("#")]),s._v(" 如何发布自己的NPM包？")]),s._v(" "),a("h2",{attrs:{id:"_1-注册npm-账号"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-注册npm-账号","aria-hidden":"true"}},[s._v("#")]),s._v(" "),a("strong",[s._v("1.注册NPM 账号")])]),s._v(" "),a("p",[a("a",{attrs:{href:"https://www.npmjs.com/",target:"_blank",rel:"noopener noreferrer"}},[s._v("注册地址"),a("OutboundLink")],1)]),s._v(" "),a("h2",{attrs:{id:"_2-初始化自己要发布的项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-初始化自己要发布的项目","aria-hidden":"true"}},[s._v("#")]),s._v(" "),a("strong",[s._v("2.初始化自己要发布的项目")])]),s._v(" "),a("p",[s._v("环境：node.js。")]),s._v(" "),a("p",[s._v("新建目录，在该目录下，初始化项目：npm init。")]),s._v(" "),a("p",[s._v("package.json内容大概如下")]),s._v(" "),a("p",[s._v("按照提示填写初始化信息，我的模块名称为："),a("strong",[s._v("vuepress-theme-kim")]),s._v("，初始版本号："),a("strong",[s._v("v1.0.0")]),s._v("。")]),s._v(" "),a("p",[s._v("模块名称需遵循相关政策要求："),a("a",{attrs:{href:"https://link.juejin.im/?target=https%3A%2F%2Fwww.npmjs.com%2Fpolicies",target:"_blank",rel:"noopener noreferrer"}},[s._v("www.npmjs.com/policies"),a("OutboundLink")],1),s._v(" ， 不能够与已有NPM模块名冲突等等。")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[s._v("/package.json\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress-theme-kim"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1.0.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"description"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress theme"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"main"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"index.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"dependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"@vuepress/plugin-active-header-links"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^1.0.0-alpha.35"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"@vuepress/plugin-nprogress"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^1.0.0-alpha.35"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"@vuepress/plugin-search"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^1.0.0-alpha.35"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"docsearch.js"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^2.5.2"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"stylus"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^0.54.5"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"stylus-loader"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^3.0.2"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"leancloud-storage"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^3.10.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"valine"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^1.3.4"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"devDependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"echo \\"Error: no test specified\\" && exit 1"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"keywords"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"theme"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"author"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"jinjun"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"license"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"MIT"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br")])]),a("p",[s._v("模块代码 index.js:")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" path "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'path'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Theme API.")]),s._v("\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("exports")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" ctx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alias")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" themeConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" siteConfig "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" ctx\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// resolve algolia")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" isAlgoliaSearch "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n      themeConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("algolia "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("||")]),s._v("\n      Object"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("keys")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("siteConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("locales "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" themeConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("locales "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("||")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("some")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("base "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" themeConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("locales"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("base"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("algolia"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@AlgoliaSearchBox'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" isAlgoliaSearch\n        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v(" path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("__dirname"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'components/AlgoliaSearchBox.vue'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("__dirname"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'noopModule.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n\n  plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@vuepress/active-header-links'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@vuepress/search'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@vuepress/plugin-nprogress'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br")])]),a("h2",{attrs:{id:"_3-登录npm，发布自己的npm包。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-登录npm，发布自己的npm包。","aria-hidden":"true"}},[s._v("#")]),s._v(" 3.登录npm，发布自己的npm包。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("npm login\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("根据提示输入之前注册的账号、密码。 发布npm包：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("npm ERR! code EAUTHUNKNOWN\nnpm ERR! Unable to authenticate, need: Basic\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("登录出现上面的错误，修改一次密码再登录")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("npm publish\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("此时在自己个人的npm账号主页可以看到该包。")]),s._v(" "),a("h2",{attrs:{id:"_4-使用自己发布的包（模块）的示例代码："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-使用自己发布的包（模块）的示例代码：","aria-hidden":"true"}},[s._v("#")]),s._v(" 4.使用自己发布的包（模块）的示例代码：")]),s._v(" "),a("p",[s._v("安装之前发布的npm包：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("npm install vuepress-theme-kim\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"_5-更新自己的npm包（模块）及-readme文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-更新自己的npm包（模块）及-readme文件","aria-hidden":"true"}},[s._v("#")]),s._v(" 5.更新自己的NPM包（模块）及 readme文件")]),s._v(" "),a("p",[s._v("修改代码和readme.md后，执行命令：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("npm version patch\nnpm publish\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("npm version后面参数说明：")]),s._v(" "),a("p",[s._v("patch：小变动，比如修复bug等，版本号变动 "),a("strong",[s._v("v1.0.0->v1.0.1")])]),s._v(" "),a("p",[s._v("minor：增加新功能，不影响现有功能,版本号变动 "),a("strong",[s._v("v1.0.0->v1.1.0")])]),s._v(" "),a("p",[s._v("major：破坏模块对向后的兼容性，版本号变动 "),a("strong",[s._v("v1.0.0->v2.0.0")])]),s._v(" "),a("h2",{attrs:{id:"_6-使用更新后的npm包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-使用更新后的npm包","aria-hidden":"true"}},[s._v("#")]),s._v(" 6.使用更新后的NPM包")]),s._v(" "),a("p",[s._v("更新NPM包：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("针对patch： npm install vuepress-theme-kim\n针对minor： npm install vuepress-theme-kim\n针对major： npm install vuepress-theme-kim@2.0.0\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("其它内容与步骤4相同。")])])},[],!1,null,null,null);t.default=e.exports}}]);