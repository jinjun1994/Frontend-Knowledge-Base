Parcel 编译vue报错：

```
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
```

**项目引入的vue编译版本不对**

修改

`import Vue from 'vue'`

为

`import Vue from 'vue/dist/vue.esm.js'`

**ES Module**：从 2.6 开始 Vue 会提供两个 ES Modules (ESM) 构建文件：

- 为打包工具提供的 ESM：为诸如 [webpack 2](https://webpack.js.org/) 或 [Rollup](https://rollupjs.org/) 提供的现代打包工具。ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行“tree-shaking”并将用不到的代码排除出最终的包。为这些打包工具提供的默认文件 (`pkg.module`) 是只有运行时的 ES Module 构建 (`vue.runtime.esm.js`)。
- 为浏览器提供的 ESM (2.6+)：用于在现代浏览器中通过 `<script type="module">` 直接导入。

原因是，使用 template属性，需要引入带编译器的完整版的vue.esm.js

vuejs官网中已有明确说明
对不同构建版本的解释（[https://cn.vuejs.org/v2/guide...](https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A)）

其他相关文章：
理顺8个版本vue的区别（[https://segmentfault.com/a/11...](https://segmentfault.com/a/1190000014310246)）