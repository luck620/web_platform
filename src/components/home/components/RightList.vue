<template>
  <div class="right-list">
    <div class="img-top" v-for="(item,key) in themeImportantList" :item="item" :key="'top' + key">
      <img :src="item.imageUrl" alt="">
    </div>
    <div class="nav">
      <span v-for="(item, key) in nav" :item="item" :key="'nav' + key" @click="switch_nav(key)"
      :class="{active: is_active(key)}">
        {{item.title}}</span>
    </div>

    <div class="img-panel" v-for="(item, key) in themeOthersList" :item="item" :key="key">
      <img :src="item.imageUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightList',
  data () {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      news: [],
      nav: [
        {
          title: '更多专题'
        }
      ],
      img_list: [
        [
        ]
      ],
      active_num: 0,
      themeImportantList: [],
      themeOthersList: []
    }
  },
  created () {
    this.getThemeByImportant()
    this.getThemeByOthers()
  },
  methods: {
    switch_nav (key) {
      this.active_num = key
    },
    is_active (key) {
      return key === this.active_num
    },
    async getThemeByImportant () {
      await this.$http.get('http://localhost:8080/theme/getThemeByImportant/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize + '').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.themeImportantList = res.data.content
      })
    },
    async getThemeByOthers () {
      await this.$http.get('http://localhost:8080/theme/getThemeByOthers/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize + '').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.themeOthersList = res.data.content
      })
    }
  }
}
</script>

<style scoped>
  .right-list {
    padding: 15px;
    float: right;
    width: 400px;
    display: inline-block;
    vertical-align: top;
    margin: 5px;
    border: 1px solid #d0d0d5;
  }
  .news-list {
    border-bottom: 1px solid #d0d0d5;
  }
  .img-top {
    text-align: center;
  }
  li {
    height: 35px;
  }
  li:first-child {
    list-style: none;
    margin-left: -17px;
  }
  li:first-child a {
    font-size: 18px;
    font-weight: bolder;
  }
  li a {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: normal normal normal 14px/28px "Microsoft YaHei";
    display: flex;
    align-items: center;
    font-size: 17px;
    line-height: 30px;
  }
  a:hover {
    text-decoration: underline;
    cursor: pointer;
    color: #337ab7;
  }
  .nav {
    border-bottom: 1px solid #d0d0d5;
    height: 45px;
    display: flex;
  }
  .nav span {
    line-height: 45px;
    flex: 1;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    color: #d0d0d5;
  }
  .nav span:first-child {
    border-right: 1px solid #d0d0d5;
  }
  .img-panel {
    text-align: center;
  }
  .img-panel img {
    width: 90%;
    margin-top: 15px;
  }
  .active {
    color: #c00021!important;
  }
</style>
