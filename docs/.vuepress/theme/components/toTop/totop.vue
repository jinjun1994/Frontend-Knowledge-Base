<template>
  <transition :name="transitionName">
    <div v-show="visible" :style="customStyle" class="back-to-ceiling" @click="backToTop">
      <i class="iconfont icon-rocket"></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    },
    backPosition: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: Object,
      default: function() {
        return {
          right: '1rem',
          bottom: '3rem',
          width: '2.5rem',
          height: '2.5rem',
          'border-radius': '.25rem',
          'line-height': '2.5rem',
          backgroundColor: 'rgba(231, 234, 241,.5)'
        }
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleScroll() {
    //   this.visible = window.pageYOffset > this.visibilityHeight
    console.log(window.pageYOffset,window.innerHeight);
      this.visible = window.pageYOffset > window.innerHeight
    },
    backToTop() {
      if (this.isMoving) return
      this.isMoving = true
      this.interval = setInterval(() => {
          window.scrollTo({ 
              top: 0,
              left: 0,
               behavior: 'smooth'
               })
          clearInterval(this.interval)
          this.isMoving = false
      }, 16.7)
    },
 
  }
}
</script>

<style lang="stylus" scoped>
@import '../../styles/config.styl'

  .back-to-ceiling
    position: fixed;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    display flex;
    justify-content center
    align-items center
    i 
      font-size 1.6rem
      color $accentColor
  .back-to-ceiling:hover {
    background: #d5dbe7;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }
  .back-to-ceiling .Icon {
    z-index: 100
    fill: #9aaabf;
    background: none;
  }
</style>