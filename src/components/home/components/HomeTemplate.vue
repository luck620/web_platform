<template>
  <div>
    <blank-top></blank-top>
    <div class="main">
      <div class="banner-top">
      <span>
        <img src="http://www.bjcipt.com/zixun2.0/images/11111.png" alt="">
      </span>
      </div>
      <inner-nav @handletab="handletab"></inner-nav>
      <div class="left">
        <slot>
        </slot>
      </div>
      <right-list></right-list>
    </div>

  </div>
</template>

<script>
import BlankTop from './BlankTop'
import InnerNav from './InnerNav'
import RightList from './RightList'

export default {
  name: 'HomeTemplate',
  components: {
    BlankTop,
    InnerNav,
    RightList
  },
  data () {
    return {
      key: ''
    }
  },
  methods: {
    handletab (key) {
      this.$emit(key)
    }
  }
}
</script>

<style scoped>
  .main {
    width: 80%;
    padding-left: 10%;
  }
  .banner-top {
    height: 120px;
    text-align: center;
  }

  .banner-top img {
    width: 100%;
    height: 100%;
  }

  .left {
    display: inline-block;
    vertical-align: top;
    width: calc( 75vw - 400px)
  }
</style>
