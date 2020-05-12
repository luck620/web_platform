<template>
  <div>
    <blank-top></blank-top>
    <div class="main">
      <div class="banner-top">
      <span>
        <img src="http://www.bjcipt.com/zixun2.0/images/11111.png" alt="">
      </span>
      </div>

      <inner-nav></inner-nav>

      <main-wrapper></main-wrapper>
    </div>

  </div>
</template>

<script>
import BlankTop from './components/BlankTop'
import InnerNav from './components/InnerNav'
import MainWrapper from './components/MainWrapper'

export default {
  name: 'Home',
  components: {
    BlankTop,
    InnerNav,
    MainWrapper
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
</style>
