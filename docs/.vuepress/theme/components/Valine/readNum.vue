<template>
  <span v-if="$site.themeConfig.valineConfig" :id="idVal" class="leancloud-visitors" data-flag-title="Your Article Title">
    <i class="icon-eye" :style="eyeStyle"></i>
    <a class="leancloud-visitors-count" :style="numStyle"></a>
  </span>
</template>

<script>

export default {
  props: ['idVal', 'numStyle', 'eyeStyle']
}
</script>

<style lang="stylus" scoped>
.icon-eye
  margin-right .5rem
.leancloud-visitors
  display inline-flex
  align-items center
  margin-right .5rem
</style>