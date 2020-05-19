<template>
  <home-template>
    <div class="left">
      <h3>{{news.title}}</h3>
      <div class="sub_title">
        <span>{{news.date}}</span>
        <span>          来源：</span>{{news.source}}
        <!--          <span>          作者：</span>{{news.author}}-->
      </div>
      <div class="h4" v-html="news.content">{{news.content}}</div>
    </div>
  </home-template>
</template>

<script>
import HomeTemplate from './components/HomeTemplate'

export default {
  name: 'NewsContent',
  components: {
    HomeTemplate
  },
  data () {
    return {
      news: [],
      newId: ''
    }
  },
  created () {
    this.newId = this.$route.query.id
    this.newsContent()
  },
  methods: {
    async newsContent () {
      await this.$http.get('http://localhost:8080/news/findNewsById/' + this.newId + '').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.news = res.data
      })
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
  .left {
    display: inline-block;
    vertical-align: top;
    width: calc( 75vw - 400px)
  }
  .banner-top img {
    width: 100%;
    height: 100%;
  }
  .h4{
    font-family: 'Microsoft YaHei'!important;
    line-height: 30px;
  }
  .sub_title{
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    color: #999;
    line-height: 38px;
  }
</style>
