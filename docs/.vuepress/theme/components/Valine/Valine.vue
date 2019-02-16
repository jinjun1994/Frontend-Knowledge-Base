<template>
  <div class="page" v-show="isComment">
    <section class="page-edit">
      <h3 v-show="isComment">
        <a href="javascript:;"></a>
        评 论：
      </h3>
      <div id="vcomments" ></div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Valine',
    computed: {
    // 是否显示评论
    isComment () {
    //   const frontmatter = this.$page.frontmatter
      const {isComment, home} = this.$page.frontmatter
    //   return frontmatter.isComment === false || frontmatter.home === true ? false : true
      return isComment == false || home === true ? false : true
    }
  }, 
  mounted: function () {
    // require window
    const Valine = require('valine');
    if (typeof window !== 'undefined') {
      this.window = window
      window.AV = require('leancloud-storage')
    }
    this.valine = new Valine()
    this.initValine()
  },
  watch: {
    $route (to, from) {
      if (from.path != to.path) {
        this.initValine()
      }
    }
  },
  methods: {
    initValine () {
    //   let path = location.origin + location.pathname
      let path =  this.$route.path
      // vuepress打包后变成的HTML不知为什么吞掉此处的绑定`:id="countId"`
      document.getElementsByClassName('leancloud-visitors')[0].id = path
      this.valine.init({
        el: '#vcomments',
        appId: 'IRgwPiLrib3CsiwNuIquQUnX-gzGzoHsz',// your appId
        appKey: '7VqjT4lBkK1Ul9dtF4GKGMzA', // your appKey
        notify: false,
        verify: false,
        path: path,
        visitor: true,
        avatar: 'mm',
        placeholder: 'write here'
      });
    }
  }
}
</script>