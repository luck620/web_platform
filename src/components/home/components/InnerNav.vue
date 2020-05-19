<template>
  <div class="inner-nav">
    <div class="nav-bar">
      <div class="nav-items">
         <span v-for="(item, key) in navbar_data"
                 :item="item" :key="key" class="nav-item" :class="{changeColor: isActive(item)}" @click="handleTab(key,item.path)"
           >
          <i class="el-icon-share"></i>{{item.name}}
           <span>/</span>
         </span>
      </div>
    </div>
    <div class="search">
      <input v-model="q" type="text"/>
      <span class="search-btn">搜索</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InnerNav',
  data () {
    return {
      num: '',
      navbar_data: [
        {
          name: '工作动态',
          path: '/home'
        },
        {
          name: '学术前沿',
          path: '/academic'
        },
        {
          name: '教学研究',
          path: '/teach'
        },
        {
          name: '活动会议',
          path: '/activity'
        },
        {
          name: '高校专区',
          path: '/university'
        }
      ],
      q: ''
    }
  },
  methods: {
    handleTab (key, path) {
      console.log(path)
      this.num = key
      this.$router.push({
        path: path
      })
    },
    isActive (item) {
      return item.path === this.$route.path
    }
  }
}
</script>

<style scoped>
  .changeColor{
    color: red;;
    padding-bottom:0px;
    border-bottom: 1px solid red;
    text-align: center;
  }
  .inner-nav {
    height: 60px;
    border-bottom: 1px solid #d0d0d5;
    line-height: 60px;
  }
  .nav-bar {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    width: 60%;
  }
  .nav-items{
    display: inline-block;
  }
  .nav-item {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    line-height: 60px;
    height: 60px;
    flex: 1;
    cursor: pointer;
  }
  .nav-item span {
    margin-left: 8px;
  }
  .nav-item:last-child span {
    display: none;
  }
  .search {
    display: inline-block;
    position: relative;
    float: right;
    padding-right: 100px;
    line-height: 45px;
  }
  .search input {
    height: 30px;
    border: 2px solid #dadada;
    border-radius: 5px;
    width: 330px;
    padding-left: 13px;
    font-size: 14px;
    line-height: 30px;
  }
  .search-btn {
    display: inline-block;
    margin-top: 2px;
    margin-left: -5px;
    height: 37px;
    text-align: center;
    line-height: 37px;
    width: 60px;
    background: #c01920;
    border-radius: 0 5px 5px 0;
    color: #ffffff;
    cursor: pointer;
  }
</style>
