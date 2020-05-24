<template>
  <div class="right-list">
    <div class="img-top" v-for="(item,key) in themeImportantList" :item="item" :key="'top' + key" @click="getInfo(item.title)">
      <img :src="item.imageUrl" alt="">
      <p><b><i>具体内容：</i></b></p>
      <ul v-for="(item2,key) in item.themeDetailTitle" :item="item2" :key="'top2' + key">
        <li>{{item2}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightList',
  data () {
    return {
      yqListLeft: [],
      yqListRight: [],
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
    async getyqListLeft () {
      await this.$http.get('http://localhost:8080/theme/getyqList/left').then((res) => {
        console.log(res)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.yqListLeft = res.data
      })
    },
    async getyqListRight () {
      await this.$http.get('http://localhost:8080/theme/getyqList/right').then((res) => {
        console.log(res)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.yqListRight = res.data
      })
    },
    getInfo (title) {
      this.$router.push('/' + title)
    },
    switch_nav (key) {
      this.active_num = key
    },
    is_active (key) {
      return key === this.active_num
    },
    async getThemeByImportant () {
      await this.$http.get('http://localhost:8080/theme/getThemeByImportant').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.themeImportantList = res.data
      })
    },
    async getThemeByOthers () {
      await this.$http.get('http://localhost:8080/theme/getThemeByOthers').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.themeOthersList = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .right-list {
    padding: 15px;
    float: right;
    width: 420px;
    display: inline-block;
    vertical-align: top;
    margin: 5px;
    border: 1px solid #d0d0d5;
  }
  .news-list {
    border-bottom: 1px solid #d0d0d5;
  }
  .img-top {
    text-align: left;
    cursor: pointer;
    margin-left: 20px;
  }
  .img-top img {
    margin-bottom: 15px;
    text-align: center;
  }
  li {
    height: 25px;
    font-family: 华文中宋;
    font-size: 15px;
  }
  li:first-child {
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
