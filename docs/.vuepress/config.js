module.exports = {
    plugins: ['@vuepress/last-updated'],
    // theme: 'vuepress-theme-kim',
    title: 'Frontend Knowledge Base',
    description: '【前端学习+面试指南】 涵盖前端工程师必需的核心知识库',
    evergreen:true,
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
      ['link', { rel: 'icon', href: '/knowledge-base.png' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/Frontend-Knowledge-Base/', // 这是部署到github相关的配置 下面会讲
    markdown: {
      lineNumbers: true // 代码块显示行号
    },
    themeConfig: {

      algolia: {
        apiKey: 'dd4fb1285759b32bbdbcfe5b4ea67194',
        // appId: '9AVBJQQ64T',
        indexName: 'jinjun_frontend_knowledge',
        algoliaOptions: {
          hitsPerPage: 10,
        }
      },

// 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
repo: 'jinjun1994/Frontend-Knowledge-Base',
// 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
// "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
repoLabel: '查看源码',

// 以下为可选的编辑链接选项

// 假如你的文档仓库和项目本身不在一个仓库：
// docsRepo: 'vuejs/vuepress',
// 假如文档不是放在仓库的根目录下：
// docsDir: 'docs',
// 假如文档放在一个特定的分支下：
// docsBranch: 'master',
// 默认是 false, 设置为 true 来启用
editLinks: true,
// 默认为 "Edit this page"
editLinkText: '帮助我们改善此页面！',

      sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
      // displayAllHeaders: true, // 默认值：false
      lastUpdated: 'Last Updated' ,// 文档更新时间：每个文件git最后提交的时间
      nav:[
        { text: '前端算法', link: '/algorithm/' }, // 内部链接 以docs为根目录
        { text: '博客', link: 'https://jinjun.wiki/' }, // 外部链接
        // 下拉列表
        {
          text: 'GitHub',
          items: [
            { text: 'GitHub地址', link: 'https://github.com/jinjun1994' },
            {
              text: '算法仓库',
              link: 'https://github.com/jinjun19942'
            }
          ]
        }        
      ],
      // sidebar: 'auto',
      sidebar: {
        '/frontend/': getFrontEndSidebar('JavaScript', 'css', 'html', '浏览器', '前端框架',
        '性能优化', 'node', '数据结构与算法', '前端工程化', '前端图形学', '微信小程序')
        // '/zh/plugin/': getPluginSidebar('插件', '介绍', '官方插件'),
        // '/zh/theme/': getThemeSidebar('主题', '介绍')
      }
    }
  };
  function getFrontEndSidebar (JavaScript, css, html, browser,framework, 
    performance,node,algorithm,frontend_engineering, graphics, miniprogram) {
    return [
      {
        title: JavaScript,
        collapsable: true,
        children: [
          'JavaScript/',
        ]
      },
      {
        title: css,
        collapsable: true,
        children: [
          'css/css',
        ]
      },
      {
        title: html,
        collapsable: true,
        children: [
          'html/html',
        ]
      },
      {
        title: browser,
        collapsable: true,
        children: [
          'browser/browser',
        ]
      },
      {
        title: framework,
        collapsable: true,
        children: [
          'framework/framework',
        ]
      },
      {
        title: performance,
        collapsable: true,
        children: [
          'performance/performance',
        ]
      },
      {
        title: node,
        collapsable: true,
        children: [
          'node/node',
        ]
      },
      {
        title: algorithm,
        collapsable: true,
        children: [
          'algorithm/algorithm',
        ]
      },
      {
        title: frontend_engineering,
        collapsable: true,
        children: [
          'frontend-engineering/frontend-engineering',
        ]
      },
      {
        title: graphics,
        collapsable: true,
        children: [
          'graphics/graphics',
        ]
      },
      {
        title: miniprogram,
        collapsable: true,
        children: [
          'miniprogram/miniprogram',
        ]
      }
    ]
  }