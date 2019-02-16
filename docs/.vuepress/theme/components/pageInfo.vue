<template>
  <div class="pageInfo">
    <i
      class="icon-author iconfont"
      v-if="pageInfo.frontmatter.author || $site.themeConfig.author || $site.title">
     <span>{{ pageInfo.frontmatter.author || $site.themeConfig.author || $site.title }}</span>
    </i>
     
    <i class="icon-time iconfont" v-if="pageInfo.frontmatter.date">
        <span>{{ new Date(pageInfo.frontmatter.date).toLocaleDateString() }}</span>
    </i>
        
    <readNum :idVal="pageInfo.path" :numStyle="numStyle" :eyeStyle="eyeStyle"></readNum>
 
  </div>
</template>

<script>
import readNum from './Valine/readNum'
export default {
  data () {
    return {
      numStyle: {
        fontSize: '.9rem',
        fontWeight: 'normal',
        color: '#999'
      },
      eyeStyle: {
        fontSize: '.9rem',
        fontWeight: 'normal',
        color: '#999'
      }
    }
  },
  props: ['pageInfo'],
  components: { readNum },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>

.iconfont
  display inline-block
  line-height 1.5rem
  color #999
  &:not(:last-child)
    margin-right 1rem
  span 
    margin-left .5rem

.tags
  .tag-item
    cursor: pointer;
    &.active
      color $accentColor
    &:hover 
      color $accentColor
// @media (max-width: $MQMobile)
//   .tags
//     display block
//     margin-top 1rem;
//     margin-left: 0!important;
</style>