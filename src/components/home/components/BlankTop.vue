<template>
  <div class="blanktop">
    <span class="title"><b>高校思想政治理论课程资源平台</b></span>
    <div class="nav-bar">
      <div class="nav-items">
         <span v-for="(item, key) in navbar_data"
               :item="item" :key="key"
               :class="{changeTab: is_active(item)}" @click="pushTo(item.path)"
         >
           <img :src="item.srcPath" alt="">
        {{item.name}}
      </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlankTop',
  data () {
    return {
      navbar_data: [
        {
          name: '资讯平台',
          path: '/home',
          srcPath: require('../../../assets/redNet.png')
        },
        {
          name: '文献研究',
          path: '/bookDiscovery',
          srcPath: require('../../../assets/doc.png')
        },
        {
          name: '思政云课堂',
          path: '/yunClass',
          srcPath: require('../../../assets/hat.png')
        },
        {
          name: '教育质量评估',
          path: '/test',
          srcPath: require('../../../assets/evaluate.png')
        }
      ],
      active_num: 0
    }
  },
  methods: {
    pushTo (path) {
      this.$router.push(path)
    },
    is_active (item) {
      return item.path === this.$route.path
    }
  }
}
</script>

<style scoped>
  .changeTab{
    color: red;
    padding-bottom:0px;
    border-bottom: 1px solid red;
    text-align: center;
    font-style: italic;
    font-weight: bold;
  }
  .blanktop {
    height: 35px;
    padding: 0 12%;
    border-bottom: 1px solid #d0d0d5;
    overflow: hidden;
  }
  .title {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    font-family: 华文楷体;
    font-size: 20px;
    color: red;
  }
  .nav-bar {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    width: 60%;
    float: right
  }
  .nav-items{
    display: flex;
  }
  .nav-bar span {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    line-height: 35px;
    height: 35px;
    flex: 1;
    border-left: 1px solid #d0d0d5;
    border-right: 1px solid #d0d0d5;
    cursor: pointer;
  }
  .active {
    border-top: 4px solid #c01920;
    color: #c01920;
  }
</style>
